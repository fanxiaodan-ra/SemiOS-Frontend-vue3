export default {
  PleaseEnterLabel: 'Please enter',
  AddNodeName: {
    title: 'Name your Nodes',
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
      'This parameter controls the allocation ratio of ETH among Nodes. Mainly divided into four parts:Seed Nodes Redeem Pool (Used for ERC-20 holder to redeem the corresponding ETH), Nodes Internal Incentives, Nodes Reserve(The share of each block reward reserved in the Sub Nodes asset pool）and other related Nodes. If you have a ratio assigned to an related Node, you can add it by yourself. Notice that if you enabled third- party erc- 20 Mode, Seed Nodes Redeem Pool will not exist.',
    redeemPoolRatioETHPlaceholder: 'For Seed Nodes Redeem Pool',
    selfRewardRatioETHPlaceholder: 'This Nodes Internal Incentives',
    nodesReservesRatioETHPlaceholder: 'This Nodes Reserves',
    ETHOtherNodesPlaceholder: 'ETH to Other Nodes',
    erc20AllocationLabel: 'ERC-20 Allocation',
    erc20AllocationTip:
      'This parameter controls the proportion of ERC-20 tokens allocated among Nodes. Mainly divided into Three parts:Internal Incentives, Nodes Reserve(The share of each block reward reserved in the Sub Nodes asset pool）and other related Nodes. If you have a ratio assigned to an related Node, you can add it by yourself.',
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
      'The reserve ratio determine the allocation of the minting fee.The Semios mint fee should fix at 2.5%, while the remaining 97.5% is split between the Builder, SubDAO and Seed Nodes Redeem Fee. The Builder, Sub Nodes Fee and Seed Nodes Redeem Fee mint fee can be adjusted as desired, with the condition that the Sub Nodes Fee proportion remains between 2.5% and 97.5% .The combined total of these three should to 100%.',
    floatingMintPriceLabel: 'Floating Mint price',
    builderFeeLabel: 'Builder Fee',
    subNodesFeeLabel: 'Sub Nodes Fee',
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
    erc721AddressLabel: 'ERC-721 Contract address',
    erc20AddressLabel: 'ERC-20 Contract address',
    inputTokenContractAddressLabel: 'Input Token Contract Address',
    outputTokenContractAddressLabel: 'Output Token Contract Address',
    seedNodesBtn: 'Seed Nodes',
    relatedNodesLabel: 'Related Nodes',
    creatorLabel: 'Creator',
    blockWindowCountdownLabel: 'Block Window Countdown',
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
    blockMintedWorkByBlockMintCapLabel: 'Block Minted Work /Block Mint cap',
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
    infoText: 'By using ProtoDAO you agree to our',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    signBtn: 'Accept and sign',
  },
  CardLeftFilter: {
    priceRangeLabel: 'Price Range(ETH)',
    typeSaleLabel: 'Type of Sale',
    applyBtn: 'Apply',
  },
  AddLoading:
    'Your Nodes is being created, it should be confirmed on the blockchain shortly.',
  WorkDetail: {
    matchMediaintedPassesByTotalMintablePassesLabel:
      'Minted Passes/Total Mintable Passes',
  },
}
