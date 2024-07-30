<template>
  <v-card class="pa-5 w-full" color="#1A1F2E">
    <v-card-title class="p-0 text-white text-medium">Redeem</v-card-title>
    <div class="text-xl flex flex-row mt-[30px]">
      <div class="flex flex-col w-full min-w-[540px]">
        <span class="text-right text-grey-1 text-xs mb-[6px]" v-show="userAddress">
          Balance: {{ bigNumFormat(erc20Balance, 6, 0.000001) }}
        </span>
        <v-text-field
          v-model="inputErc" :counter="10" hide-details required placeholder="0" class="input-erc"
          type="number"
          @update:modelValue="setInput(inputErc, 0, 0, 999999999)">
          <template #append-inner>
            <div class="flex items-center">
              <v-btn variant="outlined" class="text-xs w-[38px] px-[1px] rounded-[2px] btn-line" size="x-small"
                @click="setMax">
                MAX
              </v-btn>
              <SelectToken :ercToken="ercToken"></SelectToken>
            </div>
          </template>
        </v-text-field>
      </div>
      <v-icon icon="mdi-arrow-right" start class="text-2xl mx-[26px] self-end mb-5"></v-icon>
      <div class="flex flex-col w-full min-w-[540px]">
        <span class="text-right text-grey-1 text-xs mb-[6px]" v-show="userAddress">
          Balance: {{ bigNumFormat(ethBalance, 6, 0.000001) }}
        </span>
        <v-text-field v-model="inputErcNum" :counter="10" hide-details required placeholder="0" class="input-eth" disabled>
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
        100,000,000 {{ ercToken.erc20Symbol }}={{
        bigNumFormat(Number(ethVal), 6, 0.000001)
        }}ETH
        <i class="iconfont icon-info ml-1">
          <v-tooltip activator="parent" location="top">
            ERC20 revenue = Canvas SubDAO Token Amount / Total Circulating
            <br />
            SubDAO Token Amount * Asset Pool Total ETH
          </v-tooltip>
        </i>
      </span>
    </div>
    <v-btn :class="`!h-[52px] ${btnDisabled ? 'btn-linear-disabled' : 'btn-linear'}`" :disabled="btnDisabled"
      @click="handleClick">
      {{ !userAddress ? 'Connect Wallet' : btnText }}
    </v-btn>
    <SlotDialog title="Are you sure?" :is-dialog="isBurnDio" @cancel-dialog="isBurnDio = false">
      <div class="dialogLoading">
        <p class="p1 px-4 pt-4">
          This is an irreversible operation, will burn a portion of Nodes Erc20
          Tokens into an Redeemed Pool. You will lose the opportunity to get
          more Royalty Fee in the future and significantly increase the earnings
          of other Royalty Token Holders.
        </p>
        <p class="p2 pt-2 px-4 pb-4">ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.</p>
        <v-btn block class="btnz" @click="setExpertMode"> Continue Redeem </v-btn>
      </div>
    </SlotDialog>
    <DialogLoading title="Redeem" :isLoading="dialogLoading" text="Please continue in the wallet..." />
  </v-card>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import useUserStore from '@/store'
import useDexStore from '@/store/dex'
import { useRoute } from 'vue-router'
import { bigNumFormat } from '@/utils'
import { BigNumber } from 'bignumber.js'
import { oninputNum } from '@/utils'
import useAccount from '@/hooks/useAccount'
import SelectToken from './SelectToken.vue'
import SlotDialog from '@/components/SlotDialog.vue'
import { exchangeOutputToInput } from '@/common/web3service'
import useToastNotify from '@/hooks/useToastNotify'
import DialogLoading from '@/components/DialogLoading.vue'

const isLoading = ref(false)
const inputErc = ref('')
const btnText = ref('')
const btnDisabled = ref(false)
const isBurnDio = ref(false)
const dialogLoading = ref(false)

