import { acceptHMRUpdate, defineStore } from "pinia";
import { workExploreNfts, daoNfts, daoDrbNfts, workHold, workMinted } from "@/api/works";

type Nfts = {
}

type NftsInExploreParams = {
  sortCondition: number,
  fixedPrice: number,
  minPrice: number,
  maxPrice: number,
  pageNo: number,
  pageSize?: number,
}
export const useNftsStore = defineStore({
  id: 'nfts',
  state: () => ({
    exploreNfts: [] as Nfts[],
    exploreNftsPageInfo: {
      isAll: false,
      count: 0
    },
    exploreNftsPageQuery: {
      fixedPrice: 2,
      minPrice: 0,
      maxPrice: 9999,
      pageNo: 0,
      pageSize: 5,
      sortCondition: 0
    },
    nodeDetailNfts: [] as Nfts[],
    nodeDetailNftsPageInfo: {
      isAll: false,
      count: 0
    },
    nodeDetailDrbNfts: [] as Nfts[],
    nodeDetailDrbNftsPageInfo: {
      isAll: false,
      count: 0
    },
    nftHolder: [] as Nfts[],
    nftHolderPageInfo: {
      isAll: false,
      count: 0
    },
    nftHolderPageQuery: {
      pageNo: 0,
      pageSize: 5,
    },
    nftMinted: [] as Nfts[],
    nftMintedPageInfo: {
      isAll: false,
      count: 0
    },
    nftMintedPageQuery: {
      pageNo: 0,
      pageSize: 5,
    }
  }),
  actions: {
    async getNftsInExploreLazyLoad(workType: number) {
      try {
        const params = {
          fixedPrice: this.exploreNftsPageQuery.fixedPrice,
          minPrice: this.exploreNftsPageQuery.minPrice,
          maxPrice: this.exploreNftsPageQuery.maxPrice,
          pageNo: this.exploreNftsPageQuery.pageNo,
          sortCondition: this.exploreNftsPageQuery.sortCondition
        }
        if (workType === 0) {
          this.exploreNftsPageQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await workExploreNfts(params)
        this.exploreNftsPageQuery.pageNo = res.page.pageNo
        this.exploreNftsPageQuery.pageSize = res.page.pageSize

        this.exploreNfts = [
          ...this.exploreNfts,
          ...res.dataList
        ]
        this.exploreNftsPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getNftsInNodeDetailInit(params: NftsInExploreParams) {
      try {
        const res = await daoNfts(params)
        this.nodeDetailNfts = res.dataList
        this.nodeDetailNftsPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getNftsInNodeDetailLazyLoad(params: NftsInExploreParams) {
      try {
        const res = await daoNfts(params)
        this.nodeDetailNfts = [
          ...this.nodeDetailNfts,
          ...res.dataList
        ]
        this.nodeDetailNftsPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getDrbNftsInNodeDetailInit(params: NftsInExploreParams) {
      try {
        const res = await daoDrbNfts(params)
        this.nodeDetailDrbNfts = res.dataList
        this.nodeDetailDrbNftsPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getDrbNftsInNodeDetailLazyLoad(params: NftsInExploreParams) {
      try {
        const res = await daoDrbNfts(params)
        this.nodeDetailDrbNfts = [
          ...this.nodeDetailDrbNfts,
          ...res.dataList
        ]
        this.nodeDetailDrbNftsPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getNftHolderLazyLoad(workType: number) {
      try {
        const params = {
          pageNo: this.nftHolderPageQuery.pageNo,
        }
        if (workType === 0) {
          this.nftHolderPageQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await workHold(params)
        this.nftHolderPageQuery.pageNo = res.page.pageNo
        this.nftHolderPageQuery.pageSize = res.page.pageSize

        this.nftHolder = [
          ...this.nftHolder,
          ...res.dataList
        ]
        this.nftHolderPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getNftMintedLazyLoad(workType: number) {
      try {
        const params = {
          pageNo: this.nftMintedPageQuery.pageNo,
        }
        if (workType === 0) {
          this.nftMintedPageQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await workMinted(params)
        this.nftMintedPageQuery.pageNo = res.page.pageNo
        this.nftMintedPageQuery.pageSize = res.page.pageSize

        this.nftMinted = [
          ...this.nftMinted,
          ...res.dataList
        ]
        this.nftMintedPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNftsStore, import.meta.hot))
}

export default useNftsStore;