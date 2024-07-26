import { acceptHMRUpdate, defineStore } from "pinia";
import {
  daoCollectionsCurWindow,
  daoCollectionsBasicInfo,
  daoCollectionsModeStatus,
} from '@/api/daos';

export const useCollectionDao = defineStore({
  id: 'collectionDao',
  state: () => ({
    // treasuryTransaction: [],
  }),
  actions: {
    async getDaoCollectionCurWin(params: { daoId: string}) {
      try {
        const res = await daoCollectionsCurWindow(params)
        return res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getDaoCollectionBasicInfo(params: { daoId: string}) {
      try {
        const res = await daoCollectionsBasicInfo(params)
        return res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getDaoCollectionModeStatus(params: { daoId: string}) {
      try {
        const res = await daoCollectionsModeStatus(params)
        return res.data
      } catch (error) {
        console.error(error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCollectionDao, import.meta.hot))
}

export default useCollectionDao;