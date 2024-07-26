// import { service } from './request'
import service from './request'

const workExploreUnmitedWorks = async (data: any) => {
  return service({
    url: `/api/work/show/works/list`,
    method: 'POST',
    data: data,
  })
}

const workExploreNfts = async (data: any) => {
  return service({
    url: `/api/work/show/nft/list`,
    method: 'POST',
    data: data,
  })
}
const workDetail = async (data: any) => {
  return service({
    url: `/api/work/detail`,
    method: 'POST',
    data: data,
  })
}

const workDetailNft = async (data: any) => {
  return service({
    url: `/api/work/detail/nft`,
    method: 'POST',
    data: data,
  })
}

const workMintTopUp = async (data: any) => {
  return service({
    url: `/api/work/mint/topup`,
    method: 'POST',
    data: data,
  })
}
const workMintUnTopUp = async (data: any) => {
  return service({
    url: `/api/work/mint/unTopup`,
    method: 'POST',
    data: data,
  })
}
const workLockDuration = async (data: any) => {
  return service({
    url: `/api/work/lock/duration`,
    method: 'POST',
    data: data,
  })
}

const workEditDetail = async (data: any) => {
  return service({
    url: `/api/work/edit/detail `,
    method: 'POST',
    data: data,
  })
}

const workEdit = async (data: any) => {
  const req = { ...data }
  if (data.openseaLink) {
    const openseaLink = data.openseaLink.replace(
      new RegExp('https://opensea.io/'),
      ''
    )
    req.openseaLink = openseaLink
  } else {
    req.openseaLink = ''
  }
  if (data.discordLink) {
    const discordLink = data.discordLink.replace(
      new RegExp('https://t.me/'),
      ''
    )
    req.discordLink = discordLink
  } else {
    req.discordLink = ''
  }
  if (data.twitterLink) {
    const twitterLink = data.twitterLink.replace(
      new RegExp('https://twitter.com/'),
      ''
    )
    req.twitterLink = twitterLink
  } else {
    req.twitterLink = ''
  }

  return service({
    url: `/api/work/edit `,
    method: 'POST',
    data: req,
  })
}

const workCreate = async (data: any) => {
  let format = new FormData()
  if (Object.prototype.toString.call(data.image) === '[object File]') {
    format.append('image', data.image)
  }
  format.append('daoId', data.daoId)
  format.append('canvasId', data.canvasId)
  format.append('createSignHash', data.createSignHash)
  format.append('workDescription', data.workDescription)
  format.append('workUriRandom', data.workUriRandom)
  format.append('priceType', data.priceType)
  format.append('fixedPrice', data.fixedPrice)

  return service({
    url: `/api/work/protoDao/create`,
    method: 'POST',
    data: format,
  })
}
const daoUnmintedWorks = async (data: any) => {
  return service({
    url: `/api/work/show/works/list`,
    method: 'POST',
    data: data,
  })
}

const daoNfts = async (data: any) => {
  return service({
    url: `/api/work/show/nft/list`,
    method: 'POST',
    data: data,
  })
}

const daoDrbNfts = async (data: any) => {
  return service({
    url: `/api/work/show/drb/nft/list`,
    method: 'POST',
    data: data,
  })
}
const searchWorks = async (data: {
  searchWord: string
  pageNo: number
  pageSize: number
}) => {
  return service({
    url: `/api/work/show/search`,
    method: 'POST',
    data,
  })
}

const workCreator = async (data: any) => {
  return service({
    url: `/api/work/show/creator`,
    method: 'POST',
    data: data,
  })
}

const favoriteWork = async (data: any) => {
  return service({
    url: `/api/favorite/work`,
    method: 'POST',
    data: data,
  })
}

const workHold = async (data: any) => {
  return service({
    url: `/api/work/show/hold`,
    method: 'POST',
    data: data,
  })
}
const workMinted = async (data: any) => {
  return service({
    url: `/api/work/show/minted`,
    method: 'POST',
    data: data,
  })
}

const workShowWindow = async (data: { workId: string }) => {
  return service({
    url: `/api/work/show/window`,
    method: 'POST',
    data: data,
  })
}

const inquireNft0AndDaoId = async (data: {
  transactionHash: string
}) => {
  return service({
    url: `/api/work/transaction/hash`,
    method: 'POST',
    data,
  })
}

const workPermissionDetail = async (data: {
  workId: number
  pageSize?: number
  pageNo?: number
}) => {
  return service({
    url: `/api/permission/detail/work`,
    method: 'POST',
    data: data,
  })
}

const workPermissionDetailNode = async (data: {
  daoId: string
  permissionType?: number
}) => {
  return service({
    url: `/api/permission/detail/node`,
    method: 'POST',
    data: data,
  })
}

const workPermissionDetailNodeInfo = async (data: {
  daoId: string
  permissionType?: number
}) => {
  return service({
    url: `/api/permission/node/info`,
    method: 'POST',
    data: data,
  })
}

export {
  workExploreUnmitedWorks,
  workExploreNfts,
  workDetail,
  workDetailNft,
  workMintTopUp,
  workMintUnTopUp,
  workLockDuration,
  workEditDetail,
  workEdit,
  workCreate,
  daoUnmintedWorks,
  daoNfts,
  daoDrbNfts,
  searchWorks,
  workCreator,
  favoriteWork,
  workHold,
  workMinted,
  workShowWindow,
  inquireNft0AndDaoId,
  workPermissionDetail,
  workPermissionDetailNode,
  workPermissionDetailNodeInfo
}
