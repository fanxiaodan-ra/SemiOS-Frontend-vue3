import { acceptHMRUpdate, defineStore } from "pinia";
import {
  inquireNft0AndDaoId,
} from "@/api/works";
export const useSetupDaoStore = defineStore({
  id: 'setupDao',
  state: () => ({
    workId: null,
    daoId: null,
    nft0Info: {
      imgUrl: '',
      height: 0,
      bgColor: '',
    }
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
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSetupDaoStore, import.meta.hot))
}

export default useSetupDaoStore;