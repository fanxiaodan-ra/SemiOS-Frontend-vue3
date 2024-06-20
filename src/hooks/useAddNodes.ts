import useUserStore from '@/store'
import { ethers } from 'ethers'
import { createDao, whitelistProof, daoTimes } from '@/api/daos'
import { BigNumber } from 'bignumber.js'
BigNumber.config({ EXPONENTIAL_AT: 38 })
import _ from 'lodash'
import {
  createDaoForFunding,
  decimals,
  setDaoParamsFunding,
  setMintCapAndPermission,
} from '@/common/web3service'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import dayjs from 'dayjs'
import { whitelistFiltre, arrConversion, bigNumTimes, isErcEq } from '@/utils'
import useToastNotify from '@/hooks/useToastNotify'
import { useRoute } from 'vue-router'

const route = useRoute()

const fetchkeyArr = (a: [], b: [], key = 'name') => {
  const arrA = a.map((item) => item[key])
  const arrB = b.map((item) => item[key])
  return _.uniq([...arrA, ...arrB])
}

const fetchvalArr = (a: any, b: any, key = 'name') => {
  return a.map((item: any) => {
    const obj = _.find(b, [key, item])
    return obj ? obj.value * 100 : '0'
  })
}

const filterMerkle = (val: any, arr = []) => {
  const newVal = whitelistFiltre(val, arr)
  if (val.length > 0 || arr.length > 0) {
    const tree = StandardMerkleTree.of(arrConversion(newVal), ['address'])
    return {
      root: tree.root,
      // proof: JSON.stringify(proofArr),
      address: JSON.stringify(newVal),
    }
  } else {
    return {
      root: ethers.constants.HashZero,
      proof: '',
      address: '',
    }
  }
}

const bigNumBerTimes = (a: any, b: any) => {
  BigNumber.config({ EXPONENTIAL_AT: 38 })
  return new BigNumber(a).times(b).toString()
}
const { notifyErr, notifySuc } = useToastNotify()

const getProofData = (formData: any, store: any) => {
  const createCanvasRootObj = filterMerkle(
    formData.workWhitelistAddress.map((item: any) => item.address)
  )
  const mintingWithMaxlistAddress =
    formData.type === 2
      ? [
        {
          address: store.state.UserInfo.address,
          amount: 5,
        },
      ]
      : formData.mintingWithMaxlistAddress
  const mintingRootObj = filterMerkle(
    formData.mintingWithUnlimitedlistAddress.map((item: any) => item.address),
    mintingWithMaxlistAddress.map((item: any) => item.address)
  )

  return {
    canvasCreateOriginAddress: createCanvasRootObj.address,
    canvasCreateMerkleRoot: createCanvasRootObj.root,
    mintingOriginAddress: mintingRootObj.address,
    mintingMerkleRoot: mintingRootObj.root,
  }
}

const getDecimalsNum = async (formData: any) => {
  let decimalsNum = (0).toString()

  if (formData.daoTokenMode && (formData.thirdParty || route.query.id)) {
    const erc20 = route.query.id
      ? formData.initData.erc20Address
      : formData.erc20ContractAddress
    const decNum = await decimals(erc20)
    decimalsNum = `1e${decNum}`
  } else {
    if (formData.inputToken !== 'Input') {
      if (
        formData.inputToken === '0x0000000000000000000000000000000000000000'
      ) {
        decimalsNum = '1e18'
      } else {
        const decNum = await decimals(formData.inputToken)
        decimalsNum = `1e${decNum}`
      }
    } else {
      const decNum = await decimals(formData.inputTokenErc20ContractAddress)
      decimalsNum = `1e${decNum}`
    }
  }
  return decimalsNum
}

