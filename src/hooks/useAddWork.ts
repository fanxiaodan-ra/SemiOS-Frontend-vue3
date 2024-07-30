import useAccount from '@/hooks/useAccount'
import { workAuthority, createWorkInfo } from '@/api/daos'
import { workCreate } from '@/api/works'
import useToastNotify from '@/hooks/useToastNotify'
import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'
import { decimals, sig } from '@/common/web3service'

export default function useAddWork() {
  const { notifyErr } = useToastNotify()
  const { getTrading, getSig } = useAccount()

  const addWork = async (formData: any) => {
    const isTrad = await getTrading()
    if (!isTrad) return false
    const isSig = await getSig()
    if (!isSig) return false
    const isWork = await workAuthority({
      daoId: formData.daoId,
    })
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
      const req = {
        image: formData.image,
        daoId: formData.daoId,
        canvasId: workInfo.canId,
        createSignHash: signature,
        workDescription: formData.workDescription,
        workUriRandom: workInfo.workUriRandom,
        priceType: formData.pethodType === 1 ? 0 : 1,
        fixedPrice: formData.pethodType === 1 ? null : formData.fixedPrice,
      }
      const data:any = await workCreate(req)
      return data.data.workId
    } catch (error:any) {
      if (!error.resultDesc) {
        notifyErr('User denied message signature.', true)
      }
      return false
    }
  }

  return { addWork }
}
