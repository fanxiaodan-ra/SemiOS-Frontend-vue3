// import { service } from './request'
import service from './request'
import { ConfigType } from '@/types/api/ConfigType'

const checkName = (data: any): ConfigType => {
  return service({
    url: `/api/dao/name/check`,
    method: 'POST',
    data: data,
  })
}

const whitelistProof = async (data: any) => {
  return service({
    url: `/api/dao/whitelist/proof`,
    method: 'POST',
    data: data,
  })
}

const createDao = async (data: any) => {
  return service({
    url: `/api/dao/basic/create`,
    method: 'POST',
    data: data,
  })
}

const daoTimes = async () => {
  return service({
    url: `/api/dao/times`,
    method: 'POST',
  })
}

const maincreator = async (data: any) => {
  return service({
    url: `/api/dao/maincreator`,
    method: 'POST',
    data: data,
  })
}

const allcationList = async (data: any) => {
  return service({
    url: `/api/dao/allcation/list`,
    method: 'POST',
    data: data,
  })
}
type DaoCollectionParams = {
  pageNo: number
  pageSize: number
  sortCondition: number
}
const daoCollections = async (data: DaoCollectionParams) => {
  return service({
    url: `/api/dao/show/info`,
    method: 'POST',
    data: data,
  })
}

const daoCollectionsCurWindow = async (data: { daoId: string }) => {
  return service({
    url: `/api/dao/show/window`,
    method: 'POST',
    data: data,
  })
}

const daoCollectionsBasicInfo = async (data: { daoId: string }) => {
  return service({
    url: `/api/dao/show/basic`,
    method: 'POST',
    data: data,
  })
}

const daoCollectionsModeStatus = async (data: { daoId: string }) => {
  return service({
    url: `/api/dao/show/modeStatus`,
    method: 'POST',
    data: data,
  })
}

const analyticsDetail = async (data: any) => {
  return service({
    url: `/api/dao/analytics/detail/v2`,
    method: 'POST',
    data: data,
  })
}

const workAuthority = async (data: any) => {
  return service({
    url: `/api/dao/user/authority`,
    method: 'POST',
    data: data,
  })
}

const userAuthority = async (data: any) => {
  return service({
    url: `/api/dao/protodao/authority`,
    method: 'POST',
    data: data,
  })
}
const daoMerkle = async (data: any) => {
  return service({
    url: `/api/dao/blackandwhite/merkle`,
    method: 'POST',
    data: data,
  })
}

const canvasExists = async (data: any) => {
  return service({
    url: `/api/dao/canvas/exists`,
    method: 'POST',
    data: data,
  })
}

const merkleWork = async (data: any) => {
  return service({
    url: `/api/dao/blackandwhite/merkle/work`,
    method: 'POST',
    data: data,
  })
}

const daoListProtodao = async () => {
  return service({
    url: `/api/dao/list/protodao`,
    method: 'POST',
  })
}

const createWorkInfo = async (data: any) => {
  return service({
    url: `/api/dao/createWork/info`,
    method: 'POST',
    data: data,
  })
}
const daoEditDetail = async (data: any) => {
  return service({
    url: `/api/dao/edit/detail`,
    method: 'POST',
    data: data,
  })
}

const daoEdit = async (data: any) => {
  let format = new FormData()
  if (Object.prototype.toString.call(data.daoLogo) === '[object File]') {
    format.append('daoLogo', data.daoLogo)
  }
  if (Object.prototype.toString.call(data.daoBgBanner) === '[object File]') {
    format.append('daoBgBanner', data.daoBgBanner)
  }
  format.append('daoId', data.daoId)
  format.append('daoName', data.daoName)
  format.append('daoManitesto', data.daoManitesto)
  format.append('daoDescription', data.daoDescription)
  if (data.openseaLink) {
    const discordLink = data.openseaLink.replace(
      new RegExp('https://opensea.io/'),
      ''
    )
    format.append('openseaLink', discordLink)
  } else {
    format.append('openseaLink', '')
  }
  if (data.discordLink) {
    const discordLink = data.discordLink.replace(
      new RegExp('https://t.me/'),
      ''
    )
    format.append('discordLink', discordLink)
  } else {
    format.append('discordLink', '')
  }
  if (data.twitterLink) {
    const twitterLink = data.twitterLink.replace(
      new RegExp('https://twitter.com/'),
      ''
    )
    format.append('twitterLink', twitterLink)
  } else {
    format.append('twitterLink', '')
  }
  format.append('socialLinks', data.socialLinks)
  return service({
    url: `/api/dao/edit`,
    method: 'POST',
    data: format,
  })
}
const distribute = async (data: any) => {
  return service({
    url: `/api/dao/benefits/distribute`,
    method: 'POST',
    data: data,
  })
}

const blackandwhiteList = async (data: any) => {
  return service({
    url: `/api/dao/blackandwhite/list`,
    method: 'POST',
    data: data,
  })
}
const seedNodesCollections = async (data: any) => {
  return service({
    url: `/api/dao/seedNodes`,
    method: 'POST',
    data: data,
  })
}
const protodaoRelated = async (data: any) => {
  return service({
    url: `/api/dao/show/related`,
    method: 'POST',
    data: data,
  })
}
const searchAmount = async (query: any) => {
  return service({
    url: `/api/search/amount`,
    method: 'POST',
    data: { searchWord: query },
  })
}
const searchDaos = async (data: {
  searchWord: string
  pageSize: number
  pageNo: number
}) => {
  return service({
    url: `/api/dao/show/search`,
    method: 'POST',
    data,
  })
}
const searchSeedNodes = async (data:any) => {
  return service({
    url: `/api/search/seedNodes`,
    method: 'POST',
    data,
  })
}
const myDaoList = async (data: any) => {
  return service({
    url: `/api/dao/show/mydao`,
    method: 'POST',
    data: data,
  })
}
const favoriteDao = async (data: any) => {
  return service({
    url: `/api/favorite/dao`,
    method: 'POST',
    data: data,
  })
}
const allocationInfo = async (data: any) => {
  return service({
    url: `/api/dao/analytics/allocation/info`,
    method: 'POST',
    data: data,
  })
}

