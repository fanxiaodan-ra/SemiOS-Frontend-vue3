<template>
  <div class="flex flex-col self-start w-full">
    <div class="w-screen min-w-[1225px] text-w-2 text-xl font-medium h-[84px] border-b-[1px] border-[#2F305B] text-center leading-[84px] mb-4">
      {{ t('SetupPlan.title') }}
    </div>
    <div class="lg:w-[840px] md:w-full my-0 mx-auto">
      <v-form
        ref="formRef"
        class="text-center"
        @submit.prevent="submit"
      >
        <FormRow
          :input-name="$t('SetupPlan.ioTitle')"
          leftWidth="320px"
          :isIcon="true"
          :tooltipText="$t('SetupPlan.ioTooltip')"
          >
          <v-radio-group
            v-model="formData.io"
            class="mt-2 text-base"
            inline
          >
            <v-radio
              v-for="item in outputType"
              :key="item.label"
              :label="item.label"
              :value="item.value"
              color="#745cd4"
            >
            </v-radio>
          </v-radio-group>
        </FormRow>
        <FormRow
          :input-name="t('SetupPlan.token')"
          leftWidth="320px"
          :isIcon="true"
          :tooltipText="t('SetupPlan.tokenTooltip')"
          >
          <v-select
            v-model="formData.tokenForThisPlan"
            label="Select"
            :items="tokenList"
            item-title="label"
            item-value="value"
          ></v-select>
        </FormRow>
        <FormRow
          v-if="formData.tokenForThisPlan === 3"
          :input-name="t('SetupPlan.erc20ContractAddress')"
          leftWidth="320px"
          :isIcon="true"
          :tooltipText="t('SetupPlan.erc20ContractAddressTooltip')"
          >
          <v-text-field
            label="Address"
            :placeholder="t('SetupPlan.planAddressTokenHolder')"
            density="comfortable"
            v-model="formData.tokenForThisPlanAddress"
            :rules="tokenForThisPlanAddressRules"
          >
          </v-text-field>
        </FormRow>
        <TimePicker
          leftWidth="320px"
          :disabled="!planTime"
          :input-name="$t('SetupPlan.planStartDateLabel')"
          :tooltip-text="$t('SetupPlan.planStartDateTooltip')"
          @setFormDate="setFormDate"
        />
        <FormRow
          :input-name="t('SetupPlan.totalRewardLabel')"
          leftWidth="320px"
          :isIcon="true"
          :tooltipText="t('SetupPlan.totalRewardTip')"
          >
          <v-text-field
            label="Amount"
            density="comfortable"
            v-model="formData.totalReward"
            :placeholder="t('SetupPlan.totalRewardPlaceholder')"
            @keypress="filterNum"
            :rules="totalRewardRules"
            @update:model-value="setInput('totalReward', 4, 0, 1000000000)"
          >
          </v-text-field>
        </FormRow>
        <FormRow
          :input-name="t('SetupPlan.totalRoundsLabel')"
          leftWidth="320px"
          :isIcon="true"
          :tooltipText="t('SetupPlan.totalRoundsTip')"
          >
          <v-text-field
            label="Amount"
            density="comfortable"
            v-model.number="formData.totalRounds"
            :placeholder="t('SetupPlan.totalRoundsDer')"
            @keypress="filterNum"
            @update:model-value="setInput('totalRounds', 0, 1, 1000)"
            :rules="totalRoundsRules"
          >
          </v-text-field>
        </FormRow>
        <FormRow
          :input-name="t('SetupPlan.durationLabel')"
          leftWidth="320px"
          :isIcon="true"
          :tooltipText="t('SetupPlan.durationTip')"
          >
          <v-text-field
            label="Hours"
            density="comfortable"
            type="number"
            v-model.number="formData.duration"
            :placeholder="t('SetupPlan.durationPlaceholder')"
            @keypress="filterNum"
            @update:model-value="setInput('duration', 0, 1, 1000)"
            :rules="totalDurationRules"
          >
          </v-text-field>
        </FormRow>
        <v-btn
          :loading="loading"
          class="btnmo btnz text-none w-[180px] my-10"
          size="large"
          text="Submit"
          type="submit"
        ></v-btn>
      </v-form>
    </div>
    <DialogLoading
      :title="t('SetupPlan.loadingTitle')"
      :isLoading="loading"
      :text="t('SetupPlan.loadingText')"
    />
    <SlotDialog
      :title="t('SetupPlan.treasuryDialogTitle')"
      :isDialog="isSource"
      @cancelDialog="closeDialog"
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
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import FormRow from '@/components/FormRow.vue'
import TimePicker from '@/components/TimePicker.vue'
import DialogLoading from '@/components/DialogLoading.vue'
import SlotDialog from '@/components/SlotDialog.vue'
import usePlanStore from '@/store/plan'
import type { TxParams } from '@/store/plan'
import useUserStore from '@/store'
import useAccount from '@/hooks/useAccount'
import useAddNodes from '@/hooks/useAddNodes'
import useToastNotify from '@/hooks/useToastNotify'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { BigNumber } from 'bignumber.js'
import { getAllowanceTreasury, approveAmount, getCode } from '@/common/web3service'
import { filterNum } from '@/utils'
import { SubmitEventPromise } from 'vuetify'
import { ethers } from 'ethers'
import { oninputNum } from '@/utils'

