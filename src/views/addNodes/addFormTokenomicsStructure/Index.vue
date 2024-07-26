<template>
  <v-card
    class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24"
    elevation="12"
  >
    <h3 class="node-name" v-if="store.addNodeType === 6">
      {{ $t('AddFormTokenomicsStructure.title') }}
    </h3>
    <v-form ref="formRef">
      <FormRow
        :input-name="$t('AddFormTokenomicsStructure.lotteryModeLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.lotteryModeTip')"
        :importance="false"
      >
        <v-switch
          v-model="formData.lotteryMode"
          color="#8C91FF"
          inset
        ></v-switch>
      </FormRow>
      <div v-if="!props.formDataProp.topUpMode">
        <FormStructureNodesLevelAssetAllocation
          :form-input="formData"
          @setFormData="setFormData"
          :form-data-prop="props.formDataProp"
        />
        <FormStructureAssetsInteractsWithOtherNodes
          :form-data-prop="formData"
          @setETHOtherFormData="setETHOtherFormData"
          @setERCOtherFormData="setERCOtherFormData"
        />
        <FormStructureThisNodesInternalIncentives
          ref="FormStructureThisNodesInternalIncentivesRef"
          :form-data-prop="props.formDataProp"
          @setFormData="setFormData"
        />
        <FormStructureThisNodesERCIncentives
          @setFormData="setFormData"
          :form-data-prop="props.formDataProp"
        />
        <FormStructureThisNodesETHIncentives
          @setFormData="setFormData"
          :form-data-prop="props.formDataProp"
        />
      </div>
    </v-form>
    <div class="dflex flex-jc my-mgb24 my-mgt24" v-if="store.addNodeType !== 6">
      <v-btn
        block
        class="btnb fc7 text-none mr-10"
        type="submit"
        @click="setAddType(3)"
        >{{ t('common.back') }}</v-btn
      >
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="setAddType(5)"
        >{{ t('common.next') }}</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import FormStructureNodesLevelAssetAllocation from './FormStructureNodesLevelAssetAllocation.vue'
import FormStructureAssetsInteractsWithOtherNodes from './FormStructureAssetsInteractsWithOtherNodes.vue'
import FormStructureThisNodesInternalIncentives from './FormStructureThisNodesInternalIncentives.vue'
import FormStructureThisNodesERCIncentives from './FormStructureThisNodesERCIncentives.vue'
import FormStructureThisNodesETHIncentives from './FormStructureThisNodesETHIncentives.vue'
import { ref, watch, onMounted } from 'vue'
import useUserStore from '@/store'
import { t } from '@/lang'
const store = useUserStore()
const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => {},
  },
  initData: {
    type: Object,
    default: () => {},
  },
})
const formData = ref<any>({
  lotteryMode: false,
  selfRewardRatioERC20: 0,
  nodesReservesRatioERC20: 0,
  ERC20OtherNodes: 0,
  redeemPoolRatioETH: 0,
  selfRewardRatioETH: 0,
  nodesReservesRatioETH: 0,
  ETHOtherNodes: 0,
  ERCOtherNodeslist: [],
  ETHOtherNodesList: [],
  daoPriceReserveRatio: {
    builder: 0,
    mainDAO: 97.5,
    pDao: 0,
    subDAO: 2.5,
  },
  fixedPriceReserveRatio: {
    builder: 0,
    mainDAO: 97.5,
    pDao: 0,
    subDAO: 2.5,
  },
  royalty: {
    pDao: 0,
    subDao: 50,
    builder: 25,
    minter: 25,
  },
  eth: { pDao: 0, subDao: 50, builder: 25, minter: 25 },
})

const emit = defineEmits(['setFormData'])
const formRef = ref()
const FormStructureThisNodesInternalIncentivesRef = ref()

const validateForm = async (value: any) => {
  const { valid } = await formRef.value.validate()
  const childValid = FormStructureThisNodesInternalIncentivesRef.value
    ? await FormStructureThisNodesInternalIncentivesRef.value.inputErr()
    : true
  console.log(value, 'valuevaluevalue')
  emit('setFormData', {
    formVal: value,
    validVal: {
      position: 3,
      value: valid && childValid,
    },
  })
}

watch(
  () => formData,
  (value) => {
    validateForm(value)
  },
  { deep: true }
)
import { BigNumber } from 'bignumber.js'
const setFormData = (val: any) => {
  formData.value = {
    ...formData.value,
    ...val,
  }
}

const setETHOtherFormData = (val: any) => {
  formData.value.ETHOtherNodesList = val
  formData.value.ETHOtherNodes = val.reduce(
    (a: number, item: any) => new BigNumber(a).plus(item.value).toNumber(),
    0
  )
}
const setERCOtherFormData = (val: any) => {
  formData.value.ERCOtherNodeslist = val
  formData.value.ERC20OtherNodes = val.reduce(
    (a: number, item: any) => new BigNumber(a).plus(item.value).toNumber(),
    0
  )
}

const setAddType = async (val: number) => {
  let isErr = true
  if (val === 5) {
    isErr = FormStructureThisNodesInternalIncentivesRef.value
      ? FormStructureThisNodesInternalIncentivesRef.value.inputErr()
      : true
  }
  if (!isErr) return
  store.setNodeType(val)
  window.scrollTo(0, 0)
}
onMounted(() => {
  emit('setFormData', formData.value)
})
</script>
