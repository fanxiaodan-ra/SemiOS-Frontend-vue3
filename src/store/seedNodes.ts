import { acceptHMRUpdate, defineStore } from "pinia";
import {
  seedNodesCollections,
} from '@/api/daos';

export const useSeedNodesStore = defineStore({
  id: 'seedNodes',
  state: () => ({
    explorerSeedNodes: [] as Node[],
    explorerSeedNodesPageInfo: {
      isAll: false,
      count: 0
    },
    explorerSeedNodesPageQuery: {
      pageNo: 0,
      pageSize: 5,
    },
  }),
  actions: {
    async getExploreSeedNodes() {
      try {
        const params = {
          pageNo: this.explorerSeedNodesPageQuery.pageNo,
          pageSize: this.explorerSeedNodesPageQuery.pageSize,
        }
        const res: any = await seedNodesCollections(params)
        this.explorerSeedNodes = [...this.explorerSeedNodes, ...res.dataList]
        this.explorerSeedNodesPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
        this.explorerSeedNodesPageQuery.pageNo = res.page.pageNo
        this.explorerSeedNodesPageQuery.pageSize = res.page.pageSize
      } catch (error) {
        console.error(error)
      }
    
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSeedNodesStore, import.meta.hot))
}

export default useSeedNodesStore;