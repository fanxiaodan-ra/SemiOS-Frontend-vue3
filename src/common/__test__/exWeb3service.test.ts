import { setDaoPermission } from '../exWeb3service'
import { describe, it, expect, vi } from 'vitest'
import * as web3service from '../web3service'
import { createPinia, setActivePinia } from 'pinia'
import useUserStore from '@/store'


const contracts = {
  setDaoEditInformationPermission: vi.fn(),
  setDaoEditParamPermission: vi.fn(),
  setDaoEditStrategyPermission: vi.fn(),
  setDaoRewardPermission: vi.fn(),
  setTreasuryTransferAssetPermission: vi.fn(),
  setTreasuryEditInformationPermission: vi.fn(),
  setTreasurySetTopUpRatioPermission: vi.fn(),
};

describe('setDaoPermission', () => {
  it('should set DAO permission correctly', async () => {
    vi.spyOn(web3service, 'send').mockImplementation(() => contracts as any)

    const pinia = createPinia();
    setActivePinia(pinia);
    const store = useUserStore()
    store.PactAbi.protocol_contract = "0x60E771d7E4B7A8f8E7Fdc28d6E3852A4c556e546"
    store.PactAbi.protocol_setter_abi = '[]'
    const data = {
      params: {
        daoId: '1',
        daoNftAddress: '0x123456',
        tokenId: '11'
      },
      type: '1'
    }
    await setDaoPermission(data)
    expect(contracts.setDaoEditInformationPermission).toBeCalled()

    data.type = '2'
    await setDaoPermission(data)
    expect(contracts.setDaoEditParamPermission).toBeCalled()
    
    data.type = '3'
    await setDaoPermission(data)
    expect(contracts.setDaoEditStrategyPermission).toBeCalled()

    data.type = '4'
    await setDaoPermission(data)
    expect(contracts.setDaoRewardPermission).toBeCalled()

    data.type = '5'
    await setDaoPermission(data)
    expect(contracts.setTreasuryTransferAssetPermission).toBeCalled()

    data.type = '6'
    await setDaoPermission(data)
    expect(contracts.setTreasuryEditInformationPermission).toBeCalled()

    data.type = '7'
    await setDaoPermission(data)
    expect(contracts.setTreasurySetTopUpRatioPermission).toBeCalled()
  })
})
