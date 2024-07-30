import { acceptHMRUpdate, defineStore } from "pinia";
import {
  workShowWindow,
  workExploreUnmitedWorks,
  searchWorks,
  favoriteWork,
  workCreator,
} from "@/api/works";
// type WorksInExploreParams = {
//   fixedPrice: number,
//   minPrice: number,
//   maxPrice: number,
//   pageNo: number,
//   pageSize?: number,
// }

type Work = {
  bgColor: string,
  canvasNumber: number,
  creatorAddress: string,
  daoErc20Address: string,
  daoId: number,
  daoName: string,
  daoNumber: number,
  daoSymbol: string,
  erc20PaymentMode: boolean,
  favoriteAmount: number,
  favorited: boolean,
  fixedPrice: boolean,
  generate: number,
  havePassesQuantity: number,
  height: number,
  imgUrl: string,
  inputTokenAddress: string,
  inputTokenDecimals: number,
  inputTokenLogo: string,
  passesTotalQuantity: number,
  payCurrencyType: string,
  price: string,
  priceType: number,
  royaltyTokenPrice: null,
  topupMode: boolean,
  unifiedPriceSet: boolean,
  workDescription: string,
  workId: number,
  workNumber: null,
  workStatus: number,
}

type WorksInSearchParams = {
  searchWord: string;
  pageNo: number;
  pageSize: number; 
}
export const useWorkStore = defineStore({
  id: 'work',
  state: () => ({
    exploreWorks: [] as Work[],
    exploreWorksPageInfo: {
      isAll: false,
      count: 0
    },
    exploreWorksQuery: {
      sortCondition: 0,
      fixedPrice: 2,
      minPrice: 0,
      maxPrice: 9999,
      pageNo: 0,
      pageSize: 5,
    },
    searchWorks: [] as Work[],
    searchWorksQuery: {
      searchWord: '',
      pageNo: 1,
      pageSize: 5,
    },
    searchWorksPageInfo: {
      count: 0,
      isAll: false,
    },
    favoriteWorksQuery: {
      pageNo: 1,
      pageSize: 5,
    },
    favoriteWorks: [] as Work[],
    favoriteWorksPageInfo: {
      count: 0,
      isAll: false,
    },
    createWorks : [] as Work[],
    createWorksPageInfo: {
      count: 0,
      isAll: false,
    },
    createWorksQuery: {
      pageNo: 1,
      pageSize: 5,
    },
  }),
  actions: {
    async getWorkCurBlockWinInfo(params: { workId: string }) {
      try {
        const res = await workShowWindow(params)
        return res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getWorksInExploreLazyLoad(workType: number) {
      try {
        const params = {
          sortCondition: this.exploreWorksQuery.sortCondition,
          fixedPrice: this.exploreWorksQuery.fixedPrice,
          minPrice: this.exploreWorksQuery.minPrice,
          maxPrice: this.exploreWorksQuery.maxPrice,
          pageNo: this.exploreWorksQuery.pageNo,
        }
        if (workType === 0) {
          this.exploreWorksQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await workExploreUnmitedWorks(params)
        this.exploreWorksQuery.pageNo = res.page.pageNo
        this.exploreWorksQuery.pageSize = res.page.pageSize
        this.exploreWorks = [
          ...this.exploreWorks,
          ...res.dataList
        ]
        this.exploreWorksPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getWorksInSearchLazyLoad(workType: number) {
      try {
        const params = {
          searchWord: this.searchWorksQuery.searchWord,
          pageNo: this.searchWorksQuery.pageNo,
          pageSize: this.searchWorksQuery.pageSize,
        }
        if (workType === 0) {
          this.searchWorksQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await searchWorks(params)
        this.searchWorksQuery.pageNo = res.page.pageNo
        this.searchWorksQuery.pageSize = res.page.pageSize
        this.searchWorks = [
          ...this.searchWorks,
          ...res.dataList
        ]
        this.searchWorksPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count,
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getWorksInFavoriteLazyLoad(params: WorksInSearchParams) {
      try {
        const res = await favoriteWork(params)
        this.favoriteWorks = [
          ...this.favoriteWorks,
          ...res.dataList
        ]
        this.favoriteWorksPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count,
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getWorksInCreateLazyLoad(workType: number) {
      try {
        const params = {
          pageNo: this.createWorksQuery.pageNo,
        }
        if (workType === 0) {
          this.createWorksQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await workCreator(params)
        this.createWorksQuery = {
          pageNo: res.page.pageNo,
          pageSize: res.page.pageSize,
        }
        this.createWorks = [
          ...this.createWorks,
          ...res.dataList
        ]
        this.createWorksPageInfo = {
          count: res.page.count,
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getWorksInFavouriteLazyLoad(workType: number) {
      try {
        const params = {
          pageNo: this.favoriteWorksQuery.pageNo,
        }
        if (workType === 0) {
          this.favoriteWorksQuery.pageSize = 5
          Object.assign(params, { pageSize: 5 })
        }
        const res = await favoriteWork(params)
        this.favoriteWorks = [
          ...this.favoriteWorks,
          ...res.dataList
        ]
        this.favoriteWorksPageInfo = {
          count: res.page.count,
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
        }
      } catch (error) {
        console.error(error)
      }
    },
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useWorkStore, import.meta.hot))
}

export default useWorkStore;