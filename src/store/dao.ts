import { acceptHMRUpdate, defineStore } from "pinia";
import {
  treasuryTransaction,
  daoCollections,
  searchDaos,
  searchSeedNodes,
  myDaoList,
  favoriteDao,
  togetherDaoList
} from '@/api/daos';
import { bigNumFormat, ellipsis, timeFormatting } from "@/utils";
import { APP_OPEN_URL } from "@/config";
import { h } from 'vue';

type TreasuryTransactionItem = {
  fromAddress: string,
  toAddress: string,
  amount: number,
  createTime: number,
  isUseTreasury: number,
  transactionHash: string
}
type Node = {
  daoDescription: string,
  daoErc20Address: string,
  daoId: number,
  daoLogoUrl: string,
  daoManitesto: string,
  daoName: string,
  daoNumber: number,
  daoStatus: any,
  daoSymbol: string,
  erc20Name: string,
  favoriteAmount: number,
  favorited: boolean,
  inputTokenAddress: string,
  inputTokenDecimals: number,
  inputTokenLogo: string,
  payCurrencyType: string,
  projectId: string
}
export const useDaoStore = defineStore({
  id: 'dao',
  state: () => ({
    explorerNodes: [] as Node[],
    explorerNodesPageInfo: {
      isAll: false,
      count: 0
    },
    explorerNodesPageQuery: {
      pageNo: 0,
      pageSize: 5,
      sortCondition: 0
    },
    searchNodes: [] as Node[],
    searchNodesPageInfo: {
      isAll: false,
      count: 0
    },
    searchNodesPageQuery: {
      pageNo: 0,
      pageSize: 5,
      searchWord: ''
    },
    searchSeedNodes: [] as Node[],
    searchSeedNodesPageInfo: {
      isAll: false,
      count: 0
    },
    searchSeedNodesPageQuery: {
      searchWord: ''
    },
    createNodes: [] as Node[],
    createNodesPageInfo: {
      isAll: false,
      count: 0
    },
    createNodesPageQuery: {
      pageNo: 0,
      pageSize: 5,
    },
    favouriteNodes: [] as Node[],
    favouriteNodesPageInfo: {
      isAll: false,
      count: 0
    },
    favouriteNodesPageQuery: {
      pageNo: 0,
      pageSize: 5,
    },
    togetherDaoList: [] as Node[],
    togetherDaoListPageInfo: {
      isAll: false,
      count: 0
    },
    togetherDaoListPageQuery: {
      pageNo: 0,
      pageSize: 5,
      daoId: ''
    }
  }),
  actions: {
    async getTreasuryTransaction(data: any) {
      try {
        const res: any = await treasuryTransaction(data)
        const result = res.dataList.map((item: TreasuryTransactionItem) => {
          return {
            fromAddress: h('a', {
              href: `${APP_OPEN_URL}/address/${item.fromAddress}`,
              target: '_blank',
              class: 'text-primary-1 active:text-primary-2'
            }, ellipsis(item.fromAddress)),
            toAddress: h('a', {
              href: `${APP_OPEN_URL}/address/${item.toAddress}`,
              target: '_blank',
              class: 'text-primary-1 active:text-primary-2'
            }, ellipsis(item.toAddress)),
            amount: bigNumFormat(item.amount),
            createTime: timeFormatting(item.createTime, 1, 1),
            isUseTreasury: item.isUseTreasury === 1 ? 'Treasury' : 'Wallet',
            transactionHash: h('a', {
              href: `${APP_OPEN_URL}/tx/${item.transactionHash}`,
              target: '_blank',
              class: 'text-primary-1 active:text-primary-2'
            }, ellipsis(item.transactionHash)),
          }
        })
        return {
          dataList: result,
          total: res.page.count,
          pageNo: res.page.pageNo,
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getExplorerNodesLazyLoad() {
      const params = {
        sortCondition: this.explorerNodesPageQuery.sortCondition,
        pageNo: this.explorerNodesPageQuery.pageNo,
        pageSize: this.explorerNodesPageQuery.pageSize
      }
      try {
        const res = await daoCollections(params)
        this.explorerNodesPageQuery.pageNo = res.page.pageNo
        this.explorerNodesPageQuery.pageSize = res.page.pageSize
        this.explorerNodes = [...this.explorerNodes, ...res.dataList]
        this.explorerNodesPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getSearchNodesLazyLoad() {
      const params = {
        searchWord: this.searchNodesPageQuery.searchWord,
        pageNo: this.searchNodesPageQuery.pageNo,
        pageSize: this.searchNodesPageQuery.pageSize
      }
      try {
        const res = await searchDaos(params)
        this.searchNodesPageQuery.pageNo = res.page.pageNo
        this.searchNodesPageQuery.pageSize = res.page.pageSize
        this.searchNodes = [...this.searchNodes, ...res.dataList]
        this.searchNodesPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getSearchSeedNodesLazyLoad() {
      const params = {
        searchWord: this.searchSeedNodesPageQuery.searchWord,
      }
      try {
        const res = await searchSeedNodes(params)
        this.searchSeedNodes = [...res.dataList]
        this.searchSeedNodesPageInfo = {
          isAll: true,
          count: res.dataList.length
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getCreateNodesLazyLoad() {
      try {
        const params = {
          pageNo: this.createNodesPageQuery.pageNo,
          pageSize: this.createNodesPageQuery.pageSize
        }
        const res = await myDaoList(params)
        this.createNodesPageQuery.pageNo = res.page.pageNo
        this.createNodesPageQuery.pageSize = res.page.pageSize
        this.createNodes = [...this.createNodes, ...res.dataList]
        this.createNodesPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getFavouriteNodesLazyLoad() {
      try {
        const params = {
          pageNo: this.favouriteNodesPageQuery.pageNo,
          pageSize: this.favouriteNodesPageQuery.pageSize
        }
        const res = await favoriteDao(params)
        this.favouriteNodesPageQuery.pageNo = res.page.pageNo
        this.favouriteNodesPageQuery.pageSize = res.page.pageSize
        this.favouriteNodes = [...this.favouriteNodes, ...res.dataList]
        this.favouriteNodesPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getTogetherNodesLazyLoad() {
      try {
        const params = {
          daoId: this.togetherDaoListPageQuery.daoId,
          pageNo: this.togetherDaoListPageQuery.pageNo,
          pageSize: this.togetherDaoListPageQuery.pageSize
        }
        const res = await togetherDaoList(params)
        this.togetherDaoListPageQuery.pageNo = res.page.pageNo
        this.togetherDaoListPageQuery.pageSize = res.page.pageSize
        this.togetherDaoList = [...this.togetherDaoList, ...res.dataList]
        this.togetherDaoListPageInfo = {
          isAll: res.page.pageNo * res.page.pageSize >= res.page.count,
          count: res.page.count
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDaoStore, import.meta.hot))
}

export default useDaoStore;