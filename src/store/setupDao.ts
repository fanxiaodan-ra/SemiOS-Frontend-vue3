import { acceptHMRUpdate, defineStore } from "pinia";
import {
  inquireNft0AndDaoId,
} from "@/api/works";
import {
  maincreator,
  exportDaoInfo,
} from '@/api/daos'
import type { ForkedParams } from '@/types/SetupDao'

export const useSetupDaoStore = defineStore({
  id: 'setupDao',
  state: () => ({
    workId: null,
    daoId: null,
    nft0Info: {
      imgUrl: '',
      height: 0,
      bgColor: '',
    },
    initData: {},
    forkedDaoParams: {} as ForkedParams,
  }),
  actions: {
    async inquireNft0AndDaoId({ transactionHash }: { transactionHash: string } ) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await inquireNft0AndDaoId({
            transactionHash
          })
          if (res.data.workId === null || res.data.daoId === null) {
            setTimeout(() => {
              resolve(this.inquireNft0AndDaoId({ transactionHash }))
            }, 5000)
          } else {
            this.workId = res.data.workId
            this.daoId = res.data.daoId
            this.nft0Info = {
              imgUrl: res.data.imgUrl,
              height: res.data.height,
              bgColor: res.data.bgColor
            }
            resolve(true)
          }
        } catch (error) {
          console.error(error)
          reject(error)
        }
      })
    },
    async initDaoParams({ daoId }: { daoId: string }) {
      try {
        const res = await maincreator({
          daoId
        })
        this.initData = res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getForkedDaoParams({ daoId, type }: { daoId: string; type: number }) {
      try {
        const res = await exportDaoInfo({
          daoId,
          type
        })
        return res.data
      } catch (error) {
        console.error(error)
      }
    },
    clearInitData() {
      this.initData = {}
    },
    setForkedDaoParams(params: ForkedParams) {
      this.forkedDaoParams = params
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupDaoStore, import.meta.hot))
}

export default useSetupDaoStore;