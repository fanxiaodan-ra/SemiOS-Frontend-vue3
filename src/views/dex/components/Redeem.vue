<template>
  <v-card class="pa-5 w-full" color="#252b3a">
    <v-card-title class="p-0 text-grey-1 text-medium">Redeem</v-card-title>
    <div class="text-xl flex flex-row">
      <div class="flex flex-col w-full min-w-[540px]">
        <span class="text-right text-grey-1 text-xs mb-[6px]" v-show="userAddress">
          Balance: {{ bigNumFormat(erc20Balance, 6, 0.000001) }}
        </span>
        <v-text-field v-model="inputErc" :counter="10" hide-details required placeholder="0" class="!text-xl">
          <template #append-inner>
            <div class="flex items-center">
              <v-btn variant="outlined" class="text-xs w-[38px] px-[1px] rounded-[2px] btn-line" size="x-small"
                @click="setMax">
                MAX
              </v-btn>
              <v-btn variant="text" class="text-grey-1 text-base pl-2 pr-0 ml-2">
                {{ ercToken.erc20Symbol }}
                <v-icon icon="mdi-menu-down" start class="ml-1"></v-icon>
              </v-btn>
            </div>
          </template>
        </v-text-field>
      </div>
      <v-icon icon="mdi-arrow-right" start class="text-2xl mx-[26px] self-end mb-5"></v-icon>
      <div class="flex flex-col w-full min-w-[540px]">
        <span class="text-right text-grey-1 text-xs mb-[6px]" v-show="userAddress">
          Balance: {{ bigNumFormat(ethBalance, 6, 0.000001) }}
        </span>
        <v-text-field v-model="inputEth" :counter="10" hide-details required placeholder="0" class="!text-xl" disabled>
          <template #append-inner>
            <div class="flex items-center">
              <v-label class="text-base text-grey-1">ETH</v-label>
            </div>
          </template>
        </v-text-field>
      </div>
    </div>
    <div class="mt-3">
      <span class="text-grey-1 text-sm flex items-center">
        100,000,000 {{ ercToken.erc20Symbol }}={{ bigNumFormat(Number(ethVal), 6, 0.000001) }}ETH
        <i class="iconfont icon-info ml-1">
          <v-tooltip activator="parent" location="top">
            ERC20 revenue = Canvas SubDAO Token Amount / Total Circulating
            <br />
            SubDAO Token Amount * Asset Pool Total ETH
          </v-tooltip>
        </i>
      </span>
    </div>
    <v-btn :class="`!h-[52px] ${btnDisabled ? 'btn-linear-disabled' : 'btn-linear'}`" :disabled="btnDisabled">
      {{ !userAddress ? 'Connect Wallet' : btnText }}
    </v-btn>
  </v-card>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import useUserStore from '@/store'
import useDexStore from '@/store/dex'
import { useRoute } from 'vue-router'
import { bigNumFormat } from '@/utils'
import { BigNumber } from 'bignumber.js'

const isLoading = ref(false)
const inputErc = ref('')
const inputEth = ref('')
const btnText = ref('Enter an amount')
const btnDisabled = ref(false);

const route = useRoute()
const store = useUserStore()
const dexStore = useDexStore()
const userAddress = computed(() => store.UserInfo.address)
const ercToken = computed(() => dexStore.ercToken)
const ethVal = computed(() => {
  const price = dexStore.assetsPoolData.assetPoolPrice
  return new BigNumber(price)
    .multipliedBy(1e8)
    .gt(0)
    ? new BigNumber(price)
      .multipliedBy(1e8)
      .toString()
    : 0
})
const priceData = computed(() => {
  return dexStore.ercPrice;
})

const ercInfo = computed(() => {
  return dexStore.assetPoolInfo;
})

const ethBalance = computed(() => {
  return dexStore.ethBalance;
})

const erc20Balance = computed(() => {
  return dexStore.erc20Balance;
})

onMounted(() => {
  init()
  setSwapIput()
})

const init = async () => {
  isLoading.value = true
  const loadedLliquidityPrice = await dexStore.getLliquidityPriceDefault(route.query.address as string)
  if (loadedLliquidityPrice) {
    await dexStore.getAssetsPoolPrice()
    await dexStore.getLiquidityPriceForErcToken()
    await dexStore.getAssetPoolInfo()
  }
  if (userAddress.value) {
    await dexStore.getEthBalance()
    await dexStore.getErc20Balance(userAddress.value)
  }
  isLoading.value = false;
}

const setMax = () => {
  inputErc.value = String(erc20Balance.value)
  setSwapIput()
}

const setSwapIput = () => {
  if (Number(inputErc.value) > 0) {
    inputErc.value = new BigNumber(inputErc.value)
      .times(ethVal.value)
      .div(1e8)
      .toFixed()
    if (
      new BigNumber(inputErc.value).gt(0) &&
      new BigNumber(inputErc.value).lte(erc20Balance.value)
    ) {
      btnText.value = 'Burn'
      btnDisabled.value = false
      return
    }
    if (new BigNumber(inputErc.value).gt(erc20Balance.value)) {
      btnText.value = 'Insufficient balance'
      btnDisabled.value = true
      return
    }
  } else {
    btnText.value = 'Enter an amount'
    btnDisabled.value = true
    inputEth.value = ''
  }
}

</script>
<style scoped>
.btn-linear-disabled >>> .v-btn__overlay {
  opacity: 0!important;
}
</style>