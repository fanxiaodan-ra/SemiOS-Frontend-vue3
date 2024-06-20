import { getIsErc721 } from '@/common/web3service'
import { keyListEqual, objListIsEqual, isAddress } from '@/utils'

export default function useToastNotify() {
  const isAddressExistence = (
    val: string,
    dataList: any,
    key: string = 'address'
  ) => {
    const isAddrStr = isAddress(val)
    if (!isAddrStr) return 'Wrong address please modify and resubmit.'
    if (dataList.length >= 100) {
      return `You've reached the address limit of 100. Please remove an address before adding a new one.`
    }
    const isEq = keyListEqual(dataList, key, val)
    if (isEq) return `The address “${val}” is already in the list.`
    return true
  }

  const isERC721Existence = async (
    val: string,
    dataList: any,
    key: string,
    isEqual: boolean = true
  ) => {
    const isAddrStr = isAddress(val)
    if (!isAddrStr) return 'Wrong address please modify and resubmit.'
    if (dataList.length >= 100) {
      return `You've reached the address limit of 100. Please remove an address before adding a new one.`
    }
    if (isAddrStr !== true) return isAddrStr
    const isErc721 = await getIsErc721(val)
    if (!isErc721) {
      return 'Wrong address please modify and resubmit.'
    }
    if (isEqual) {
      const isEq = keyListEqual(dataList, key, val)
      if (isEq) return `The address “${val}” is already in the list.`
    }
    return true
  }

  const isNftExistence = async (
    dataList: any[],
    key: string,
    value: string,
    itemData: any,
    itemVal: number
  ) => {
    if (dataList.length > 0) {
      const isErr = objListIsEqual(dataList, key, value, itemData, itemVal)
      if (isErr) {
        return `The tokenId “${itemVal}” is already in the list.`
      } else {
        return true
      }
    } else {
      return true
    }
  }
  return { isAddressExistence, isERC721Existence, isNftExistence }
}
