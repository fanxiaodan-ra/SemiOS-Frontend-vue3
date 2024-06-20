import { service } from './request'
const contractAbi = () => {
  return service({
    url: `/api/contract/abi`,
    method: 'POST',
  })
}

const favoriteActions = async (data: any) => {
  return service({
    url: `/api/favorite/actions`,
    method: 'POST',
    data: data,
  })
}
const favoriteCancel = async (data: any) => {
  return service({
    url: `/api/favorite/cancel`,
    method: 'POST',
    data: data,
  })
}
export { contractAbi, favoriteActions, favoriteCancel }
