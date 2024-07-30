import useUserStore from '@/store'
import { ethers } from 'ethers'
import { BigNumber } from 'bignumber.js'

const getProvider = () => {
  const provider = $onboard.state.get().wallets?.[0]?.provider
  if (provider) {
    return new ethers.providers.Web3Provider(provider, 'any')
  } else {
    let providerURL = 'https://rpc.ankr.com/multichain'
    return new ethers.providers.JsonRpcProvider(providerURL)
  }
}
const getBalance = async () => {
  const address = $onboard.state.get().wallets?.[0].accounts?.[0].address
  const balance = await getProvider().getBalance(address)
  return address ? new BigNumber(ethers.utils.formatEther(balance)).toNumber() : 0
}
const sig = () => {
  const pro = getProvider().getSigner()
  return pro
}

//call()
const call = (contractAddress: string, abi: any) => {
  const contract = new ethers.Contract(contractAddress, abi, getProvider())
  return contract
}
//send
const send = (contractAddress: string, abi: any) => {
  const signer = getProvider().getSigner()
  const contract = new ethers.Contract(contractAddress, abi, signer)
  return contract
}

const decimals = async (address: string) => {
  const store = useUserStore()
  const contract = call(address, JSON.parse(store.PactAbi.d4a_erc20_abi))
  const bla = await contract.decimals()
  return bla.toString()
}

const updateTopUpAccount = async (data: any) => {
  const store = useUserStore()
  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.pd_plan_abi)
  )
  const bla = await contract.callStatic.updateTopUpAccount(
    data.projectId,
    data.NftIdentifier
  )
  return bla
}

const createDaoForFunding = async (data: any) => {
  const store = useUserStore()
  const createSemiDaoParam = {
    existDaoId: data.existDaoId,
    daoMetadataParam: data.daoMetadataParam,
    whitelist: data.whitelist,
    blacklist: data.blacklist,
    daoMintCapParam: data.daoMintCapParam,
    nftMinterCapInfo: data.nftMinterCapInfo,
    nftMinterCapIdInfo: data.nftMinterCapIdInfo,
    templateParam: data.templateParam,
    basicDaoParam: data.basicDaoParam,
    continuousDaoParam: data.continuousDaoParam,
    allRatioParam: data.allRatioParam,
    actionType: data.actionType,
  }
  const overrides = {
    value: ethers.utils.parseEther(data.createProjectFee + ''),
  }
  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.pd_create_abi)
  )
  const tx = await contract.createDao(createSemiDaoParam, overrides)

  return tx
}
const setDaoParamsFunding = async (data: any) => {
  const store = useUserStore()
  const req = {
    daoId: data.daoId,
    nftMaxSupplyRank: data.nftMaxSupplyRank,
    remainingRound: data.remainingRound,
    daoFloorPrice: data.daoFloorPrice,
    priceTemplateType: data.priceTemplateType,
    nftPriceFactor: data.nftPriceFactor,
    dailyMintCap: data.dailyMintCap,
    unifiedPrice: data.unifiedPrice,
    changeInfiniteMode: data.changeInfiniteMode,
    setChildrenParam: data.setChildrenParam,
    allRatioParam: data.allRatioForFundingParam,
  }
  const protocolAddress = store.PactAbi.protocol_contract
  const abi = JSON.parse(store.PactAbi.protocol_setter_abi)
  const contract = send(protocolAddress, abi)
  const tx = await contract.setDaoParams(req)
  return tx
}

