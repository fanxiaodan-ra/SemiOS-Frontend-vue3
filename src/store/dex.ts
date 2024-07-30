import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  assetPoolInfo, 
  liquidityPrice,
  assetPoolPrice,
  liquidityDefault,
  liquidityErc20Token,
  assetPoolEth,
  getApy,
  transaction
} from '@/api/dex';
import { getBalance, getErc20Balance } from '@/common/web3service'
import { orderBy, uniq } from 'lodash';
import useUserStore from '.';

const userStore = useUserStore()

export const useDexStore = defineStore({
  id: 'dex',
  state: () => ({
    ercToken: {
      erc20Address: '',
      erc20Symbol: '',
    },
    assetsPoolData: {
      assetPoolPrice: 0
    },
    ercPrice: {
      price: 0,
      projectId: ''
    },
    assetPoolInfo: {
      ethInPool: 0,
      burnVolume: 0,
    },
    ethBalance: 0,
    erc20Balance: 0,
    erc20TokenList: [] as any,
    selectedErc20Token: {},
    isRedeemLoading: false,
    transactionList: [] as any[],
    transactionListPageInfo: {
      pageNo: 1,
      pageSize: 10,
      count: 0,
    }
  }),
  actions: {
    async getLliquidityPriceDefault(address: string | undefined) {
      this.isRedeemLoading = true
      try {
        let ercToken;
        if (address) {
          const res = await liquidityPrice({
            erc20Address: address,
          })
          ercToken = res.data
        } else {
          const res = await liquidityDefault()
          ercToken = res.data
        }
        this.ercToken = ercToken
        return true
      } catch (error) {
        console.error(error)
      } finally {
        this.isRedeemLoading = false
      }
    },
    async getAssetsPoolPrice() {
      try {
        const res = await assetPoolPrice({
          erc20Address: this.ercToken.erc20Address,
        })
        this.assetsPoolData = res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getLiquidityPriceForErcToken() {
      try {
        const res = await liquidityPrice({
          erc20Address: this.ercToken.erc20Address,
        })
        this.ercPrice = res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getAssetPoolInfo() {
      try {
        const res = await assetPoolInfo({
          erc20Address: this.ercToken.erc20Address,
        })
        this.assetPoolInfo = res.data
      } catch (error) {
        console.error(error)
      }
    },
    async getEthBalance() {
      try {
        const res = await getBalance()
        this.ethBalance = res
      } catch (error) {
        console.error(error)
      }
    },
    async getErc20Balance(metaMaskAddress: string) {
      try {
        const res = await getErc20Balance(this.ercToken.erc20Address, metaMaskAddress)
        this.erc20Balance = res
      } catch (error) {
        console.error(error)
      }
    },
    async getLiquidityErc20Token(params: {
      searchWord: string,
      userAddress: string,
    }) {
      try {
        const res:any = await liquidityErc20Token(params)
        this.erc20TokenList = res.dataList
      } catch (error) {
        console.error(error)
      }
    },
    async setSelectedErc20Token(erc20Token: any) {
      this.ercToken = erc20Token
      await this.getAssetsPoolPrice()
      await this.getAssetPoolInfo()
      await this.getErc20Balance(userStore.UserInfo.address)
      await this.getLiquidityPriceForErcToken()
      await this.getTransactions({
        tradeType: [5],
        pageNo: 1,
        pageSize: 10,
      })
    },
    async getAssetPoolEth(chartQuery: any) {
      type Data = {
        time: number,
        changes: number[],
        totalAmount: number[],
        incomes: number[],
        maxChange: number[],
        maxtotalAmount: number[],
      }
      try {
        const res = await assetPoolEth({
          ...chartQuery,
          erc20Address: this.ercToken.erc20Address,
        })
        return res.data as Data
      } catch (error) {
        console.error(error)
      }
    },
    async getApy(chartQuery: any) {
      try {
        const res = await getApy({
          ...chartQuery,
          erc20Address: this.ercToken.erc20Address,
        })
        const arr = orderBy(uniq([...res.data.time, ...res.data.dottedTime]));
        const length = res.data.apy.length;
        const newArr = length > 0 ? new Array(length - 1) : [];
        const curArr = [...newArr, ...res.data.dottedApy];
        return {
          xdata: arr,
          yadata: res.data.apy,
          ybdata: curArr,
          maxVolume: res.data.maxVolume,
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getTransactions(data: any) {
      try {
        const res:any = await transaction({
          ...data,
          erc20Address: this.ercToken.erc20Address,
        })
        this.transactionList = res.dataList
        this.transactionListPageInfo = {
          pageNo: res.page.pageNo,
          pageSize: res.page.pageSize,
          count: res.page.count,
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDexStore, import.meta.hot));

export default useDexStore;