const analyticsStatistics = async (data: any) => {
  return service({
    url: `/api/dao/analytics/statistics`,
    method: 'POST',
    data: data,
  })
}
const analyticsAveragePrice = async (data: any) => {
  return service({
    url: `/api/dao/analytics/volume/averagePrice`,
    method: 'POST',
    data: data,
  })
}
const analyticsPriceRange = async (data: any) => {
  return service({
    url: `/api/dao/analytics/priceRange`,
    method: 'POST',
    data: data,
  })
}
const analyticsMintScatterPlot = async (data: any) => {
  return service({
    url: `/api/dao/analytics/mintScatterPlot`,
    method: 'POST',
    data: data,
  })
}
const analyticsNftTopOwners = async (data: any) => {
  return service({
    url: `/api/dao/analytics/nftTopOwners`,
    method: 'POST',
    data: data,
  })
}
const analyticsOwnerDistribution = async (data: any) => {
  return service({
    url: `/api/dao/analytics/ownerDistribution`,
    method: 'POST',
    data: data,
  })
}
const analyticsNftOwnersQuantity = async (data: any) => {
  return service({
    url: `/api/dao/analytics/nftOwnersQuantity`,
    method: 'POST',
    data: data,
  })
}

const daoAllocation = async (data: any) => {
  return service({
    url: `/api/dao/allocation`,
    method: 'POST',
    data: data,
  })
}

const analyticsAssetPoolEth = async (data: any) => {
  return service({
    url: `/api/dao/analytics/assetpool/eth`,
    method: 'POST',
    data: data,
  })
}
const analyticsAssetPoolToken = async (data: any) => {
  return service({
    url: `/api/dao/analytics/assetpool/token`,
    method: 'POST',
    data: data,
  })
}

const togetherDaoAmount = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/amount`,
    method: 'POST',
    data: data,
  })
}
const togetherDaoToken = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/token`,
    method: 'POST',
    data: data,
  })
}
const togetherDaoMaker = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/maker`,
    method: 'POST',
    data: data,
  })
}

const togetherTreasury = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/treasury`,
    method: 'POST',
    data: data,
  })
}
const togetherDaoMember = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/member`,
    method: 'POST',
    data: data,
  })
}


const togetherPlan = async (data: any) => {
  return service({
    url: `/api/plan/together/tap`,
    method: 'POST',
    data: data,
  })
}

const togetherDaoInfo = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/info`,
    method: 'POST',
    data: data,
  })
}

const togetherDaoList = async (data: any) => {
  return service({
    // url: `/api/dao/analytics/togetherDao/list`,
    url: '/api/dao/show/togetherDao/list',
    method: 'POST',
    data: data,
  })
}

const togetherDaoMakerList = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/maker/list`,
    method: 'POST',
    data: data,
  })
}
const treasuryInfo = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/treasury/info`,
    method: 'POST',
    data: data,
  })
}
const treasuryList = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/treasury/list`,
    method: 'POST',
    data: data,
  })
}

const treasuryTransaction = async (data: any) => {
  return service({
    url: `/api/dao/analytics/togetherDao/treasury/transaction`,
    method: 'POST',
    data: data,
  })
}

const togetherPlanList = async (data: any) => {
  return service({
    url: `/api/plan/together/list`,
    method: 'POST',
    data: data,
  })
}

const togetherPlanBasicInfo = async (data: any) => {
  return service({
    url: `/api/plan/basic/info`,
    method: 'POST',
    data: data,
  })
}

export {
  checkName,
  whitelistProof,
  createDao,
  daoTimes,
  maincreator,
  allcationList,
  daoCollections,
  daoCollectionsCurWindow,
  daoCollectionsBasicInfo,
  daoCollectionsModeStatus,
  analyticsDetail,
  workAuthority,
  userAuthority,
  daoMerkle,
  canvasExists,
  merkleWork,
  daoListProtodao,
  createWorkInfo,
  daoEditDetail,
  daoEdit,
  distribute,
  blackandwhiteList,
  seedNodesCollections,
  protodaoRelated,
  searchAmount,
  searchDaos,
  searchSeedNodes,
  myDaoList,
  favoriteDao,
  allocationInfo,
  analyticsStatistics,
  analyticsAveragePrice,
  analyticsPriceRange,
  analyticsMintScatterPlot,
  analyticsNftTopOwners,
  analyticsOwnerDistribution,
  analyticsNftOwnersQuantity,
  daoAllocation,
  analyticsAssetPoolEth,
  analyticsAssetPoolToken,
  togetherDaoAmount,
  togetherDaoToken,
  togetherDaoMaker,
  togetherTreasury,
  togetherDaoMember,
  togetherPlan,
  togetherDaoInfo,
  togetherDaoList,
  togetherDaoMakerList,
  treasuryInfo,
  treasuryList,
  treasuryTransaction,
  togetherPlanList,
  togetherPlanBasicInfo
}