const getCode = async (address: string) => {
  const isCode = await getProvider().getCode(address)
  const erc20_methods = [
    '06fdde03',
    '95d89b41',
    '313ce567',
    '18160ddd',
    '70a08231',
    'a9059cbb',
    '23b872dd',
    '095ea7b3',
    'dd62ed3e',
  ]
  const erc20_events = [
    'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  ]
  const proxy_prefix = '0x363d3d373d3d3d363d73'
  let isMet = null
  let isEve = null
  if (isCode.includes(proxy_prefix)) {
    if (isCode.length < proxy_prefix.length + 40) {
      return false
    } else {
      const contract_impl =
        '0x' + isCode.substring(proxy_prefix.length, proxy_prefix.length + 40)
      const isCodeTwo = await getProvider().getCode(contract_impl)
      isMet = erc20_methods.find((item) => !isCodeTwo.includes(item))
      isEve = erc20_events.find((item) => !isCodeTwo.includes(item))
      if (isMet || isEve) {
        return false
      } else {
        return true
      }
    }
  } else {
    isMet = erc20_methods.find((item) => !isCode.includes(item))
    isEve = erc20_events.find((item) => !isCode.includes(item))
    if (isMet || isEve) {
      return false
    } else {
      return true
    }
  }
}

const getIsErc721 = async (address: string) => {
  const store = useUserStore()
  const isCode = await getProvider().getCode(address)
  if (isCode === '0x') {
    return false
  } else {
    const contract = call(
      address,
      JSON.parse(store.PactAbi.erc721_contract_abi)
    )
    const isErc721 = contract.supportsInterface('0x80ac58cd')
    return isErc721
  }
}

const getWorkAllowance = async (address: string, metamask: any) => {
  const store = useUserStore()
  const contract = call(
    address,
    JSON.parse(store.PactAbi.erc20_contract_abi)
  )
  const bla = await contract.allowance(
    metamask,
    store.PactAbi.protocol_contract
  )
  return bla.toString()
}

const mintNFT = async (data: any) => {
  const store = useUserStore()
  BigNumber.config({ EXPONENTIAL_AT: 38 })
  const protocolAddress = store.PactAbi.protocol_contract
  const abi = JSON.parse(store.PactAbi.protocol_contract_abi)
  const overrides = {
    value:
      data.erc20PaymentMode || data.payCurrencyType !== 'ETH'
        ? ethers.utils.parseEther('0')
        : ethers.utils.parseEther(data.price + ''),
  }
  const contract = send(protocolAddress, abi)
  const CreateCanvasAndMintNFTParam = {
    daoId: data.daoId,
    canvasId: data.canvasId,
    canvasUri: data.canvasUri,
    canvasCreator: data.canvasCreator,
    tokenUri: data.tokenUri,
    nftSignature: data.signature ? data.signature : '0x',
    flatPrice: data.flatPrice,
    proof: data.proof,
    canvasProof: data.canvasProof,
    nftOwner: data.nftOwner,
    erc20Signature: '0x',
    deadline: 0,
    nftIdentifier: data.nftIdentifier,
  }
  const tx = await contract.mintNFT(CreateCanvasAndMintNFTParam, overrides)
  return tx
}
const approveWork = async (daoErc20Address: string, amount: string) => {
  const store = useUserStore()
  const contract = send(
    daoErc20Address,
    JSON.parse(store.PactAbi.d4a_erc20_abi)
  )
  const tx = await contract.approve(
    store.PactAbi.protocol_contract,
    amount
  )
  return tx
}

const transferNFTs = async (data: any) => {
  const store = useUserStore()
  const contract = call(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.protocol_readable_abi)
  )
  const nftAddress = await contract.getDaoNft(data.projectId)
  const nftContract = send(
    nftAddress,
    JSON.parse(store.PactAbi.erc721_contract_abi)
  )
  const tx = await nftContract.safeTransferFrom(
    data.address,
    data.to,
    data.tokenId
  )
  return tx
}

const lockTopUpNFT = async (data: any) => {
  const store = useUserStore()
  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.work_lock_abi)
  )
  const tx = await contract.lockTopUpNFT(data.nftIdentifier, data.duration)
  return tx
}

const setMintCapAndPermission = async (data: any) => {
  const store = useUserStore()
  const contract = send(
    store.PactAbi.protocol_contract,
    store.PactAbi.protocol_setter_abi
  )
  const tx = await contract.setMintCapAndPermission(
    data.daoId,
    data.mintCap,
    data.userMintCapParam,
    data.nftMinterCapInfo,
    data.nftMinterCapIdInfo,
    data.whitelist,
    data.blacklist,
    data.unblacklist
  )
  return tx
}

const claimMultiReward = async (data: any) => {
  const store = useUserStore()
  const contract = send(
    store.PactAbi.claimer_contract,
    JSON.parse(store.PactAbi.claimer_contract_abi)
  )
  const tx = await contract.claimMultiReward(data[0])
  return tx
}

const updateMultiTopUpAccount = async (data: any) => {
  const store = useUserStore()

  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.pd_plan_abi)
  )
  const tx = await contract.updateMultiTopUpAccount(data.projectId, data.nfts)
  return tx
}
const claimDaoPlanRewardForMultiNft = async (data: any) => {
  const store = useUserStore()
  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.pd_plan_abi)
  )
  const tx = await contract.claimDaoPlanRewardForMultiNft(data.projectId, data.nfts)
  return tx
}
const transactionEth = async (address: string, amount: string) => {
  const signer = getProvider().getSigner()
  const tx = await signer.sendTransaction({
    to: address,
    value: ethers.utils.parseEther(amount),
  })
  return tx
}

const transactionERC20 = async (inputToken: string, address: string, amount: string) => {
  const store = useUserStore()
  const contract = send(inputToken, JSON.parse(store.PactAbi.erc20_contract_abi))
  const tx = await contract.transfer(
    address,
    amount
  )
  return tx
}

const transferPay = async (data: any) => {
  const store = useUserStore()

  const contract = send(
    data.contract,
    JSON.parse(store.PactAbi.erc20_contract_abi)
  )
  const tx = await contract.transfer(data.to, data.amount)
  return tx
}


const setTopUpOutputSplitRatio = async (data: any) => {
  const store = useUserStore()

  const contract = send(store.PactAbi.protocol_contract, JSON.parse(store.PactAbi.protocol_setter_abi))
  const tx = await contract.setTopUpOutputSplitRatio(
    data.daoId,
    data.defaultOutputRatio,
    data.subDaoIds,
    data.outputRatios
  )
  return tx
}


