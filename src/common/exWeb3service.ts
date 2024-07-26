import useUserStore from "@/store"
import { send } from './web3service'

export const setDaoPermission = async (data: {
  params: {
    daoId: string
    daoNftAddress: string
    tokenId: string
  },
  type: string
}) => {
  const store = useUserStore()
  const contract = send(
    store.PactAbi.protocol_contract,
    JSON.parse(store.PactAbi.protocol_setter_abi)
  )
  const functions = new Map([
    ['1', contract.setDaoEditInformationPermission],
    ['2', contract.setDaoEditParamPermission],
    ['3', contract.setDaoEditStrategyPermission],
    ['4', contract.setDaoRewardPermission],
    ['5', contract.setTreasuryTransferAssetPermission],
    ['6', contract.setTreasuryEditInformationPermission],
    ['7', contract.setTreasurySetTopUpRatioPermission],
  ])
  const { daoId, daoNftAddress, tokenId } = data.params
  const func = functions.get(data.type.toString())
  const tx = await func(daoId, daoNftAddress, tokenId)
  return tx
}

