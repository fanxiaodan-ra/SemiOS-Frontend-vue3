import useUserStore from '@/store'
import useAccount from '@/hooks/useAccount'
import {
  workAuthority,
  userAuthority,
  daoMerkle,
  canvasExists,
  merkleWork,
} from '@/api/daos'
import { workMintTopUp, workMintUnTopUp, workLockDuration } from '@/api/works'
import useToastNotify from '@/hooks/useToastNotify'
import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'
import {
  decimals,
  updateTopUpAccount,
  getWorkAllowance,
  mintNFT,
  approveWork,
  transferNFTs,
  lockTopUpNFT,
} from '@/common/web3service'

export default function useMintWork() {
  const store = useUserStore()
  const { notifyErr, notifySuc } = useToastNotify()
  const { getTrading } = useAccount()

  const whetherItTraded = async (daoId: number) => {
    const isTrad = await getTrading()
    console.log(isTrad, 'isTrad')
    if (!isTrad) return false
    const isWork = await workAuthority({ daoId: daoId })
    if (!isWork.data.mintWork) {
      notifyErr('You are ineligible to mint work.', true)
      return false
    }
    const isAuthority = await userAuthority({
      daoId: daoId,
    })
    if (isAuthority.data === 0) {
      notifyErr(
        `You don't have the membership NFT for this DAO, no minting is possible.You can acquire one on marketplaces like OpenSea or ask a friend who has a spare one.`,
        true
      )
      return false
    }
    if (0 < isAuthority.data && isAuthority.data < 5) {
      return true
    }
    if (isAuthority.data >= 5) {
      // dialogRestrict = true
      notifyErr(
        `You have reached the limit of 5 mints, no more minting possible for this address in this DAO unless the DAO creator change settings in PRO version.`,
        true
      )
      return false
    }
    return true
  }

  const getWorkMintTopUp = async (daoId: number) => {
    const mintTopList = (await workMintTopUp({ pageSize: -1, daoId: daoId })) as any
    const workMintTopUpObj = {
      topUpMintList: mintTopList.dataList,
      isBind: true,
      isMint: false,
    }
    return workMintTopUpObj
  }

  const getWorkMintUnTopUp = async (dataObj: any) => {
    const mintTopList = (await workMintUnTopUp({
      daoId: dataObj.daoId,
      pageSize: -1,
    })) as any
    const unTopUpMintList = mintTopList.dataList
    // const unTopUpMintList = [
    //   {
    //     workId: 181,
    //     workNumber: 2,
    //     daoId: 237,
    //     daoName: 'in233 Etop',
    //     daoNumber: 239,
    //     canvasNumber: 1,
    //     erc721TokenAddress: '0x74d441d388d1daeec51830f942c0c695dbfc462e',
    //     imgUrl:
    //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/239/2.png',
    //     bgColor: '#532FE7',
    //     height: 298.0,
    //     erc20Amount: 500000.0,
    //     ethAmount: 10.0,
    //     workLockStatus: 0,
    //     togetherDaoId: 234,
    //     togetherDaoName: 'zmn usdcDispay',
    //     daoErc20Address: '0x221a302263396e4043c6c8eae80c2030327b65f9',
    //     payCurrencyType: 'USDC',
    //     inputTokenAddress: '0x9fcfceb7c2f7f6748c082a95bdd925f1702a8c3a',
    //     daoSymbol: 'SEMI.T237',
    //     erc20PaymentMode: 0,
    //   },
    //   {
    //     workId: 28,
    //     imgUrl:
    //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/11/1.png',
    //     workNumber: 2,
    //     daoId: 237,
    //     daoName: 'in233 Etop',
    //     daoNumber: 239,
    //     canvasNumber: 1,
    //     erc721TokenAddress: '0x74d441d388d1daeec51830f942c0c695dbfc462e',

    //     bgColor: '#532FE7',
    //     height: 298.0,
    //     erc20Amount: 500000.0,
    //     ethAmount: 10.0,
    //     workLockStatus: 0,
    //     togetherDaoId: 234,
    //     togetherDaoName: 'zmn usdcDispay',
    //     daoErc20Address: '0x221a302263396e4043c6c8eae80c2030327b65f9',
    //     payCurrencyType: 'USDC',
    //     inputTokenAddress: '0x9fcfceb7c2f7f6748c082a95bdd925f1702a8c3a',
    //     daoSymbol: 'SEMI.T237',
    //     erc20PaymentMode: 0,
    //   },
    //   {
    //     workId: 27,
    //     imgUrl:
    //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/10/1.png',
    //     workNumber: 2,
    //     daoId: 237,
    //     daoName: 'in233 Etop',
    //     daoNumber: 239,
    //     canvasNumber: 1,
    //     erc721TokenAddress: '0x74d441d388d1daeec51830f942c0c695dbfc462e',

    //     bgColor: '#532FE7',
    //     height: 298.0,
    //     erc20Amount: 500000.0,
    //     ethAmount: 10.0,
    //     workLockStatus: 0,
    //     togetherDaoId: 234,
    //     togetherDaoName: 'zmn usdcDispay',
    //     daoErc20Address: '0x221a302263396e4043c6c8eae80c2030327b65f9',
    //     payCurrencyType: 'USDC',
    //     inputTokenAddress: '0x9fcfceb7c2f7f6748c082a95bdd925f1702a8c3a',
    //     daoSymbol: 'SEMI.T237',
    //     erc20PaymentMode: 0,
    //   },
    //   {
    //     workId: 23,
    //     imgUrl:
    //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/4/5.png',
    //     workNumber: 2,
    //     daoId: 237,
    //     daoName: 'in233 Etop',
    //     daoNumber: 239,
    //     canvasNumber: 1,
    //     erc721TokenAddress: '0x74d441d388d1daeec51830f942c0c695dbfc462e',
    //     bgColor: '#532FE7',
    //     height: 298.0,
    //     erc20Amount: 500000.0,
    //     ethAmount: 10.0,
    //     workLockStatus: 0,
    //     togetherDaoId: 234,
    //     togetherDaoName: 'zmn usdcDispay',
    //     daoErc20Address: '0x221a302263396e4043c6c8eae80c2030327b65f9',
    //     payCurrencyType: 'USDC',
    //     inputTokenAddress: '0x9fcfceb7c2f7f6748c082a95bdd925f1702a8c3a',
    //     daoSymbol: 'SEMI.T237',
    //     erc20PaymentMode: 0,
    //   },
    // ]
    console.log(unTopUpMintList, 'unTopUpMintList')
    if (unTopUpMintList.length > 0) {
      const workMintUnTopUp = {
        isMint: false,
        isBind: true,
        unTopUpMintList: unTopUpMintList,
      }
      return workMintUnTopUp
    } else {
      const nftIdentifier = {
        erc721Address: ethers.constants.AddressZero,
        tokenId: 0,
      }
      const workMintUnTopUp = {
        isMint: true,
        isBind: false,
        nftIdentifier: nftIdentifier,
      }
      return workMintUnTopUp
    }
  }

  const setApprove = async (erc20Address: string, amount: string) => {
    try {
      const app = await approveWork(erc20Address, amount)
      await app.wait()
      notifySuc('Successful transaction', true)
    } catch (error) {
      notifyErr(JSON.stringify(error))
    }
  }

  const mintNft = async (
    dataObj: any,
    nftIdentifier: any,
    mainnetAddress: string = ''
  ) => {
    BigNumber.config({ EXPONENTIAL_AT: 38 })
    try {
      const merkle = await daoMerkle({
        daoId: dataObj.daoId,
        type: 2,
      })

      let workPrice = dataObj.mintedPrice
      // payCurrencyType==='eth'
      const decimalsNum = dataObj.erc20PaymentMode
        ? await decimals(dataObj.daoErc20Address)
        : dataObj.inputTokenDecimals
      if (!dataObj.topupMode) {
        const balance = await updateTopUpAccount({
          projectId: dataObj.projectId,
          NftIdentifier: nftIdentifier,
        })
        const nameBalance = dataObj.erc20PaymentMode
          ? new BigNumber(balance[0].toString())
            .div(`1e${decimalsNum}`)
            .toString()
          : new BigNumber(balance[1].toString())
            .div(`1e${decimalsNum}`)
            .toString()
        const isLte = new BigNumber(nameBalance).lt(workPrice)
        if (isLte) {
          workPrice = new BigNumber(workPrice).minus(nameBalance).toString()
        } else {
          workPrice = 0
        }
      }
      console.log(workPrice, 'workPrice')
      if (Number(workPrice) > 0) {
        if (dataObj.erc20PaymentMode || dataObj.payCurrencyType !== 'ETH') {
          const erc20Address = dataObj.erc20PaymentMode
            ? dataObj.daoErc20Address
            : dataObj.inputTokenAddress
          const num = new BigNumber(workPrice)
            .times(`1e${decimalsNum}`)
            .toString()
          const allowance = await getWorkAllowance(
            erc20Address,
            store.UserInfo.address
          )
          console.log(allowance, 'allowanceallowance')
          const appNum = new BigNumber(num).minus(allowance).toString()
          if (Number(appNum) > 0) {
            await setApprove(erc20Address, num)
            return false
          }
        }
      }

      const res = await canvasExists({
        daoId: dataObj.daoId,
        workId: dataObj.workId,
      })
      let merkleWorkData = null
      let canvasCreator = ethers.constants.AddressZero
      if (!res.data) {
        merkleWorkData = await merkleWork({
          workId: dataObj.workId,
        })
        canvasCreator = dataObj.creatorAddress
      }
      const nftFlatPrice =
        dataObj.fixedPrice || dataObj.unifiedPriceSet
          ? dataObj.mintedPrice
          : '0'
      const reqData = {
        payCurrencyType: dataObj.payCurrencyType,
        daoId: dataObj.projectId,
        canvasId: dataObj.canvasId,
        tokenUri: dataObj.workUri,
        canvasUri: res.data ? '' : dataObj.canvasUri,
        proof: merkle.data.proof,
        nftFlatPrice:
          dataObj.fixedPrice || dataObj.unifiedPriceSet
            ? dataObj.mintedPrice
            : '0',
        signature: dataObj.createSignHash,
        price: workPrice,
        nftIdentifier: nftIdentifier,
        canvasProof: merkleWorkData ? merkleWorkData.data.proof : [],
        canvasCreator: canvasCreator,
        erc20PaymentMode: dataObj.erc20PaymentMode,
        nftOwner:
          mainnetAddress !== '' ? mainnetAddress : store.UserInfo.address,
        flatPrice:
          dataObj.erc20PaymentMode || dataObj.payCurrencyType !== 'ETH'
            ? new BigNumber(nftFlatPrice).times(`1e${decimalsNum}`).toString()
            : new BigNumber(nftFlatPrice).times(1e18).toString(),
      }
      console.log(reqData, 'reqData')
      const tx = await mintNFT(reqData)
      await tx.wait()
      notifySuc(
        'You have successfully minted a work. Now, it’s time to show or transfer your NFT to your friends.',
        true
      )
      // dialogLoading = false
      // isBind = false
      // this[isSccName] = true
      // isSccName = ''
      // mainnetAddress = ''
      // getData()
    } catch (error) {
      console.log(error, 'error')
      const err = JSON.stringify(error)
      notifyErr(err)
      // dialogLoading = false
      // isBind = false
      // isSccName = ''
      // mainnetAddress = ''
    }
  }

  const setTransferNFTs = async (dataObj: any, address: string) => {
    const isTrad = await getTrading()
    console.log(isTrad, 'isTrad')
    if (!isTrad) return false
    try {
      const reqData = {
        projectId: dataObj.projectId,
        address: store.UserInfo.address,
        to: address,
        tokenId: dataObj.workNumber,
      }
      const tx = await transferNFTs(reqData)
      await tx.wait()
      notifySuc('Your work has been successfully transferred!', true)
    } catch (error) {
      const err = JSON.stringify(error)
      notifyErr(err)
    }
  }

  const lockTopNFT = async (val: string | number, dataObj: any) => {
    try {
      const timeData = await workLockDuration({
        hours: val,
      })
      const data = {
        nftIdentifier: {
          erc721Address: dataObj.erc721Address,
          tokenId: dataObj.workNumber,
        },
        duration: timeData.data.durationBlock,
      }
      const tx = await lockTopUpNFT(data)
      await tx.wait()
      notifySuc('Your NFT has been successfully locked.', true)
    } catch (error) {
      const err = JSON.stringify(error)
      console.log(err, 'err')
      notifyErr(err)
    }
  }
  return {
    whetherItTraded,
    getWorkMintTopUp,
    getWorkMintUnTopUp,
    mintNft,
    setTransferNFTs,
    lockTopNFT,
  }
}