const setTopUpInputSplitRatio = async (data: any) => {
  const store = useUserStore()

  const contract = send(store.PactAbi.protocol_contract, JSON.parse(store.PactAbi.protocol_setter_abi))
  const tx = await contract.setTopUpInputSplitRatio(
    data.daoId,
    data.defaultInputRatio,
    data.subDaoIds,
    data.inputRatios
  )
  return tx
}
const getAllowanceTreasury = async (address: string, metamask: string) => {
  const store = useUserStore()

  const contract = call(address, JSON.parse(store.PactAbi.erc20_contract_abi))
  const bla = await contract.allowance(
    metamask,
    store.PactAbi.protocol_contract
  )
  return bla.toString()
}
const approveAmount = async (daoErc20Address: string, amount: string) => {
  const store = useUserStore()

  const contract = send(
    daoErc20Address,
    JSON.parse(store.PactAbi.d4a_erc20_abi)
  )
  const tx = await contract.approve(store.PactAbi.protocol_contract, amount)
  return tx
}


const grantTreasury = async (data: any) => {
  const store = useUserStore()

  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.pd_grant_abi)
  )
  const tx = await contract.grantTreasury(
    data.daoId,
    data.amount,
    data.tokenUri,
    data.address
  )
  return tx
}


const grantDaoAssetPool = async (data: any) => {
  const store = useUserStore()

  const protocolAddress = store.PactAbi.protocol_contract
  const contract = send(
    protocolAddress,
    JSON.parse(store.PactAbi.pd_grant_abi)
  )
  const tx = await contract.grantDaoAssetPool(
    data.daoId,
    data.amount,
    data.useTreasury,
    data.tokenUri,
    data.address
  )
  return tx
}

//dex
const getErc20Balance = async (address: string, metamask: string) => {
  const store = useUserStore()
  const contract = call(address, JSON.parse(store.PactAbi.erc20_contract_abi))
  const bla = await contract.balanceOf(metamask)
  return bla.toString()
}

const createPlan = async (data: any) => {
  const store = useUserStore()

  BigNumber.config({ EXPONENTIAL_AT: 38 })
  const overrides = {
    value: ethers.utils.parseEther(data.totalReward + ''),
  }
  const createPlanParam = {
    daoId: data.projectId,
    startBlock: data.startBlock,
    duration: data.durationBlock,
    totalRounds: data.totalRounds,
    totalReward: new BigNumber(data.totalReward)
      .times(`1e${data.decimalsNum}`)
      .toString(),
    rewardToken: data.rewardToken === "" ? ethers.constants.AddressZero : data.rewardToken,
    useTreasury: data.useTreasury,
    io: data.io,
    uri: data.planUri,
    planTemplateType: 0,

  }
  const protocolAddress = store.PactAbi.protocol_contract
  const contract = send(
    protocolAddress,
    JSON.parse(store.PactAbi.pd_plan_abi)
  )

  const tx = data.rewardToken === "" ? await contract.createPlan(createPlanParam, overrides) : await contract.createPlan(createPlanParam)
  return tx
}

const addPlanTotalReward = async (data: any) => {
  const store = useUserStore()

  BigNumber.config({ EXPONENTIAL_AT: 38 })
  const overrides = {
    value: ethers.utils.parseEther(data.totalReward + ''),
  }
  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.pd_plan_abi)
  )
  const tx = data.rewardTokenSymbol === 'ETH'
    ? await contract.addPlanTotalReward(data.planId, data.amount, data.useTreasury, overrides)
    : await contract.addPlanTotalReward(data.planId, data.amount, data.useTreasury)
  return tx
}

const exchangeOutputToInput = async (project_id: string, amount: string, address: string) => {
  const store = useUserStore()
  const protocolAddress = store.PactAbi.protocol_contract
  const contract = send(
    protocolAddress,
    JSON.parse(store.PactAbi.protocol_contract_proxy_abi)
  )
  const tx = await contract.exchangeOutputToInput(project_id, amount, address)
  return tx
}


export {
  sig,
  send,
  getProvider,
  decimals,
  createDaoForFunding,
  getCode,
  getIsErc721,
  updateTopUpAccount,
  getWorkAllowance,
  mintNFT,
  approveWork,
  transferNFTs,
  lockTopUpNFT,
  setDaoParamsFunding,
  setMintCapAndPermission,
  getBalance,
  claimMultiReward,
  updateMultiTopUpAccount,
  claimDaoPlanRewardForMultiNft,
  transactionEth,
  transactionERC20,
  transferPay,
  setTopUpOutputSplitRatio,
  setTopUpInputSplitRatio,
  approveAmount,
  grantTreasury,
  getAllowanceTreasury,
  grantDaoAssetPool,
  getErc20Balance,
  createPlan,
  addPlanTotalReward,
  exchangeOutputToInput,
}