const route = useRoute()
const store = useUserStore()
const dexStore = useDexStore()
const { getTrading } = useAccount()
const { notifyErr, notifySuc } = useToastNotify()

const userAddress = computed(() => store.UserInfo.address)
const ercToken = computed(() => dexStore.ercToken)
const ethVal = computed(() => {
  const price = dexStore.assetsPoolData.assetPoolPrice
  inputErcNum.value = '0'
  inputErc.value = '0'
  return new BigNumber(price).multipliedBy(1e8).gt(0)
    ? new BigNumber(price).multipliedBy(1e8).toString()
    : 0
})

const ethBalance = computed(() => {
  return dexStore.ethBalance
})

const erc20Balance = computed(() => {
  return new BigNumber(dexStore.erc20Balance).div(1e18).toNumber()
})

const priceData = computed(() => {
  return dexStore.ercPrice
})

onMounted(() => {
  init()
  setSwapIput()
})

const setExpertMode = async () => {
  isBurnDio.value = false
  dialogLoading.value = true
  try {
    const tx = await exchangeOutputToInput(
      priceData.value.projectId,
      new BigNumber(Number(inputErc.value)).times(1e18).toFixed(),
      userAddress.value
    )
    const res = await tx.wait()
    inputErcNum.value = ''
    btnText.value = 'Enter an amount'
    btnDisabled.value = true
    inputErcNum.value = '0'
    notifySuc('Successful transaction', true)
    if (res.status || res.logs.length > 0) {
      init()
      const query = {
        tradeType: [5],
        pageNo: 1,
        erc20Address: ercToken.value.erc20Address,
      };
      await dexStore.getTransactions(query)
    }
  } catch (e) {
    if (JSON.stringify(e).indexOf('0x0cb09dc7') > -1) {
      const err = `${ercToken.value.erc20Symbol} This function is suspended for security reasons.`
      notifyErr(err)
    } else {
      if (JSON.stringify(e).indexOf('0x14f8ad9d') > -1) {
        const err = `D4A This function is suspended for security reasons.`
        notifyErr(err)
      } else {
        notifyErr(JSON.stringify(e))
      }
    }
  } finally {
    inputErc.value = ''
    dialogLoading.value = false
  }
}

const init = async () => {
  isLoading.value = true
  const loadedLliquidityPrice = await dexStore.getLliquidityPriceDefault(
    route.query.address as string
  )
  if (loadedLliquidityPrice) {
    await dexStore.getAssetsPoolPrice()
    await dexStore.getLiquidityPriceForErcToken()
    await dexStore.getAssetPoolInfo()
  }
  if (userAddress.value) {
    await dexStore.getEthBalance()
    await dexStore.getErc20Balance(userAddress.value)
  }
  isLoading.value = false
}
const setInput = (
  val: string | number,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  inputErc.value = inputNum as never
  setSwapIput()
}

const handleClick = async () => {
  const isTrad = await getTrading(setSwapIput)
  if (!isTrad) {
    return
  }
  isBurnDio.value = true
}

const setMax = () => {
  inputErc.value = String(erc20Balance.value)
  setSwapIput()
}
const inputErcNum = ref('0')
const setSwapIput = () => {
  if (userAddress.value === '') {
    btnDisabled.value = false
    return
  }
  if (Number(inputErc.value) > 0) {
    inputErcNum.value = new BigNumber(inputErc.value)
      .times(ethVal.value)
      .div(1e8)
      .toFixed()
    if (new BigNumber(inputErc.value).lte(erc20Balance.value)) {
      btnText.value = 'Redeem'
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
    inputErcNum.value = ''
  }
}
</script>
<style scoped>
.btn-linear-disabled >>> .v-btn__overlay {
  opacity: 0 !important;
}
.input-erc >>> .v-field__input {
  font-size: 20px;
  font-weight: 400;
  /* font-family: Roboto; */
}
.input-eth >>> .v-field__input {
  font-size: 20px;
  font-weight: 400;
  /* font-family: Roboto; */
}
</style>
