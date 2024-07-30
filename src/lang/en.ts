export default {
  common: {
    submit: 'Submit',
    back: 'Back',
    next: 'Next',
    edit: 'Edit',
    amount: 'Amount',
    tokenId: 'Token ID',
    add: 'Add',
    required: 'Item is required',
    daoExisted: 'This DAO is already in the list',
    sumCantExceed100: 'The sum cannot exceed 100%',
    sumMustEqual100: 'The sum must equal 100%',
    fieldRequired: 'Field is required',
    dontOver: 'The value must be less than {num}',
    dontLess: 'The value must be greater than {num}',
    oneK: '1K',
    fiveK: '5K',
    tenK: '10K',
    fiftyK: '50K',
    oneHundredK: '100K',
    curPrice: 'Current Price',
    floorPrice: 'Floor Price',
    subNodesFee: 'Subnodes Fee',
    builderFee: 'Builder Fee',
    semiosFee: 'Semios Fee',
    unifiedPrice: 'Unified Price',
    setPriceLabel: 'Please set a price',
    setNodeLabel: 'Please select Nodes.',
    noDataInThisRange: 'No data in this time range',
    noDataInThisRangeDesc: 'Try a different time range or check again later.',
    name: 'Name',
    wallet: 'Wallet',
    owned: 'Owned',
    greaterThanZeroOne: 'The value must be greater than 0.0001',
    noItems: 'No items to display',
    loading: 'Loading!',
    loadingText: 'Your transaction is being processed, it should be confirmed on the blockchain shortly.',
    sucTrans: 'Successful transaction!',
    save: 'Save',
    waiting: 'Please continue in the wallet...',
    processing: 'Your change is being processed, it should be finished immedately.',
    noPermissionTip: 'You don‘t have permission to edit this page.',
    loginExpired: 'Login expired, please log in again.',
    noData: 'No items to display.',
    hours: 'Hours',
  },
  PleaseEnterLabel: 'Please enter',
  AddNodeName: {
    title: 'Name Your Nodes',
    info: 'An attractive name will make people flock to it.',
    sub: 'Submit',
    err: {
      name_no: 'This field is required.',
      name_len: 'Ensure this value has at most 45 characters ( it has {0} ).',
    },
  },
  ModeSelection: {
    dialogTitle: 'Mode Selection',
    btnText: 'Basic Mode |Instruction Mode |Professional Mode',
  },
  NodesHeader: {
    titles: [
      {
        name: 'Seed Nodes Asset Type',
        text: "These parameters determine the asset types of Seed Nodes. 'Input Token'  usually refers to the mint fee, while 'Output Token' is usually used for incentives. Please note that the Asset Types cannot be changed once Seed Nodes are set up successfully, all subsequent Subnodes will follow these two Asset Types. If 'Output Token' is 'Generate' mode, Semios will automatically create an ERC-20 contract and mint 1 billion ERC-20 tokens to the ‘Treasury’  You can view and choose how to allocate these ERC-20 tokens through the 'Treasury' in the 'Seed Nodes' . If 'Import'  mode is selected, the 'Treasury Deposit' function can be used to import ERC-20 tokens into the Treasury.",
      },
      {
        name: 'Nodes Block Parameters',
        text: 'These parameters primarily shape the life cycle, ERC-20 Token type, and ERC-20 supply of the Nodes. Block rewards are triggered only once per mint window, contingent on the occurrence of minting activities. The reward amount is determined by dividing the Asset Pool balance during minting by the remaining number of mint windows.',
      },
      {
        name: 'Nodes Works Parameters',
        text: 'These parameters mainly define the work price related parameters.',
      },
      {
        name: 'Nodes Tokenomics Structure',
        text: 'These parameters are utilized to determine the allocation of the Block Reward. The distribution of rewards involves two levels. Initially, the block reward is allocated in Nodes Level. If Nodes Internal Incentives is specified, this portion of the assets will be allocated based on the respective contributions of Nodes members.',
      },
      {
        name: 'Nodes Strategies',
        text: 'Strategies are used to determine whether a user is eligible to add or mint work under this Nodes. The order of strategies reflects their priority, with the uppermost strategy having a higher priority.',
      },
      {
        name: 'Setup Nodes',
        text: '',
      },
    ],
  },
  AddFormAssetType: {
    title: 'Seed Nodes Asset Type',
    inputTokenLabel: 'Input Token',
    inputTokenTip: 'Input Token',
    inputTokenErc20ContractAddressLabel: 'Input Token ERC-20 Contract Address',
    inputTokenErc20ContractAddressTip: 'Input Token ERC-20 Contract Address',
    inputTokenErc20ContractAddressPlaceholder:
      'Please input your ERC-20 Contract Address',
    thirdPartyLabel: 'Output Token',
    thirdPartyTip: 'Output Token',
    erc20ContractAddressLabel: 'Output Token ERC-20 Contract Address',
    erc20ContractAddressTip: 'Output Token ERC-20 Contract Address',
    erc20ContractAddressPlaceholder:
      'Please input your ERC-20 Contract Address',
    wrongAddress: 'Wrong address please modify and resubmit.',
    invalidERC20Contract: 'Invalid ERC-20 Contract',
    inTAndOutTBeTheSame: 'Input token and Output token cannot be the same ERC-20 contract address.',
  },
  AddFormBlock: {
    title: 'Nodes Block Parameters',
    daoStartDateLabel: 'Start Date',
    daoStartDateTip:
      'Date you wish to start the mint process. All time UTC+0. Choosing today means the Nodes will start immediately after launch successfully.',
    topUpModeLabel: 'Top-up Mode',
    topUpModeTip:
      'In the Top-up mode, the ERC-20 Tokens obtained by minting is locked. Only after the user spends ETH on minting works under related Nodes will they receive the corresponding proportion of ERC-20 Tokens.',
    infiniteModeLabel: 'Infinite Mode',
    infiniteModeTip:
      'For Nodes that turn on this mode, their block rewards are always equal to all the assets in the nodes asset pool, and this Nodes will never end.',
    daoMintWindowLabel: 'Nodes Block Window',
    daoMintWindowTip:
      'The works of this Nodes cannot be minted after Block Window.',
    daoMintWindowPlaceholder: 'Please enter your Block Window.',
    daoMintWindowDurationLabel: 'Nodes Block Window Duration',
    daoMintWindowDurationTip: 'The duration of the Block Window.',
    daoMintWindowDurationPlaceholder:
      'Please enter your Nodes Block Window Duration.',
    totalNftCastingLabel: 'Total ERC-721 Mint Cap',
    totalNftCastingTip:
      'Maximum number of ERC-721 that can be minted from this Nodes.',
    dailyMintCapLabel: 'Block Window ERC-721 Mint Cap',
    dailyMintCapTip:
      'Maximum number of ERC-721 that can be minted from this Nodes daily.',
    timeZoneTip: 'Please note, the start time is based on the UTC+0 timezone.',
    // dailyMintCapPlaceholder: 'Please enter quantity',
  },
  AddFormWork: {
    title: 'Nodes Works Parameters',
    needMintableWorkLabel: 'Create Nodes Passes',
    needMintableWorkTip:
      "A special type of work that can be repeatedly minted, where the work's image will change based on your logo, and their pricing follows either a fixed price model at the ERC-721 floor price or unified price.",
    passesQuantityLabel: 'Passes Quantity',
    passesQuantityPlaceholder: 'Please input your ERC-20 Contract Address',
    daoTokenModeLabel: 'ERC-20 Token Mode',
    daoTokenModeTip:
      "Turning on this mode means that the prices of all works under this Nodes can only be minted at this price. Please note that this mode can only be activated during the Nodes launch. Once activated, it cannot be deactivated via 'Edit On-chain Parameters.'",
    unifiedPriceModeLabel: 'Unified ERC-721 Mint Fee Mode',
    unifiedPriceModeTip:
      "Turning on this mode means that the prices of all works under this Nodes can only be minted at this price. Please note that this mode can only be activated during the Node's launch. Once activated, it cannot be deactivated via 'Edit On-chain Parameters.'",
    unifiedPriceLabel: 'Unified Price',
    unifiedPriceTip:
      'The prices of all works under this Nodes can only be minted at this price',
    unifiedPricePlaceholder: 'Please',
    unifiedPriceWarn:
      "Setting the Unified Price to 0 ETH will lock all Mint Fees at 0 ETH, and you can't change it later via 'Edit On- chain Parameters.' Be cautious when setting this value.",
    daoFloorPriceLabel: 'ERC-721 Floor Price',
    daoFloorPriceTip:
      'The floor price of all works under Nodes when they are added.',
    // daoFloorPricePlaceholder: 'Please enter quantity',
    fluctuationMethodLabel: 'ERC-721 Price Fluctuation Method',
    fluctuationMethodTip:
      'The method of price fluctuation for other works under the same builder within the same Nodes when minting an ERC-721.',
    doublingFactorLabel: 'Scaling Factor',
    doublingFactorTip:
      'The price increases or decrease exponentially, the price calculation formula is: current price* scaling factor.',
    // doublingFactorPlaceholder: 'Please enter quantity',
    growthFactorLabel: 'Growth Factor',
    growthFactorTip:
      'The price increases or decrease linearly, the price calculation formula is: current price +growth factor.',
    // growthFactorPlaceholder: 'Please enter quantity',
    exponentialIncrease: 'Exponential Increase',
    linearIncrease: 'Linear Increase',
  },
  AddFormTokenomicsStructure: {
    title: 'Nodes Tokenomics Structure',
    lotteryModeLabel: 'Lottery Mode',
    lotteryModeTip:
      'In the lottery mode, each Block Reward is generated normally regardless of whether there is a minter minting or not. The rewards for Block without minting will rollover to the next block with minting.',
    lotteryModePlaceholder: '',
    nodeLevelLabel: 'Nodes Level Asset Allocation',
    nodeLevelTip:
      'These parameters are used to control the proportion of ETH and ERC-20 Token allocation between related Nodes.',
    ethAllocationLabel: 'ETH Allocation',
    ethAllocationTip:
      'This parameter controls the allocation ratio of ETH among Nodes. Mainly divided into four parts:Seed Nodes Redeem Pool (Used for ERC-20 holder to redeem the corresponding ETH), Nodes Internal Incentives, Nodes Reserve(The share of each block reward reserved in the Subnodes asset pool）and other related Nodes. If you have a ratio assigned to an related Node, you can add it by yourself. Notice that if you enabled third- party erc- 20 Mode, Seed Nodes Redeem Pool will not exist.',
    redeemPoolRatioETHPlaceholder: 'For Seed Nodes Redeem Pool',
    selfRewardRatioETHPlaceholder: 'This Nodes Internal Incentives',
    nodesReservesRatioETHPlaceholder: 'This Nodes Reserves',
    ETHOtherNodesPlaceholder: 'ETH to Other Nodes',
    erc20AllocationLabel: 'ERC-20 Allocation',
    erc20AllocationTip:
      'This parameter controls the proportion of ERC-20 tokens allocated among Nodes. Mainly divided into Three parts:Internal Incentives, Nodes Reserve(The share of each block reward reserved in the Subnodes asset pool）and other related Nodes. If you have a ratio assigned to an related Node, you can add it by yourself.',
    selfRewardRatioERC20Placeholder: 'This Nodes Internal Incentives',
    nodesReservesRatioERC20Placeholder: 'This Nodes Reserves',
    ERC20OtherNodesPlaceholder: 'ERC-20 to Other Nodes',
    assetsInteractswithOtherNodesLabel: 'Assets Interacts with Other Nodes',
    assetsInteractswithOtherNodesTip:
      'These parameters determine how to allocate your assets to Other SubNodes.',
    ethToOtherNodesLabel: 'ETH to Other Nodes',
    ethToOtherNodesTip:
      'You can decide how to allocate ETH to other SubNodes. Please note that the ratio you intend to allocate cannot exceed the allocatable ratio.',
    addBtn: 'Add More Nodes',
    erc20ToOtherNodesLabel: 'ERC-20 to Other Nodes',
    erc20ToOtherNodesTip:
      'You can decide how to allocate ERC-20 to other SubNodes. Please note that the ratio you intend to allocate cannot exceed the allocatable ratio.',
    allocatableRatioLabel: 'Allocatable Ratio',
    // pleaseErc20: 'Please input',
    // pleaseETH: 'Please input',
    thisNodesInternalIncentivesLaabel: 'This Nodes Internal Incentives',
    thisNodesInternalIncentivesTip:
      'These parameters control the allocation ratio of relevant parameters such as ETH, ERC-20 Token, and the minting fee within Nodes.',
    erc721MintFeeLabel: 'ERC-721 Mint Fee',
    erc721MintFeeTip:
      'The reserve ratio determine the allocation of the minting fee.The Semios mint fee should fix at 2.5%, while the remaining 97.5% is split between the Builder, SubDAO and Seed Nodes Redeem Fee. The Builder, Subnodes Fee and Seed Nodes Redeem Fee mint fee can be adjusted as desired, with the condition that the Subnodes Fee proportion remains between 2.5% and 97.5% .The combined total of these three should to 100%.',
    floatingMintPriceLabel: 'Floating Mint price',
    builderFeeLabel: 'Builder Fee',
    subNodesFeeLabel: 'Subnodes Fee',
    seedNodesFeeLabel: 'Seed Nodes Fee',
    semiosFeeLabel: 'Semios Fee',
    fixedMintPriceLabel: 'Fixed Mint price',
    erc20IncentivesLabel: 'ERC-20 Incentives',
    erc20IncentivesTip:
      ' ERC-20 Tokens reward to Builder, Minter and Starter based on ERC-721 Mint Fee. The Semios Incentives should fix at 2%, while the remaining 98% is split .',
    builderLabel: 'Builder Incentives',
    minterLabel: 'Minter Incentives',
    starterLabel: 'Starter Incentives',
    semiosLabel: 'Semios Incentives',
    ethIncentivesLabel: 'ETH Incentives',
    ethIncentivesTip:
      'When assets are sold out, ETH will reward Builder, Minter, SubNodesStarter, and Semios in proportion. The total of these four parts should be equal to 100%.',
    oldFee: '2.5',
    PleaseEnterLabel: 'Please',
  },
  AddFormNodesStrategies: {
    title: 'Nodes Strategies',
    builderLabel: 'Builder',
    blacklistAddressLabel: 'Blacklist Address',
    blacklistAddressTip:
      'Address in this list cannot add work under this Nodes.',
    whitelistAddressLabel: 'Whitelist Address',
    whitelistAddressTip:
      'Only addresses on this list can add work under this Nodes.',
    whitelistedNFTLabel: 'Whitelisted NFT',
    whitelistedNFTTip: 'Whitelisted NFT',
    whitelistErc721Label: 'Whitelist ERC-721',
    whitelistErc721Tip:
      'Only holders of ERC-721 on this list can add works under this Nodes.',
    minterLabel: 'Minter',
    whitelistAddressWithMaxMintingLabel: 'Whitelist Address With Max Minting',
    whitelistAddressWithMaxMintingTip:
      ' Only addresses on this list can mint works under this Node, and the minting amount of works is subject to specified quantity limits.',
    whitelistAddressWithUnlimitedMintingLabel:
      'Whitelist Address With Unlimited Minting',
    whitelistAddressWithUnlimitedMintingTip:
      'Only addresses on this list can mint works under this Node, and the minting amount of works is unlimited.',
    whitelistedNFTWithMaxMintingLabel: 'Whitelisted NFT With Max Minting',
    whitelistedNFTWithMaxMintingTip: 'Whitelisted NFT With Max Minting',
    whitelistedNFTWithUnlimitedMintingLabel:
      'Whitelisted NFT With Unlimited Minting',
    whitelistedNFTWithUnlimitedMintingTip:
      'Whitelisted NFT With Unlimited Minting',
    whitelistERC721WithUnlimitedMintingLabel:
      'Whitelist ERC-721 With Unlimited Minting',
    whitelistERC721WithUnlimitedMintingTip:
      'Only holders of ERC-721 on this list can mint works under this Node,and the minting amount of works is unlimited.',
    whitelistedERC721WithMaxMintingLabel:
      'Whitelisted ERC-721 With Max Minting',
    whitelistedERC721WithMaxMintingTip:
      'Only holders of ERC-721 on this list can mint works under this Node,and the minting amount of works is subject to specified quantity limits.',
    unifiedMintingCapForNodeLabel: 'Unified Minting Cap For Node',
    unifiedMintingCapForNodeTip:
      'Each address can only mint less than Unified Minting Cap of works.',
  },
  Explore: {
    tabs: 'Mintable Works | NFTs | SubNodes',
    seedNodes: 'Seed Nodes',
  },
  NodeTitle: {
    feePoolLabel: ' SubNodes Asset Pool',
    erc721AddressLabel: 'ERC-721 Contract Address',
    erc20AddressLabel: 'ERC-20 Contract Address',
    inputTokenContractAddressLabel: 'Input Token Contract Address',
    outputTokenContractAddressLabel: 'Output Token Contract Address',
    seedNodesBtn: 'Seed Nodes',
    relatedNodesLabel: 'Related Nodes',
    creatorLabel: 'Creator',
    blockWindowCountdownLabel: 'Block Window Countdown',
    permissionsNftLabel: 'Permissions NFTs',
    viewAll: 'View All',
  },
  NodeDetail: {
    mintableWorksLabel: 'Mintable Works',
    nftsLabel: 'NFTs',
    drbNFTsLabel: 'DRB NFTs',
    relatedNodesLabel: 'Related Nodes',
    analyticsLabel: 'Analytics',
    assetAllocationOverviewLabel: 'Asset Allocation Overview',
    nodesManifestolabel: 'Nodes Manifesto',
    nodesDescriptionLabel: 'Nodes Description',
    addressPlaceholder: 'Address',
    tokenIdPlaceholder: 'Token ID',
    nftMintCapPlaceholder: 'Max Minting Amount',
    amountPlaceholder: 'Amount',
    totalNftCastingLabel: 'Total ERC-721 Mint Cap',
    blockMintedWorkByBlockMintCapLabel: 'Block Minted Work /Block Mint Cap',
    subNodesAssetPoolETHLabel: 'SubNodes Asset Pool ETH',
    blockWindowDurationLabel: 'Block Window Duration',
    remainingBlockWindowsLabel: 'Remaining Block Windows',
    subNodesAssetPoolERC20TokensLabel: 'SubNodes Asset Pool ERC-20 Tokens',
    mintersLabel: 'Minters',
    mintFeeLabel: 'Mint Fee',
    mintedWorksLabel: 'Minted Works',
    blockRewardLabel: 'Block Reward',
    internalIncentivesLabel: 'Internal Incentives',
    lotteryModeLabel: 'Lottery Mode',
    erc20TokenModeLabel: 'ERC-20 Token Mode',
    rolloverLabel: 'Rollover',
    topupModeLabel: 'Top-up Mode',
    unifiedPriceModeLabel: 'Unified Price Mode',
    specialStartegyLabel: 'Special Startegy',
    infiniteModeLabel: 'Infinite Mode',
    currentBlockWindowInformationLabel: 'Current Block Window Information',
    basicInformationLabel: 'Basic Information',
    modeStatusLabel: 'Mode Status',
    ethlabel: 'ETH',
    erc20TokenLabel: 'ERC-20 Token',
  },
  IsAcceptSignDialog: {
    termsofServiceLabel: 'Terms of Service',
    infoText: 'By using Semios you agree to our',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    signBtn: 'Accept and sign',
  },
  CardLeftFilter: {
    priceRangeLabel: 'Price Range(ETH)',
    typeSaleLabel: 'Type of Sale',
    applyBtn: 'Apply',
    priceError: 'The maximum price must be greater than the minimum price.',
  },
  AddLoading:
    'Your Nodes is being created, it should be confirmed on the blockchain shortly.',
  WorkDetail: {
    matchMediaintedPassesByTotalMintablePassesLabel:
      'Minted Passes/Total Mintable Passes',
  },
  SetupPlan: {
    input: 'Input Token Incentive',
    output: 'Output Token Incentive',
    ioTitle: 'Select Input or Output Token for Incentive',
    ioTooltip: "The criteria for calculating contributions in this incentive plan. Rewards for each block are distributed based on each user's contribution. Contribution is calculated by summing the Input Tokens/Output Tokens (based on your selection) of all Top-up Holders under this Seed Node, and distributing tokens based on each individual's contribution proportion.",
    token: 'Token For This Plan',
    tokenTooltip: 'The token that will be used to calculate the contribution of Top-up Holders in this incentive plan.',
    inputTokenForSeed: 'Input Token Of This Seed Nodes',
    outputTokenForSeed: 'Output Token Of This Seed Nodes',
    cusRewardToken: 'Custom Reward Tokens',
    erc20ContractAddress: 'Token ERC-20 Contract Address',
    erc20ContractAddressTooltip: 'Token ERC-20 Contract Address',
    planAddressTokenHolder: 'Please Enter ERC-20 Contract Address',
    planStartDateLabel: 'Start Date',
    planStartDateTooltip: 'Date you wish to start this plan. All time UTC+0. Choosing today means the Nodes will start immediately after setup successfully.',
    totalRewardLabel: 'Seed Nodes Output Token Amount',
    totalRewardTip: 'The desired amount of tokens that the incentive plan aims to incentivize.',
    totalRewardPlaceholder: 'Please Enter Amount',
    totalRoundsLabel: 'Incentive Block',
    totalRoundsTip: 'The Total Blocks for this Incentive Plan. Each block will release a reward once, and the amount of the reward is determined by dividing Incentive Plan  Remaing Tokens by the remaining Blocks.',
    totalRoundsDer: 'Please select your Nodes Block Window',
    durationLabel: 'Block Duration',
    durationTip: 'The duration of the Block.',
    durationPlaceholder: 'Please set the duration',
    loadingTitle: 'Setup Plan',
    loadingText: 'Your Plan is being created, it should be confirmed on the blockchain shortly.',
    addPlanLoadingTitle: 'Loading!',
    addPlanLoadingText: 'Your transaction is being processed, it should be confirmed on the blockchain shortly.',
    treasuryDialogText: 'How do you want to allocate token for this Plan?',
    treasuryDialogTitle: 'Source Of This Payment',
    treasury: 'Treasury',
    myWallet: 'My Wallet',
    title: 'Setup Top-up Holders Incentive Plan',
  },
  IncentivePlan: {
    'btnText': 'Click here to setup Top-up Holders Incentive Plan for this Seed Nodes',
    'basicTab': 'Basic Information',
    'curBlockInfoTab': ' Current Block Information',
    'planType': 'Top-Up Holders Incentive Plan',
    'planAPRLabel': 'Maximum Attainable APR For This Plan',
    'planBtn': 'Add Tokens To Plan',
    'planNotStarted': 'This plan has not started yet',
    'planClosed': 'This plan is closed',
    'topupHoldersLabel': 'Top-up Holders',
    'topupBalanceLabel': 'Total Incentivized Token for This Block',
    'blockRewardLabel': 'Incentive Token For This Block',
    'blockEndTimeLabel': 'blockEndTime',
    'inputToken': 'Input Token',
    'outputToken': 'Output Token',
    'tokenType': 'Incentivized Token Type',
    'hours': 'Hours',
    'blockDuration': 'Block Duration',
    'totalTokenForPlan': 'Total Tokens Allocated For This Plan',
    'tokenReleasedForPlan': 'Tokens already released for this plan',
    'startData': 'Start Date',
    'noItem': 'No items to display',
    'diaTitle': 'Add Tokens To Plan',
    'addTokens': 'Add Tokens',
    'createPlanLoadingText': 'Your Plan is being created, it should be confir med on the blockchain shortly.'
  },
  chooseTypeSale: {
    floatingPrice: 'Floating Price',
    fixedPrice: 'Fixed Price',
    unifiedPrice: 'Unified Price',
  },
  fixedPriceTab: {
    title: 'Work is listed for sale at the price you set.',
  },
  floatingPriceTab: {
    title: 'The price of work will be dynamically adjusted based on the sales of works under the same Builder.',
  },
  addwork: {
    title: 'Add Works',
    worksLimitNotice: 'Unminted works cannot exceed 500.',
    noWorks: 'No works yet, please add',
    workDescLabel: 'Please enter your work description, Markdown syntax is supported.',
    uploadWorkSus: 'You have successfully uploaded your work. You can mint or invite others to mint your work.',
    mintOrTransNft: 'Mint & Transfer NFT',
  },
  unifiedPriceTab: {
    title: 'This DAO has opened Unified Pricing Mode, all works under this DAO will be minted at the unified price set by the starter.'
  },
  daoCollectionAnalytics: {
    leftBtnDesc: 'Click here to Launch Subnodes for this series of Nodes, Only Seed Nodes Starter can set ERC- 20 Tokens Allocation.',
    seedNodesErc20Info: 'Seed Nodes ERC-20 Info',
    totalSupply: 'Total supply',
    circulatingErc20: 'Circulating ERC-20',
    ethInRedeemPool: 'ETH In Redeem Pool',
    redeemed: 'Redeemed',
    maker: 'Maker',
    totalUnspentETH: 'Total Unspent ETH',
    totalLockedERC20: 'Total Locked ERC-20',
    membersOfSeedNodes: 'Members Of Seed Nodes',
    starter: 'Starter',
    builder: 'Builder',
    minter: 'Minter',
    nftHolders: 'NFT Holders',
    erc20Holders: 'ERC-20 Holders',
    incentivePlan: 'Incentive Plan',
    inProgress: 'In Progress',
    closed: 'Closed',
    upComing: 'Upcoming',
    subnodesQuantity: 'SubNodes Quantity',
    treasury: 'Treasury',
    treaBalance: 'Treasury Balance',
    rightMakerTopupBalanceETHTokens: {
      title: 'Top-up Balance : ETH Unlock ERC-20 Tokens',
      desc: 'Proportion of ERC-20 Tokens unlocked when Using Top-up to unlock ERC- 20 Tokens',
      tooltip: 'Your modification is being processed, it should be confirmed on the blockchain shortly.',
    },
    rightMakerTopupBalanceERC20Tokens: {
      title: 'Top-up Balance : ERC-20 Tokens Unlock ETH',
      desc: 'Proportion of ETH unlocked when Using Top-up to unlock ETH',
      tooltip: 'Your modification is being processed, it should be confirmed on the blockchain shortly.',
    },
  },
  rightMemberTitle: {
    editInfo: 'Edit Information',
    editOnchainParam: 'Edit On-chain Parameter',
    editStra: 'Edit Strategy'
  },
  RightSeedNodesInfoAssetPoolETHChart: {
    title: 'SubNodes Asset Pool ETH'
  },
  RightSeedNodesInfoOwners: {
    title: 'ERC20 Owners',
    top100: 'Top 100',
    noEvent: 'No events have occurred yet',
    noEventDesc: 'Check again later.'
  },
  setupDaoSuc: {
    title: 'Setup Successful',
    desc: `Here is your "Ownership NFT," which binds specific permissions for managing your Nodes. For more information, please refer to the NFT's description.`,
    nodeDetail: 'Explore Nodes Details',
    nftDetail: 'Explore NFT Details',
  },
  myPermissions: {
    title: 'My Permissions',
    permissionTransfer: 'Permission Transfer',
    permissions: 'Permissions',
    nodes: 'Nodes',
    nfts: 'NFTs',
    transfer: 'Transfer',
    permissionOfNft: 'The number of permissions bound to this NFT',
    editTip: 'Transfer this permission to other NFT'
  },
  nftDetail: {
    nftPermission: 'Permission Bound To This NFT',
    nodes: 'Nodes',
    permissionToTransfer: 'Permission Bound to this NFT',
    lockedTip: 'This NFT is already locked.'
  },
  permissionList: {
    title: 'Permissions NFT',
    permission: 'Permissions',
    nft: 'NFT',
    holder: 'Holder',
  },
  editInfo: {
    title: 'Edit Information',
    subTitle: 'Edit Information Permission is bound to',
  },
  editOnchainParam: {
    title: 'Edit On-Chain Parameters',
    subTitle: 'Edit On-chain Parameters Permission is bound to',
  },
  nodesStrategies: {
    title: 'Nodes Strategies',
    subTitle: 'Edit Strategies Permission is bound to ',
  },
  maker: {
    subTitle: 'Top-Up Governance Permission is bound to '
  },
  treasury: {
    address: 'Treasury Address',
    erc20ContractAddress: 'ERC-20 Contract Address',
    subTitle: 'Treasury Permission is bound to '
  },
  myCreatedNodes: {
    title: 'My Created Nodes',
  },
}
