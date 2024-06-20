import { acceptHMRUpdate, defineStore } from 'pinia';
import {
  assetPoolInfo, 
  liquidityPrice,
  assetPoolPrice,
  liquidityDefault,
} from '@/api/dex';
import { getBalance, getErc20Balance } from '@/common/web3service'

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
    ercPrice: {},
    assetPoolInfo: {},
    ethBalance: 0,
    erc20Balance: 0,
  }),
  actions: {
    async getLliquidityPriceDefault(address: string | undefined) {
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
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useDexStore, import.meta.hot));

export default useDexStore;