const filterBlacklist = (val: any, initData: any) => {
  console.log(val, 'val')
  const accounts = whitelistFiltre(val)
  console.log(accounts, 'accountsaccountsaccountsaccounts')
  //Whether the blacklist array exists
  if (initData.length > 0) {
    //Whether two arrays are equal
    const isArr = isErcEq(accounts, initData)
    if (isArr) {
      return {
        deleteArr: [],
        addArr: [],
      }
    } else {
      //It's in the old array, it's not in the new array
      const deleteArr = _.difference(initData, accounts)
      //It didn't exist in the old array, but it exists in the new array
      const addArr = _.difference(accounts, initData)
      return {
        deleteArr: deleteArr,
        addArr: addArr,
      }
    }
  } else {
    if (accounts.length > 0) {
      const addArr = _.difference(accounts, [])
      // this.editData.blacklist.minterAccounts = addArr;
      return {
        deleteArr: [],
        addArr: addArr,
      }
    } else {
      return {
        deleteArr: [],
        addArr: [],
      }
    }
  }
}

const getDaoMetadataParam = (data: any, formData: any, decimalsNum: string) => {
  return {
    startBlock: data.startBlock,
    // startDrb: data.data.startDrb,
    mintableRounds: formData.infiniteMode ? 1 : formData.daoMintWindow,
    duration: data.duration,
    floorPrice: bigNumBerTimes(formData.daoFloorPrice, decimalsNum),
    maxNftRank: data.maxNftRank,
    royaltyFee: data.royaltyFee,
    projectUri: data.projectUri,
    projectIndex: 0,
  }
}

const getWhitelist = (formData: any, store: any) => {
  const whitelist = {
    minterNFTHolderPasses: [],
    minterMerkleRoot: '',
    minterNFTIdHolderPasses: [],
    canvasCreatorNFTHolderPasses: [],
    canvasCreatorMerkleRoot: '',
    canvasCreatorNFTIdHolderPasses: [],
  }

  whitelist.minterNFTHolderPasses =
    formData.mintingErcWithUnlimitedlistAddress.map((item: any) => item.address)

  const mintingWithMaxlistAddress =
    formData.type === 2
      ? [
        {
          address: store.state.UserInfo.address,
          amount: 5,
        },
      ]
      : formData.mintingWithMaxlistAddress
  const mintingRootObj = filterMerkle(
    formData.mintingWithUnlimitedlistAddress.map((item: any) => item.address),
    mintingWithMaxlistAddress.map((item: any) => item.address)
  )
  whitelist.minterMerkleRoot = mintingRootObj.root

  whitelist.minterNFTIdHolderPasses =
    formData.mintingNftWithUnlimitedlistAddress

  whitelist.canvasCreatorNFTHolderPasses = formData.workErclistAddress.map(
    (item: any) => item.address
  )
  const createCanvasRootObj = filterMerkle(
    formData.workWhitelistAddress.map((item: any) => item.address)
  )
  whitelist.canvasCreatorMerkleRoot = createCanvasRootObj.root

  whitelist.canvasCreatorNFTIdHolderPasses = formData.workNftlistAddress

  return whitelist
}

const getBlacklist = (formData: any) => {
  const blacklist = {
    minterAccounts: [],
    canvasCreatorAccounts: [],
  }
  blacklist.minterAccounts = formData.mintingBlacklistAddress.map(
    (item: any) => item.address
  )

  blacklist.canvasCreatorAccounts = formData.workBlacklistAddress.map(
    (item: any) => item.address
  )
  return blacklist
}
const getNftMinterCapInfo = (formData: any) => {
  const nftMinterCapInfo =
    formData.type === 2
      ? [
        {
          nftAddress: ethers.constants.AddressZero,
          nftMintCap: 5,
        },
      ]
      : formData.mintingErcWithMaxlistAddress
  return nftMinterCapInfo
}

const getDaoMintCapParam = (formData: any, store: any) => {
  const daoMintCapParam = {
    daoMintCap: 0,
    userMintCapParams: [],
  }
  daoMintCapParam.daoMintCap =
    formData.mintingCapForDaolistAmount.length > 0
      ? formData.mintingCapForDaolistAmount[0].amount
      : 0
  daoMintCapParam.userMintCapParams =
    formData.type === 2
      ? [
        {
          minter: store.state.UserInfo.address,
          mintCap: 5,
        },
      ]
      : formData.mintingWithMaxlistAddress.map((item: any) => {
        return {
          minter: item.address,
          mintCap: item.amount,
        }
      })
  return daoMintCapParam
}

