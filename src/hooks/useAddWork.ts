import useAccount from '@/hooks/useAccount'
import { workAuthority, createWorkInfo } from '@/api/daos'
import { workCreate } from '@/api/works'
import useToastNotify from '@/hooks/useToastNotify'
import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'
import { decimals, sig } from '@/common/web3service'

export default function useAddWork() {
  const { notifyErr, notifySuc } = useToastNotify()
  const { getTrading, getSig } = useAccount()

  const addWork = async (formData: any) => {
    console.log(formData, 'formData')
    const isTrad = await getTrading()
    console.log(isTrad, 'isTrad')
    if (!isTrad) return false
    const isSig = await getSig()
    if (!isSig) return false
    console.log(isSig, 'isSig')
    const isWork = await workAuthority({
      daoId: formData.daoId,
    })
    console.log(isWork, 'isWork')
    if (!isWork.data.createCanvas) {
      notifyErr('You are ineligible to add works.', true)
      return false
    }
    BigNumber.config({ EXPONENTIAL_AT: 38 })
    try {
      const res = await createWorkInfo({ daoId: formData.daoId })
      const workInfo = res.data
      const decimalsNum = workInfo.erc20PaymentMode
        ? await decimals(workInfo.daoErc20Address)
        : workInfo.inputTokenDecimals
      console.log(decimalsNum, 'decimalsNum')
      const chainID = await sig().getChainId()
      const domain = {
        name: 'ProtoDaoProtocol',
        version: '1',
        chainId: chainID,
        verifyingContract: workInfo.protocolContract,
      }
      const types = {
        MintNFT: [
          { name: 'canvasID', type: 'bytes32' },
          { name: 'tokenURIHash', type: 'bytes32' },
          { name: 'flatPrice', type: 'uint256' },
        ],
      }
      const value = {
        canvasID: workInfo.canId,
        tokenURIHash: ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(workInfo.workUri)
        ),
        flatPrice:
          formData.pethodType === 1 || formData.pethodType === 3
            ? 0
            : new BigNumber(formData.fixedPrice)
                .times(`1e${decimalsNum}`)
                .toString(),
      }
      const signature = await sig()._signTypedData(domain, types, value)
      console.log(signature, 'signature')
      const req = {
        image: formData.image,
        daoId: formData.daoId,
        canvasId: workInfo.canId,
        createSignHash: signature,
        workDescription: formData.workDescription,
        workUriRandom: workInfo.workUriRandom,
        priceType: formData.priceType === 2 ? 0 : 1,
        fixedPrice: formData.priceType === 2 ? null : formData.fixedPrice,
      }
      console.log(req, '我是创建work参数')
      const data = await workCreate(req)
      if (data.resultCode === 100) return data.data.workId
      notifyErr(data.resultDesc, true)
      return false
    } catch (error) {
      console.log(error, 'error')
      const err = JSON.stringify(error)
      notifyErr('User denied message signature.', true)
      return false
    }
  }

  return { addWork }
}
