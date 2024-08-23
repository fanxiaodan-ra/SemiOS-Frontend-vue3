import { computed, ref, watch } from 'vue'
import useSetupDaoStore from '@/store/setupDao'
import { Erc721MintIdCaps, MintCaps, WhiteListedERC721Id } from '@/types/SetupDao'
import type { ForkedParams, TokenAllocationVos } from '@/types/SetupDao'

const arrayForNull = (target: Array<any> | null) => {
  return target === null ? [] : target
}

const formatNumberToRadio = (num: number, nums: number[]) => {
  return nums.findIndex(item => item === num)
}

const BLOCK = {
  topupMode: 0,
  infiniteMode: 0,
  daoMintWindow: 60,
  duration: 24,
  totalNftCasting: 2,
  dailyMintCap: 10000,
}
const WORKS = {
  needMintableWork: 0,
  generateWorkSet: 0,
  erc20PaymentMode: 0,
  daoFloorPrice: 0,
  globalDaoPriceMode: 0,
  globalDaoPrice: 0,
  canvasPriceFluctuationMethod: 0,
  fluctuationMethodFactor: 0,
}
const TOKEN_STRUCTURE = {
  royaltyTokenLotteryMode: 0,
  daoAllocation: {
    erc20TOtherNodes: '0',
    nodesReserves: '0',
    nodesInternalIncentives: '0',
  },
  ethAllocation: {
    seedNodesRedeemPool: '0',
    nodesInternalIncentives: '0',
    nodesReserves: '0',
    ethToOtherNodes: '0',
  },
  fixedMintPrice: {
    canvasMintFee: 0,
    redeemPoolMintFee: 97.5,
    d4aMintFee: 0,
    daoMintFee: 2.5,
  },
  floatingMintPrice: {
    canvasMintFee: 0,
    redeemPoolMintFee: 97.5,
    d4aMintFee: 0,
    daoMintFee: 2.5,
  },
  erc20Incentives: {
    daoReward: 50,
    d4aReward: 0,
    canvasReward: 25,
    minterReward: 25,
  },
  ethIncentives: {
    daoCreatorETHReward: 50,
    d4aReward: 0,
    canvasCreatorETHReward: 25,
    minterETHReward: 25,
  },
  daoEthAllocationVos: [] as TokenAllocationVos[],
  daoTokenAllocationVos: [] as TokenAllocationVos[],
}
const STRATEGIES = {
  builderInfo: {
    blackList: [] as Array<string>,
    whiteList: [] as Array<string>,
    whiteListedERC721Id:[] as WhiteListedERC721Id,
    whiteListedERC721: [] as Array<string>,
  },
  minterInfo: {
    blackList: [] as Array<string>,
    designatedMintCaps: [] as MintCaps,
    whiteListAddress: [] as Array<string>,
    erc721MintIdCaps: [] as Erc721MintIdCaps,
    whiteListedERC721Id: [] as WhiteListedERC721Id,
    erc721MintCaps: [] as MintCaps,
    whiteListedERC721: [] as Array<string>,
    maxMintingAmount: 0 as number,
  },
}

