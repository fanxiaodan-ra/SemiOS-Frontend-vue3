export type Erc721MintIdCaps = Array<{
  nftAddress: string;
  tokenId: number;
  nftMintCap: number;
} >

export type WhiteListedERC721Id = Array<{
  erc721Address: string;
  tokenId: number;
} | never >;

export type ReserveRatio = {
  builder: number;
  mainDao: number;
  pDao: number;
  subDao: number;
}

export type ethReserveRatio = {
  pDao: number;
  subDao: number;
  builder: number;
  minter: number;
}

export type MintCaps = Array<{
  account: string;
  cap: number;
}>;

export type MintingAddress = Array<{
  address: string;
  amount: number;
} | never >

export type ERCNftAddress = Array<{
  nftAddress: string;
  nftMintCap: number;
} | never >

export type TokenAllocationVos = {
  daoId: number;
  projectId: string;
  daoName: string;
  daoNumber: number;
  royaltyProportion: number;
  royaltyType: number;
}

export type NodeList = {
  projectId: string;
  value: number;
  daoName: string;
}

export type ForkedParams = {
  seedNodesType: {
    payCurrencyType: string;
    inputTokenAddress: string;
    isThirdpartyToken: number;
    erc20Token: string;
  },
  nodeBlockParam: {
    topupMode: number;
    infiniteMode: number;
    daoMintWindow: number;
    duration: number;
    totalNftCasting: number;
    dailyMintCap: number;
  },
  nodeWorksParam: {
    needMintableWork: number;
    generateWorkSet: number;
    erc20PaymentMode: number;
    globalDaoPriceMode: number;
    globalDaoPrice: number;
    daoFloorPrice: number;
    canvasPriceFluctuationMethod: number;
    fluctuationMethodFactor: number;
  },
  nodesTokenStructure: {
    royaltyTokenLotteryMode: number;
    ethAllocation: {
      seedNodesRedeemPool: string;
      nodesInternalIncentives: string;
      nodesReserves: string;
      ethToOtherNodes: string;
    },
    daoAllocation: {
      nodesInternalIncentives: string;
      nodesReserves: string;
      erc20TOtherNodes: string;
    },
    floatingMintPrice: {
      d4aMintFee: number;
      daoMintFee: number;
      redeemPoolMintFee: number;
      canvasMintFee: number;
    },
    fixedMintPrice: {
      d4aMintFee: number;
      daoMintFee: number;
      redeemPoolMintFee: number;
      canvasMintFee: number;
    },
    erc20Incentives: {
      daoReward: number;
      d4aReward: number;
      canvasReward: number;
      minterReward: number;
    },
    ethIncentives: {
      daoCreatorETHReward: number;
      d4aReward: number;
      canvasCreatorETHReward: number;
      minterETHReward: number;
    },
    daoEthAllocationVos: Array<TokenAllocationVos>,
    daoTokenAllocationVos: Array<TokenAllocationVos>,
  },
  nodesStrategies: {
    builderInfo: {
      whiteList: Array<string>;
      blackList: Array<string>;
      whiteListedERC721Id: WhiteListedERC721Id;
      whiteListedERC721: Array<string>;
    };
    minterInfo: {
      blackList: Array<string>;
      designatedMintCaps: MintCaps;
      whiteListAddress: Array<string>;
      erc721MintIdCaps: Erc721MintIdCaps;
      whiteListedERC721Id: WhiteListedERC721Id;
      erc721MintCaps: MintCaps;
      whiteListedERC721: Array<string>;
      maxMintingAmount: number;
    };
  }
}

export type SetupDaoParams = {
  daoName: string;

  //1.7
  inputToken: string;
  inputTokenErc20ContractAddress: string;
  thirdParty: boolean;
  erc20ContractAddress: string;
  mintingNftWithMaxlistAddress: Erc721MintIdCaps;
  mintingNftWithUnlimitedlistAddress: WhiteListedERC721Id;
  // ------- block

  daoStartDate: string;
  topUpMode: boolean;
  infiniteMode: boolean;
  daoMintWindow: number;
  daoMintWindowDuration: number;
  totalNftCasting: number;
  dailyMintCap: number;
  // ------- work

  needMintableWork: boolean;
  passesQuantity: number;
  daoTokenMode: boolean;
  daoFloorPrice: number;
  unifiedPriceMode: boolean;
  unifiedPrice: number;
  fluctuationMethod: number;
  doublingFactor: number;
  growthFactor: number;

  //----------Nodes Tokenomics Structure
  lotteryMode: boolean;
  ERC20OtherNodes: number;
  ERCOtherNodeslist: Array<NodeList>;
  ETHOtherNodesList: Array<NodeList>;
  ETHOtherNodes: number;
  nodesReservesRatioERC20: number;
  nodesReservesRatioETH: number;
  selfRewardRatioERC20: number;
  selfRewardRatioETH: number;
  redeemPoolRatioETH: number;
  daoPriceReserveRatio: ReserveRatio;
  fixedPriceReserveRatio: ReserveRatio;
  royalty: ethReserveRatio;
  eth: ethReserveRatio;

  workBlacklistAddress: Array<string>;
  workWhitelistAddress: Array<string>;
  workErclistAddress: Array<string>;
  workNftlistAddress: WhiteListedERC721Id;
  mintingBlacklistAddress: Array<string>;
  mintingWithMaxlistAddress: MintingAddress;
  mintingWithUnlimitedlistAddress: Array<{ address: string }>;
  mintingErcWithMaxlistAddress: ERCNftAddress;
  mintingErcWithUnlimitedlistAddress: Array<{ address: string }>;
  mintingCapForDaolistAmount: Array<{ amount: number }>;

  tokenAllocation: number;
  type: number;
  existDaoId: string;
  isAncestorDao: boolean;
  initData: any;
}