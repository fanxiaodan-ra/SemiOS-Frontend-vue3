<template>
  <div>
    <v-btn class="ml-auto text-sm text-none font-bold justify-self-end btnz" @click="setAddToken">
      {{ t('IncentivePlan.planBtn') }}
    </v-btn>
    <SlotDialog
      :title="t('IncentivePlan.diaTitle')"
      :isDialog="showDialog"
      @cancelDialog="showDialog = false"
    >
      <v-form ref="formRef" class="py-8 px-4">
        <v-text-field
          :label="t('IncentivePlan.addTokens')"
          aria-setsize="large"
          @keypress="filterNum"
          v-model="totalReward"
          :rules="tokenRules"
          @update:modelValue="setValue"
        >
        </v-text-field>
      </v-form>
      <v-btn
        block
        class="btnz text-none my-mgt16"
        type="submit"
        @click="submit"
        >{{ t('common.submit') }}</v-btn
      >
    </SlotDialog>
    <SlotDialog
      :title="t('SetupPlan.treasuryDialogTitle')"
      :isDialog="isSource"
      @cancelDialog="isSource = false"
    >
      <p class="my-6 text-center">{{t('SetupPlan.treasuryDialogText')}}</p>
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="setTreasury"
        >{{t('SetupPlan.treasury')}}</v-btn
      >
      <v-btn
        block
        class="btnb text-none my-4 !mx-0"
        type="submit"
        @click="setWallet"
        >{{t('SetupPlan.myWallet')}}</v-btn
      >
    </SlotDialog>
    <DialogLoading
      :title="t('SetupPlan.addPlanLoadingTitle')"
      :isLoading="appLoading"
      :text="t('SetupPlan.addPlanLoadingText')"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { t } from '@/lang'
import SlotDialog from '@/components/SlotDialog.vue';
import { filterNum } from '@/utils';
import useAccount from '@/hooks/useAccount';
import useToastNotify from '@/hooks/useToastNotify';
import useUserStore from '@/store';
import { addPlanTotalReward, getAllowanceTreasury, approveWork } from '@/common/web3service';
import { BigNumber } from 'bignumber.js';
import DialogLoading from '@/components/DialogLoading.vue';
type Params = {
  planCode?: string
  decimalsNum?: number
  useTreasury?: boolean
  rewardTokenSymbol?: string
  rewardToken: string
  rewardTokenDecimal?: number
  rewardType?: number
  ownerAddress: string
}
const props = defineProps({
  data: {
    type: Object,
    default: () => ({} as Params),
  },
})
const showDialog = ref(false)
const totalReward = ref(0)
const params = ref<Params>({
  ...props.data as Params
})
const appLoading = ref(false)
const isSource = ref(false)
const userStore = useUserStore()
const { getTrading } = useAccount()
const { notifyErr, notifySuc } = useToastNotify()

const tokenRules = [
  (v: any) => !!v || 'This field is required',
  (v: any) => (v && v > 0) || 'Min should not be below 0',
  (v: any) => (v && v <= 1000000000) || 'Max should not be above 1000000000',
]
const setAddToken = async () => {
  const isTrad = await getTrading()
  if (!isTrad) return
  if (props.data.incentiveStatus === 3) {
    notifyErr(t('IncentivePlan.planClosed'), true)
    return
  }
  totalReward.value = 0
  params.value = {
    ...props.data as Params
  }
  showDialog.value = true
}

const setValue = () => {
  if (totalReward.value < 0) { totalReward.value = 0 }
  if (Number(totalReward.value) > 1000000000){
    totalReward.value = 1000000000
  }
  if (totalReward.value.toString().indexOf('.') > 0) {
    totalReward.value = Number(totalReward.value.toFixed(5))
  }
}

const setApprove = async (address:string, amount:string) => {
  console.log(address, amount, '============授权')
  try {
    appLoading.value = true
    const app = await approveWork(address, amount)
    await app.wait()
    notifySuc('Successful transaction', true)
  } catch (error) {
    notifyErr(JSON.stringify(error), false)
  } finally {
    appLoading.value = false
  }
}

const setPlanTotal = async () => {
  try {
    isSource.value = false
    BigNumber.config({ EXPONENTIAL_AT: 38 })
    const { planCode, decimalsNum, useTreasury, rewardTokenSymbol } = params.value
    const tx = await addPlanTotalReward({
      planId: planCode,
      amount: new BigNumber(totalReward.value)
        .times(`1e${decimalsNum}`)
        .toString(),
      useTreasury: useTreasury,
      totalReward: totalReward.value,
      rewardTokenSymbol:rewardTokenSymbol,
    })
    await tx.wait()
    params.value = {
      ...params.value,
      useTreasury: false,
    }
    totalReward.value = 0
    notifySuc('Successful transaction', true)
  } catch (e) {
    notifyErr(JSON.stringify(e), false)
  } finally {
    appLoading.value = false
  }
}

const setTreasury = () => {
  params.value = {
    ...params.value,
    useTreasury: true,
  }
  appLoading.value = true
  setPlanTotal()
}

const setAmountGt = async () => {
  if (totalReward.value > 0) {
    appLoading.value = true
    isSource.value = false
    const { rewardToken, decimalsNum } = params.value
    try {
      BigNumber.config({ EXPONENTIAL_AT: 38 })
      const num = new BigNumber(totalReward.value)
        .times(`1e${decimalsNum}`)
        .toString()
      console.log(num, 'num')
      const allowance = await getAllowanceTreasury(
        rewardToken,
        userStore.UserInfo.address
      )
      console.log(allowance, 'allowance')
      const appNum = new BigNumber(num).minus(allowance).toString()
      if (Number(appNum) > 0) {
        setApprove(rewardToken, num)
        return
      }
      setPlanTotal()
    } catch (e) {
      appLoading.value = false
      notifyErr(JSON.stringify(e), false)
    }
  } else {
    setPlanTotal()
  }
}

const setWallet = () => {
  params.value = {
    ...params.value,
    useTreasury: false,
  }
  setAmountGt()
}
const submit = () => {
  params.value = {
    ...params.value,
    decimalsNum: params.value.rewardTokenDecimal
  }
  const { rewardType, rewardTokenSymbol, ownerAddress } = params.value
  switch (rewardType) {
    case 1:
      if (rewardTokenSymbol === 'ETH') {
        appLoading.value = true
        params.value = {
          ...params.value,
          useTreasury: false,
        }
        setPlanTotal()
      } else {
        appLoading.value = true
        setWallet()
      }
      break
    case 2:
      if (totalReward.value > 0) {
        if (ownerAddress.toLowerCase() === userStore.UserInfo.address.toLowerCase()) {
          isSource.value = true
          
        } else {
          appLoading.value = true
          setWallet()
        }
        showDialog.value = false
      } else {
        appLoading.value = true
        setPlanTotal()
      }
      break
    case 3:
      appLoading.value = true
      setWallet()
      break
  }
}
</script>