const getNftMinterCapIdInfo = (formData: any) => {
  const nftMinterCapIdInfo = formData.mintingNftWithMaxlistAddress
  return nftMinterCapIdInfo
}

const getTemplateParam = (formData: any, decimalsNum: string) => {
  return {
    priceTemplateType: formData.fluctuationMethod,
    priceFactor:
      formData.fluctuationMethod === 0
        ? bigNumBerTimes(formData.doublingFactor, 10000)
        : ethers.BigNumber.from(
          bigNumBerTimes(formData.growthFactor, decimalsNum)
        ),
    rewardTemplateType: 0,
    rewardDecayFactor: 0,
    isProgressiveJackpot: formData.lotteryMode,
  }
}

const getBasicDaoParam = (data: any) => {
  return {
    canvasId: data.canvasId,
    canvasUri: data.canvasUri,
    daoName: data.daoName,
  }
}

const getContinuousDaoParam = (formData: any, decimalsNum: string) => {
  let tokenAddress = ''
  if (formData.thirdParty) {
    tokenAddress =
      formData.erc20ContractAddress.slice(0, 2) === '0x'
        ? formData.erc20ContractAddress
        : '0x' + formData.erc20ContractAddress
  } else {
    tokenAddress = ethers.constants.AddressZero
  }

  const childrenDaoId = fetchkeyArr(
    formData.ETHOtherNodesList,
    formData.ERCOtherNodeslist,
    'projectId'
  )
  const childrenDaoRatiosERC20 = fetchvalArr(
    childrenDaoId,
    formData.ERCOtherNodeslist,
    'projectId'
  )
  const childrenDaoRatiosETH = fetchvalArr(
    childrenDaoId,
    formData.ETHOtherNodesList,
    'projectId'
  )
  return {
    reserveNftNumber: formData.needMintableWork ? formData.passesQuantity : 0,
    unifiedPriceModeOff: !formData.unifiedPriceMode,
    unifiedPrice: bigNumBerTimes(formData.unifiedPrice, decimalsNum),
    needMintableWork: formData.needMintableWork,
    dailyMintCap: formData.dailyMintCap,
    childrenDaoId: childrenDaoId,
    childrenDaoOutputRatios: childrenDaoRatiosERC20,
    childrenDaoInputRatios: childrenDaoRatiosETH,
    redeemPoolInputRatio: bigNumBerTimes(formData.redeemPoolRatioETH, 100),
    treasuryOutputRatio: 0,
    treasuryInputRatio: 0,
    selfRewardOutputRatio: bigNumBerTimes(formData.selfRewardRatioERC20, 100),
    selfRewardInputRatio: bigNumBerTimes(formData.selfRewardRatioETH, 100),
    isAncestorDao: formData.isAncestorDao,
    daoToken: tokenAddress,
    topUpMode: formData.topUpMode,
    infiniteMode: formData.infiniteMode,
    outputPaymentMode: formData.daoTokenMode,
    ownershipUri: 'test-ownership-uri',
    //1.7
    inputToken:
      formData.inputToken !== 'Input'
        ? formData.inputToken
        : formData.inputTokenErc20ContractAddress,
  }
}