const planStore = usePlanStore()
const userStore = useUserStore()
const route = useRoute()

const { getTrading } = useAccount()
const { getDaoTime } = useAddNodes()
const { notifyErr, notifySuc } = useToastNotify()

const totalDurationRules = [
  (v: any) => !!v || 'This field is required',
  (v: any) => (v && v <= 1000) || 'Max should not be above 1000',
]

const totalRoundsRules = [
  (v: any) => !!v || 'This field is required',
  (v: any) => (v && v <= 1000) || 'Max should not be above 1000',
]


const totalRewardRules = [
  (v: any) => (Number(v) >= 0) || 'This field is required',
  (v: any) => (v >= 0 && v <= 1000000000) || 'Max should not be above 1000000000',
]
const tokenForThisPlanAddressRules = [
  (v: any) => !!v || 'This field is required',
  async (v: any) => {
    const strArr = v.match(/^(0x)?[0-9a-fA-F]{40}$/)
    const isAddress = ethers.utils.isAddress(v)
    if (!strArr || !isAddress) {
      const str = 'Wrong address please modify and resubmit.'
      return str
    }
    const isCode = await getCode(v)
    if (!isCode) {
      return 'The address is not a contract address'
    }
    return true
  },
]
const loading = ref(false)
const isSource = ref(false)
const planTime = ref('')
const formData = reactive({
  io: false,
  planStartDate: '',
  duration: 24, //blockDuration
  totalReward: 0,  // Seed Nodes Output Token Amount
  totalRounds: 1,  // Incentive Block
  useTreasury: false,
  tokenForThisPlan: 1,
  tokenForThisPlanAddress: '',
})

const formRef = ref()
const outputType = ref([
  { label: t('SetupPlan.input'), value: false },
  { label: t('SetupPlan.output'), value: true },
])

const closeDialog = () => {
  isSource.value = false
}

const setInput = (
  type: keyof typeof formData,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const val = formData[type]
  if (typeof val === 'string' || typeof val === 'number') {
    const inputNum = oninputNum(val, position, min, max)
    formData[type] = inputNum as never
  }
}

const tokenList = ref([
  { label: t('SetupPlan.inputTokenForSeed'), value: 1 },
  { label: t('SetupPlan.outputTokenForSeed'), value: 2 },
  { label: t('SetupPlan.cusRewardToken'), value: 3 },
])

const setFormDate = (date: string) => {
  formData.planStartDate = date
}

const createPlan = async (txParams: TxParams) => {
  loading.value = true;
  try {
    await planStore.createPlan(txParams)
    notifySuc('Transaction completed!', true)
  } catch (error: any) {
    notifyErr(JSON.stringify(error))
  } finally {
    loading.value = false
  }
}

const setApprove = async (address: string, num: string) => {
  loading.value = true;
  try {
    const app = await approveAmount(address, num)
    await app.wait()
    notifySuc('Successful transaction', true)
  } catch (error) {
    notifyErr(JSON.stringify(error))
  } 
}

const setAmountGt = async (txParams: TxParams) => {
  if (formData.totalReward > 0) {
    loading.value = true
    isSource.value = false
    try {
      BigNumber.config({ EXPONENTIAL_AT: 38 })
      const num = new BigNumber(txParams.totalReward)
        .times(`1e${txParams.decimalsNum}`)
        .toString()
      const allowance = await getAllowanceTreasury(
        txParams.rewardToken,
        userStore.UserInfo.address
      )
      console.log(allowance, 'allowance')
      const appNum = new BigNumber(num).minus(allowance).toString()
      if (Number(appNum) > 0) {
        setApprove(txParams.rewardToken, num)
        return
      }
      await createPlan(txParams)
    } catch(e) {
      notifyErr(JSON.stringify(e))
    }
    return
  }
  createPlan(txParams)
}

const submit = async (event: SubmitEventPromise) => {
  const isTrad = await getTrading()
  if (!isTrad) return
  const { valid } = await event
  if (valid) {
    loading.value = true
    const params = {
      ...formData,
      projectId: route.query.id as string,
      planStartDate: dayjs(new Date(formData.planStartDate)).format('YYYY-MM-DD'),
      duration: formData.duration,
      customTokenAddress: formData.tokenForThisPlanAddress,
    }
    const result = await planStore.getPlanParams(params)
    
    if (!result || !result.type) {
      loading.value = false
      return
    }
    const {
      txParams,
      type
    } = result
    planStore.setTxParams(txParams)
    switch (type) {
      case 'createPlan':
        formData.useTreasury = false
        createPlan(txParams)
        break
      case 'setWallet':
        formData.useTreasury = false
        setAmountGt(txParams)
        break;
      case 'setIsSource':
        isSource.value = true
        loading.value = false
        break;
      default:
        break;
    }
  }
  return 
}
const initDate = async () => {
  const daoTime = await getDaoTime()
  planTime.value = new Date(daoTime).toString()
  setFormDate(planTime.value)
}

const setTreasury = () => {
  formData.useTreasury = true;
  isSource.value = false
  createPlan({
    ...planStore.txParams,
    useTreasury: true,
  })
}

const setWallet = () => {
  formData.useTreasury = false
  setAmountGt({
    ...planStore.txParams,
    useTreasury: false,
  })
}

onMounted(() => {
  initDate()
})

</script>