export default function useFockedParams () {
  const setupDaoStore = useSetupDaoStore()
  const blockParams = ref({
    ...BLOCK,
  })
  const nodeBlockParam = computed(() => {
    return {
      topUpMode: !!blockParams.value.topupMode,
      infiniteMode: !!blockParams.value.infiniteMode,
      daoMintWindow: blockParams.value.daoMintWindow,
      daoMintWindowDuration: blockParams.value.duration,
      totalNftCasting: formatNumberToRadio(blockParams.value.totalNftCasting, [1000, 5000, 10000, 50000, 100000]),
      dailyMintCap: blockParams.value.dailyMintCap,
    }
  })

  const worksParams = ref({
    ...WORKS,
  })
  const nodeWorksParam = computed(() => {
    return {
      needMintableWork: !!worksParams.value.needMintableWork,
      passesQuantity: worksParams.value.generateWorkSet,
      daoTokenMode: !!worksParams.value.erc20PaymentMode,
      daoFloorPrice: worksParams.value.daoFloorPrice,
      unifiedPriceMode: !!worksParams.value.globalDaoPriceMode,
      unifiedPrice: worksParams.value.globalDaoPrice || 0,
      fluctuationMethod: worksParams.value.canvasPriceFluctuationMethod,
      doublingFactor: worksParams.value.fluctuationMethodFactor,
      growthFactor: worksParams.value.fluctuationMethodFactor,
    }
  })

  const tokenStructure = ref({
    ...TOKEN_STRUCTURE,
  })
  const nodesTokenStructure = computed(() => {
    return {
      lotteryMode: !!tokenStructure.value.royaltyTokenLotteryMode,
      ERC20OtherNodes: Number(tokenStructure.value.daoAllocation.erc20TOtherNodes),
      ETHOtherNodes: Number(tokenStructure.value.ethAllocation.ethToOtherNodes),
      ETHOtherNodesList: arrayForNull(tokenStructure.value.daoEthAllocationVos).map((item: TokenAllocationVos) => ({
        projectId: item.projectId,
        value: item.royaltyProportion,
        daoName: item.daoName,
      })),
      ERCOtherNodeslist: arrayForNull(tokenStructure.value.daoTokenAllocationVos).map((item: TokenAllocationVos) => ({
        projectId: item.projectId,
        value: item.royaltyProportion,
        daoName: item.daoName,
      }),
      ),
      nodesReservesRatioERC20: Number(tokenStructure.value.daoAllocation.nodesReserves),
      nodesReservesRatioETH: Number(tokenStructure.value.ethAllocation.nodesReserves),
      selfRewardRatioERC20: Number(tokenStructure.value.daoAllocation.nodesInternalIncentives),
      selfRewardRatioETH: Number(tokenStructure.value.ethAllocation.nodesInternalIncentives),
      redeemPoolRatioETH: Number(tokenStructure.value.ethAllocation.seedNodesRedeemPool),
      daoPriceReserveRatio: {
        builder: tokenStructure.value.floatingMintPrice.canvasMintFee,
        mainDao: tokenStructure.value.floatingMintPrice.redeemPoolMintFee,
        pDao: tokenStructure.value.floatingMintPrice.d4aMintFee,
        subDao: tokenStructure.value.floatingMintPrice.daoMintFee,
      },
      fixedPriceReserveRatio: {
        builder: tokenStructure.value.fixedMintPrice.canvasMintFee,
        mainDao: tokenStructure.value.fixedMintPrice.redeemPoolMintFee,
        pDao: tokenStructure.value.fixedMintPrice.d4aMintFee,
        subDao: tokenStructure.value.fixedMintPrice.daoMintFee,
      },
      royalty: {
        builder: tokenStructure.value.erc20Incentives.canvasReward,
        minter: tokenStructure.value.erc20Incentives.minterReward,
        pDao: tokenStructure.value.erc20Incentives.d4aReward,
        subDao: tokenStructure.value.erc20Incentives.daoReward,
      },
      eth: {
        builder: tokenStructure.value.ethIncentives.canvasCreatorETHReward,
        minter: tokenStructure.value.ethIncentives.minterETHReward,
        pDao: tokenStructure.value.ethIncentives.d4aReward,
        subDao: tokenStructure.value.ethIncentives.daoCreatorETHReward,
      },
    }
  })

  const strategies = ref({
    ...STRATEGIES,
  })

  const nodesStrategies = computed(() => {
    return {
      workBlacklistAddress: arrayForNull(strategies.value.builderInfo.blackList).map((address: string) => ({
        address,
      })),
      workWhitelistAddress: arrayForNull(strategies.value.builderInfo.whiteList).map((address: string) => ({
        address,
      })),
      workErclistAddress: arrayForNull(strategies.value.builderInfo.whiteListedERC721).map((address: string) => ({
        address,
      })),
      workNftlistAddress: strategies.value.builderInfo.whiteListedERC721Id,
      mintingBlacklistAddress: arrayForNull(strategies.value.minterInfo.blackList).map((address: string) => ({
        address,
      })),
      mintingWithMaxlistAddress: arrayForNull(strategies.value.minterInfo.designatedMintCaps).map((item: {
        account: string;
        cap: number;
      }) => ({
        address: item.account,
        amount: item.cap,
      })),
      mintingWithUnlimitedlistAddress: arrayForNull(strategies.value.minterInfo.whiteListAddress).map((address: string) => ({
        address,
      })),
      mintingErcWithMaxlistAddress: arrayForNull(strategies.value.minterInfo.erc721MintCaps).map((item: {
        account: string;
        cap: number;
      }) => ({
        nftAddress: item.account,
        nftMintCap: item.cap,
      })),
      mintingErcWithUnlimitedlistAddress: arrayForNull(strategies.value.minterInfo.whiteListedERC721).map((address: string) => ({
        address,
      })),
      mintingCapForDaolistAmount: strategies.value.minterInfo.maxMintingAmount === 0 ? [] : [{
        amount: strategies.value.minterInfo.maxMintingAmount,
      }],
      mintingNftWithMaxlistAddress: strategies.value.minterInfo.erc721MintIdCaps,
      mintingNftWithUnlimitedlistAddress: strategies.value.minterInfo.whiteListedERC721Id,
    }
  })

  const setForkedParams = async (daoId?: string) => {
    let params = setupDaoStore.forkedDaoParams
    if (JSON.stringify(setupDaoStore.forkedDaoParams) === '{}' && daoId) {
      params = await setupDaoStore.getForkedDaoParams({ daoId, type: 1 })
      setupDaoStore.setForkedDaoParams(params)
    }
    blockParams.value = params.nodeBlockParam
    worksParams.value = params.nodeWorksParam
    tokenStructure.value = params.nodesTokenStructure
    strategies.value = params.nodesStrategies
  }

  const resetParams = () => {
    setupDaoStore.setForkedDaoParams({} as ForkedParams)
  }


  watch(() => setupDaoStore.forkedDaoParams, () => {
    setForkedParams()
  }, { deep: true })

  return {
    nodeBlockParam,
    nodeWorksParam,
    nodesTokenStructure,
    nodesStrategies,
    setForkedParams,
    resetParams
  }
}