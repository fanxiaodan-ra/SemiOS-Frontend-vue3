<template>
  <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="16">
    <h3 class="node-name">
      {{ $t('AddFormTokenomicsStructure.title') }}
    </h3>
    <v-form ref="formRef">
      <FormStructureNodesLevelAssetAllocation
        :form-input="formData"
        @setFormData="setFormData"
        :form-data-prop="props.initData"
        :isEdit="true"
      />
      <!-- TODO 此处无数据还未调试 -->
      <FormStructureAssetsInteractsWithOtherNodes
        :form-data-prop="formData"
        @setETHOtherFormData="setETHOtherFormData"
        @setERCOtherFormData="setERCOtherFormData"
        :initData="props.initData"
        :isEdit="true"
      />
      <FormStructureThisNodesInternalIncentives
        ref="FormStructureThisNodesInternalIncentivesRef"
        :form-data-prop="props.initData"
        @setFormData="setFormData"
        :isEdit="true"
      />
      <FormStructureThisNodesERCIncentives
        @setFormData="setFormData"
        :form-data-prop="props.initData"
        :isEdit="true"
      />
      <FormStructureThisNodesETHIncentives
        @setFormData="setFormData"
        :form-data-prop="props.initData"
        :isEdit="true"
      />
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import FormStructureNodesLevelAssetAllocation from '../addNodes/addFormTokenomicsStructure/FormStructureNodesLevelAssetAllocation.vue'
import FormStructureAssetsInteractsWithOtherNodes from '../addNodes/addFormTokenomicsStructure/FormStructureAssetsInteractsWithOtherNodes.vue'
import FormStructureThisNodesInternalIncentives from '../addNodes/addFormTokenomicsStructure/FormStructureThisNodesInternalIncentives.vue'
import FormStructureThisNodesERCIncentives from '../addNodes/addFormTokenomicsStructure/FormStructureThisNodesERCIncentives.vue'
import FormStructureThisNodesETHIncentives from '../addNodes/addFormTokenomicsStructure/FormStructureThisNodesETHIncentives.vue'
import { ref } from 'vue'
const props = defineProps({
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
import { BigNumber } from 'bignumber.js'
const setFormData = (val: any) => {
  formData.value = {
    ...formData.value,
    ...val,
  }
}

const setETHOtherFormData = (val: any) => {
  console.log(val, 'setETHOtherFormData')
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

const formRef = ref()
const FormStructureThisNodesInternalIncentivesRef = ref()

const emit = defineEmits(['setFormData'])
const setTokenomicsData = async () => {
  emit('setFormData', formData.value)
  const isErr =
    await FormStructureThisNodesInternalIncentivesRef.value.inputErr()
  return isErr
}
defineExpose({
  setTokenomicsData,
})
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
</style>
