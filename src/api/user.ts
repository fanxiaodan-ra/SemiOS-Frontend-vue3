// import { service } from './request'
import service from './request'
import { ConfigType } from '@/types/api/ConfigType'
import { CookieInfoRes } from '@/types/api/CookieInfo'

const loginAccount = (address: string): ConfigType<boolean> => {
  return service({
    url: `/api/user/login`,
    method: 'POST',
    data: { userAddress: address },
  })
}

const signature = (data: any) => {
  return service({
    url: `/api/user/signature`,
    method: 'POST',
    data: data,
  })
}

const cookieInfo = (): ConfigType<CookieInfoRes> => {
  return service({
    url: `/api/user/cookie/info`,
    method: 'POST',
    data: {},
  })
}

const logout = () => {
  return service({
    url: `/api/user/logout`,
    method: 'POST',
    data: {},
  })
}

const contractAbi = () => {
  return service({
    url: `/api/contract/abi`,
    method: 'POST',
  })
}
const userProfileInfo = async () => {
  return service({
    url: `/api/user/profile/info`,
    method: 'POST',
    data: {},
  })
}

const userProfileSave = async (data: any) => {
  let format = new FormData()
  format.append('userName', data.userName)
  format.append('introduction', data.introduction)
  format.append('avatar', data.avatar)
  if (data.openseaLink) {
    const openseaLink = data.openseaLink.replace(
      new RegExp('https://opensea.io/'),
      ''
    )
    format.append('openseaLink', openseaLink)
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

  return service({
    url: `/api/user/profile/save`,
    method: 'POST',
    data: format,
  })
}
const walletDao = async () => {
  return service({
    url: `/api/user/income/wallet/dao`,
    method: 'POST',
    data: {},
  })
}

const topupBalancePending = async () => {
  return service({
    url: `/api/user/topup/balance/pending`,
    method: 'POST',
    data: {},
  })
}
const topupBalancePendingDetail = async (data: any) => {
  return service({
    url: `/api/user/topup/balance/pending/detail`,
    method: 'POST',
    data: data,
  })
}

const userTopupBalance = async () => {
  return service({
    url: `/api/user/topup/balance`,
    method: 'POST',
    data: {},
  })
}
const userTopupBalanceDetails = async (data: any) => {
  return service({
    url: `/api/user/topup/balance/details`,
    method: 'POST',
    data: data,
  })
}

const topupNft = async (data: any) => {
  return service({
    url: `/api/user/topup/nft`,
    method: 'POST',
    data: data,
  })
}
const topupBalanceReward = async () => {
  return service({
    url: `/api/user/topup/balance/reward`,
    method: 'POST',
    data: {},
  })
}
const topupBalanceRewardDetail = async (data: any) => {
  return service({
    url: `/api/user/topup/balance/reward/detail`,
    method: 'POST',
    data: data,
  })
}
const myPermissions = async (data: {
  pageSize?: number
  pageNo?: number
  userAddress: string
}) => {
  return service({
    url: `/api/user/permissions`,
    method: 'POST',
    data: data,
  })
}

const userPermissionsNft = async (data: {
  pageSize?: number
  pageNo?: number
  workId: number
}) => {
  return service({
    url: `/api/user/permissions/nft`,
    method: 'POST',
    data: data,
  })
}
export {
  loginAccount,
  cookieInfo,
  signature,
  logout,
  contractAbi,
  userProfileInfo,
  userProfileSave,
  walletDao,
  topupBalancePending,
  topupBalancePendingDetail,
  userTopupBalance,
  userTopupBalanceDetails,
  topupNft,
  topupBalanceReward,
  topupBalanceRewardDetail,
  myPermissions,
  userPermissionsNft
}
