import { service } from './request'

const workExploreUnmitedWorks = async (data: any) => {
  return service({
    url: `/api/work/explore/unmintedWorks`,
    method: 'POST',
    data: data,
  })
}

const workExploreNfts = async (data: any) => {
  return service({
    url: `/api/work/explore/nfts`,
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
    url: `/api/dao/unmintedWorks `,
    method: 'POST',
    data: data,
  })
}

const daoNfts = async (data: any) => {
  return service({
    url: `/api/dao/nfts `,
    method: 'POST',
    data: data,
  })
}

const daoDrbNfts = async (data: any) => {
  return service({
    url: `/api/dao/drbNfts `,
    method: 'POST',
    data: data,
  })
}
const searchWorks = async (query: any, num = null) => {
  return service({
    url: `/api/search/works`,
    method: 'POST',
    data: { searchWord: query, number: num },
  })
}
const workCreator = async (data: any) => {
  return service({
    url: `/api/work/creator`,
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
    url: `/api/work/hold`,
    method: 'POST',
    data: data,
  })
}
const workMinted = async (data: any) => {
  return service({
    url: `/api/work/minted`,
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
  workMinted
}