const getAllRatioParam = (formData: any) => {
  return {
    canvasCreatorMintFeeRatio: bigNumTimes(
      formData.daoPriceReserveRatio.builder
    ),
    assetPoolMintFeeRatio: bigNumTimes(formData.daoPriceReserveRatio.subDAO),
    redeemPoolMintFeeRatio: bigNumTimes(formData.daoPriceReserveRatio.mainDAO),
    treasuryMintFeeRatio: 0,
    canvasCreatorMintFeeRatioFiatPrice: bigNumTimes(
      formData.fixedPriceReserveRatio.builder
    ),
    assetPoolMintFeeRatioFiatPrice: bigNumTimes(
      formData.fixedPriceReserveRatio.subDAO
    ),
    redeemPoolMintFeeRatioFiatPrice: bigNumTimes(
      formData.fixedPriceReserveRatio.mainDAO
    ),
    treasuryMintFeeRatioFiatPrice: 0,
    minterOutputRewardRatio: bigNumTimes(formData.royalty.minter),
    canvasCreatorOutputRewardRatio: bigNumTimes(formData.royalty.builder),
    daoCreatorOutputRewardRatio: bigNumTimes(formData.royalty.subDao),
    minterInputRewardRatio: bigNumTimes(formData.eth.minter),
    canvasCreatorInputRewardRatio: bigNumTimes(formData.eth.builder),
    daoCreatorInputRewardRatio: bigNumTimes(formData.eth.subDao),
  }
}
const getStrategies = (formData: any, initData: any) => {
  const reqData = {
    unblacklist: { minterAccounts: [], canvasCreatorAccounts: [] },
    blacklist: { minterAccounts: [], canvasCreatorAccounts: [] },
    userMintCapParam: [],
    whitelist: {
      minterNFTHolderPasses: [],
      minterMerkleRoot: '',
      canvasCreatorNFTHolderPasses: [],
      canvasCreatorMerkleRoot: '',
      minterNFTIdHolderPasses: [],
      canvasCreatorNFTIdHolderPasses: [],
    },
    nftMinterCapInfo: [],
    nftMinterCapIdInfo: [],
    mintCap: 0,
    setProofData: {
      canvasCreateOriginAddress: '',
      canvasCreateMerkleRoot: '',
      mintingOriginAddress: '',
      mintingMerkleRoot: '',
    },
  }
  const canvasBlackList =
    initData.createCanvas && initData.createCanvas.blackList
      ? initData.createCanvas.blackList
      : []

  const createCanvasBlackList = filterBlacklist(
    formData.workBlacklistAddress.map((item: any) => item.address),
    canvasBlackList
  )
  reqData.unblacklist.canvasCreatorAccounts =
    createCanvasBlackList.deleteArr as any
  reqData.blacklist.canvasCreatorAccounts = createCanvasBlackList.addArr as any

  const mintingRootObj = filterMerkle(
    formData.mintingWithUnlimitedlistAddress.map((item: any) => item.address),
    formData.mintingWithMaxlistAddress.map((item: any) => item.address)
  )
  console.log(mintingRootObj, 'mintingRootObj')
  reqData.whitelist.minterMerkleRoot = mintingRootObj.root

  const createCanvasRootObj = filterMerkle(
    formData.workWhitelistAddress.map((item: any) => item.address)
  )
  reqData.whitelist.canvasCreatorMerkleRoot = createCanvasRootObj.root

  reqData.setProofData = {
    canvasCreateOriginAddress: createCanvasRootObj.address,
    canvasCreateMerkleRoot: createCanvasRootObj.root,
    mintingOriginAddress: mintingRootObj.address,
    mintingMerkleRoot: mintingRootObj.root,
  }
  //1.7
  reqData.whitelist.canvasCreatorNFTIdHolderPasses = formData.workNftlistAddress
  reqData.whitelist.minterNFTIdHolderPasses =
    formData.mintingNftWithUnlimitedlistAddress
  reqData.nftMinterCapIdInfo = getNftMinterCapIdInfo(formData)
  const mintingBlackList =
    initData.minting && initData.minting.blackList
      ? initData.minting.blackList
      : []

  const newMintingBlackList = filterBlacklist(
    formData.mintingBlacklistAddress.map((item: any) => item.address),
    mintingBlackList
  )
  reqData.unblacklist.minterAccounts = newMintingBlackList.deleteArr as any
  reqData.blacklist.minterAccounts = newMintingBlackList.addArr as any

  reqData.userMintCapParam = formData.mintingWithMaxlistAddress.map(
    (item: any) => {
      return {
        minter: item.address,
        mintCap: item.amount,
      }
    }
  )

  reqData.nftMinterCapInfo = formData.mintingErcWithMaxlistAddress

  reqData.whitelist.minterNFTHolderPasses =
    formData.mintingErcWithUnlimitedlistAddress.map((item: any) => item.address)

  reqData.whitelist.canvasCreatorNFTHolderPasses =
    formData.workErclistAddress.map((item: any) => item.address)
  reqData.mintCap =
    formData.mintingCapForDaolistAmount.length > 0
      ? formData.mintingCapForDaolistAmount[0].amount
      : 0
  console.log(reqData, 'reqDatareqDatareqDatareqDatareqDatareqDatareqData')
  return reqData
}
export default function useAddNodes() {
  const store = useUserStore()

  const addNode = async (formData: any) => {
    console.log(formData, 'formData')
    try {
      const proofData = getProofData(formData, store)
      await whitelistProof(proofData)
      const data = await createDao({
        ...formData,
        duration: formData.daoMintWindowDuration,
      })

      const decimalsNum = await getDecimalsNum(formData)
      console.log(decimalsNum, 'decimalsNum')
      const daoMetadataParam = getDaoMetadataParam(
        data.data,
        formData,
        decimalsNum
      )
      const whitelist = await getWhitelist(formData, store)

      const blacklist = await getBlacklist(formData)

      const nftMinterCapInfo = getNftMinterCapInfo(formData)

      const daoMintCapParam = getDaoMintCapParam(formData, store)

      const nftMinterCapIdInfo = getNftMinterCapIdInfo(formData)
      const templateParam = getTemplateParam(formData, decimalsNum)
      const basicDaoParam = getBasicDaoParam(data.data)
      const continuousDaoParam = getContinuousDaoParam(formData, decimalsNum)
      const allRatioParam = getAllRatioParam(formData)
      const reqData = {
        createProjectFee: 0,
        existDaoId: formData.existDaoId,
        daoMetadataParam,
        whitelist,
        blacklist,
        daoMintCapParam,
        nftMinterCapInfo,
        nftMinterCapIdInfo,
        templateParam,
        basicDaoParam,
        continuousDaoParam,
        allRatioParam,
        actionType: 20,
      }
      console.log(reqData, 'reqData')
      const tx = await createDaoForFunding(reqData)
      const res = await tx.wait()
      console.log(res, 'restxxxxxxxxxxxxxxxxx')
      notifySuc('dao')
      return true
    } catch (error) {
      // formData.dialogLoading = false;
      const err = JSON.stringify(error)
      console.log(err, ' formData.errMsgText')
      notifyErr(err)
      return false
    }
  }

  const getDaoTime = async () => {
    try {
      const time = await daoTimes()
      return dayjs(time.data.currentTime * 1000).format('YYYY-MM-DD')
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const editNodeChain = async (formData: any, changeInfiniteMode: boolean) => {
    console.log(formData, 'formData')
    try {
      let remainingRound = null
      if (changeInfiniteMode) {
        remainingRound = formData.infiniteMode
          ? 0
          : formData.radioModify
            ? formData.modifyRemainingMintWindow
            : 1
      } else {
        remainingRound = formData.infiniteMode
          ? 0
          : formData.radioModify
            ? formData.modifyRemainingMintWindow
            : 0
      }
      const childrenDaoId = fetchkeyArr(
        formData.ETHOtherNodesList,
        formData.ERCOtherNodeslist,
        'projectId'
      )
      const childrenDaoRatiosERC20 = fetchvalArr(
        childrenDaoId,
        formData.ERCOtherNodeslist,
        'projectId'
      )
      const childrenDaoRatiosETH = fetchvalArr(
        childrenDaoId,
        formData.ETHOtherNodesList,
        'projectId'
      )
      const reqData = {
        daoId: formData.daoId,
        nftMaxSupplyRank: formData.totalNftCasting,
        remainingRound: remainingRound,
        daoFloorPrice: formData.unifiedPriceMode
          ? new BigNumber(0.001).times(formData.decimalsNum).toString()
          : new BigNumber(formData.daoFloorPrice)
            .times(formData.decimalsNum)
            .toString(),
        priceTemplateType: formData.fluctuationMethod,
        nftPriceFactor:
          formData.fluctuationMethod === 0
            ? new BigNumber(formData.doublingFactor).times(10000).toString()
            : new BigNumber(formData.growthFactor)
              .times(formData.decimalsNum)
              .toString(),
        dailyMintCap: formData.dailyMintCap,
        unifiedPrice: formData.unifiedPrice
          ? new BigNumber(formData.unifiedPrice)
            .times(formData.decimalsNum)
            .toString()
          : '0',
        changeInfiniteMode: changeInfiniteMode,
        setChildrenParam: {
          childrenDaoId: childrenDaoId,
          childrenDaoOutputRatios: childrenDaoRatiosERC20,
          childrenDaoInputRatios: childrenDaoRatiosETH,
          redeemPoolInputRatio: bigNumBerTimes(formData.redeemPoolRatioETH, 100),
          treasuryOutputRatio: 0,
          treasuryInputRatio: 0,
          selfRewardRatioERC20: bigNumBerTimes(
            formData.selfRewardRatioERC20,
            100
          ),
          selfRewardRatioETH: bigNumBerTimes(formData.selfRewardRatioETH, 100),
        },

        allRatioForFundingParam: {
          canvasCreatorMintFeeRatio: bigNumTimes(
            formData.daoPriceReserveRatio.builder
          ),
          assetPoolMintFeeRatio: bigNumTimes(
            formData.daoPriceReserveRatio.subDAO
          ),
          redeemPoolMintFeeRatio: bigNumTimes(
            formData.daoPriceReserveRatio.mainDAO
          ),
          treasuryMintFeeRatio: 0,
          canvasCreatorMintFeeRatioFiatPrice: bigNumTimes(
            formData.fixedPriceReserveRatio.builder
          ),
          assetPoolMintFeeRatioFiatPrice: bigNumTimes(
            formData.fixedPriceReserveRatio.subDAO
          ),
          redeemPoolMintFeeRatioFiatPrice: bigNumTimes(
            formData.fixedPriceReserveRatio.mainDAO
          ),
          treasuryMintFeeRatioFiatPrice: 0,
          minterOutputRewardRatio: bigNumTimes(formData.royalty.minter),
          canvasCreatorOutputRewardRatio: bigNumTimes(formData.royalty.builder),
          daoCreatorOutputRewardRatio: bigNumTimes(formData.royalty.subDao),

          minterInputRewardRatio: bigNumTimes(formData.eth.minter),
          canvasCreatorInputRewardRatio: bigNumTimes(formData.eth.builder),
          daoCreatorInputRewardRatio: bigNumTimes(formData.eth.subDao),
        },
      }
      console.log(reqData, 'reqData')
      const tx = await setDaoParamsFunding(reqData)
      const res = await tx.wait()
      console.log(res, 'restxxxxxxxxxxxxxxxxx')
      notifySuc('Updated!', true)
      return true
    } catch (error) {
      console.log(error, 'error')
      // formData.dialogLoading = false;
      const err = JSON.stringify(error)
      console.log(err, ' formData.errMsgText')
      notifyErr(err)
      return false
    }
  }

  const editNodeStrategies = async (formData: any, initData: any) => {
    console.log(formData, 'formData')
    try {
      const reqData = getStrategies(formData, initData)
      await whitelistProof(reqData.setProofData)
      const tx = await setMintCapAndPermission({
        daoId: initData.projectId,
        ...reqData,
      })
      const res = await tx.wait()
      console.log(res, 'editNodeStrategies')
      notifySuc('Updated!', true)
      return true
    } catch (error) {
      console.log(error, 'error')
      const err = JSON.stringify(error)
      console.log(err, ' formData.errMsgText')
      notifyErr(err)
      return false
    }
  }

  return { addNode, getDaoTime, editNodeChain, editNodeStrategies }
}
