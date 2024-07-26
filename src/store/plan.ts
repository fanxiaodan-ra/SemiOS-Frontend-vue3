import { acceptHMRUpdate, defineStore } from "pinia";
import {
  createPlanParam
} from '@/api/plan';
import { createPlan } from '@/common/web3service'
import useUserStore from '.'

type PlanParams = {
  projectId: string,
  planStartDate: string,
  duration: number,
  customTokenAddress: string,
  io: boolean,
  totalReward: number,
  totalRounds: number,
  useTreasury: boolean,
  tokenForThisPlan: number,
  tokenForThisPlanAddress: string,
}
export type TxParams = {
  customTokenAddress: string,
  customTokenDecimal?: number,
  decimalsNum: number,
  duration: number,
  durationBlock: string,
  erc20TokenAddress: string,
  erc20TokenDecimals: number,
  inputTokenAddress: string,
  inputTokenDecimals: number,
  io: boolean,
  ownerAddress: string,
  payCurrencyType: string,
  planStartDate: string,
  planUri: string,
  projectId: string,
  rewardToken: string,
  startBlock: string,
  tokenForThisPlan: number,
  tokenForThisPlanAddress: string,
  totalReward: number,
  totalRounds: number,
  useTreasury: boolean,
}

export const usePlanStore = defineStore({
  id: 'plan',
  state: () => ({
    txParams: {} as TxParams,
  }),
  actions: {
    setTxParams(txParams: TxParams) {
      this.txParams = txParams
    },
    async createPlan(txParams: TxParams) {
      try {
        const tx = await createPlan(txParams)
        await tx.wait()
        return 'Transury'
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async getPlanParams(params: PlanParams) {
      try {
        const { projectId, planStartDate, duration, customTokenAddress, tokenForThisPlan, tokenForThisPlanAddress } = params
        const res = await createPlanParam({
          projectId,
          planStartDate,
          duration,
          customTokenAddress
        })
        const { data = {} } = res
        const txParams = {
          ...data,
          ...params,
        }

        if (tokenForThisPlan === 1) {
          txParams.rewardToken = data.inputTokenAddress
          txParams.decimalsNum = data.inputTokenDecimals
        } else if (tokenForThisPlan === 2) {
          txParams.rewardToken = data.erc20TokenAddress
          txParams.decimalsNum = data.erc20TokenDecimals
        } else {
          txParams.rewardToken = tokenForThisPlanAddress
          txParams.decimalsNum = data.customTokenDecimal
        }

        if (tokenForThisPlan === 1 || (
          data.tokenForThisPlanAddress &&
          data.tokenForThisPlanAddress.toLowerCase() ===
          data.inputTokenAddress.toLowerCase())) {
          if (data.payCurrencyType === 'ETH') {
            txParams.useTreasury = false
            return {
              txParams,
              type: 'createPlan'
            }
          } else {
            txParams.useTreasury = false
            return {
              txParams,
              type: 'setWallet'
            }
          }
        }
        if (tokenForThisPlan === 2 || (
          data.tokenForThisPlanAddress &&
          data.tokenForThisPlanAddress.toLowerCase() ===
          data.erc20TokenAddress.toLowerCase())) {
          if (params.totalReward > 0) {
            const userStore = useUserStore()

            if (data.ownerAddress.toLowerCase() === userStore.UserInfo.address.toLowerCase()) {
              return {
                type: 'setIsSource',
                txParams
              }
            } else {
              return {
                txParams,
                type: 'setWallet'
              }
            }
          } else {
            return {
              txParams,
              type: 'setWallet'
            }
          }
        } 
        
        if (tokenForThisPlan === 3) {
          return {
            txParams,
            type: 'setWallet'
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePlanStore, import.meta.hot))
}

export default usePlanStore;