<template>
  <div>
    <v-form ref="formRef">
      <h4 class="ftr my-mgb24">
        {{ $t('AddFormTokenomicsStructure.nodeLevelLabel') }}
        <i class="iconfont icon-info">
          <v-tooltip activator="parent" location="top" max-width="300">
            {{ $t('AddFormTokenomicsStructure.nodeLevelTip') }}
          </v-tooltip>
        </i>
      </h4>
      <FormRow
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.ethAllocationLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.ethAllocationTip')"
        v-if="!props.formDataProp.thirdParty"
      >
        <v-row no-gutters>
          <v-col class="my-mgr12">
            <v-text-field
              :label="
                $t('AddFormTokenomicsStructure.redeemPoolRatioETHPlaceholder')
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.redeemPoolRatioETH"
              type="number"
              @update:modelValue="
                setETHInput(
                  formData.redeemPoolRatioETH,
                  'redeemPoolRatioETH',
                  1,
                  0,
                  100
                )
              "
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12 col-color-a">
            <v-text-field
              class="color-input-a"
              :label="
                $t('AddFormTokenomicsStructure.selfRewardRatioETHPlaceholder')
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.selfRewardRatioETH"
              type="number"
              @update:modelValue="
                setETHInput(
                  formData.selfRewardRatioETH,
                  'selfRewardRatioETH',
                  1,
                  0,
                  100
                )
              "
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="my-mgr12">
            <v-text-field
              :label="
                $t(
                  'AddFormTokenomicsStructure.nodesReservesRatioETHPlaceholder'
                )
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.nodesReservesRatioETH"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12 col-color-e">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.ETHOtherNodesPlaceholder')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.ETHOtherNodes"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
      </FormRow>
      <FormRow
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.ethAllocationLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.ethAllocationTip')"
        v-else
      >
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color-a">
            <v-text-field
              class="color-input-a"
              :label="
                $t('AddFormTokenomicsStructure.selfRewardRatioETHPlaceholder')
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.selfRewardRatioETH"
              type="number"
              @update:modelValue="
                setETHInput(
                  formData.selfRewardRatioETH,
                  'selfRewardRatioETH',
                  1,
                  0,
                  100
                )
              "
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12">
            <v-text-field
              :label="
                $t(
                  'AddFormTokenomicsStructure.nodesReservesRatioETHPlaceholder'
                )
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.nodesReservesRatioETH"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color-e">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.ETHOtherNodesPlaceholder')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.ETHOtherNodes"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12"> </v-col>
        </v-row>
      </FormRow>
      <FormRow
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.erc20AllocationLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.erc20AllocationTip')"
      >
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color-c">
            <v-text-field
              :label="
                $t('AddFormTokenomicsStructure.selfRewardRatioERC20Placeholder')
              "
              density="comfortable"
              type="number"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.selfRewardRatioERC20"
              @update:modelValue="
                setERCInput(formData.selfRewardRatioERC20, 1, 0, 100)
              "
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12">
            <v-text-field
              :label="
                $t(
                  'AddFormTokenomicsStructure.nodesReservesRatioERC20Placeholder'
                )
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.nodesReservesRatioERC20"
              disabled
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color-f">
            <v-text-field
              :label="
                $t('AddFormTokenomicsStructure.ERC20OtherNodesPlaceholder')
              "
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.ERC20OtherNodes"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12"> </v-col>
        </v-row>
      </FormRow>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { reactive, watch, onMounted } from 'vue'
const props = defineProps({
  formInput: {
    type: Object,
    default: () => {},
  },
  formDataProp: {
    type: Object,
    default: () => {},
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})
const formData = reactive({
  selfRewardRatioERC20: 0,
  nodesReservesRatioERC20: 100,
  ERC20OtherNodes: 0,
  redeemPoolRatioETH: 100,
  selfRewardRatioETH: 0,
  nodesReservesRatioETH: 0,
  ETHOtherNodes: 0,
})
import { oninputNum, minusOthers } from '@/utils'
watch(
  () => props.formDataProp.thirdParty,
  (value) => {
    formData.redeemPoolRatioETH = value ? 0 : 100
    formData.nodesReservesRatioETH = value ? 100 : 0
  }
)

watch(
  () => props.formInput.ETHOtherNodes,
  (value) => {
    formData.ETHOtherNodes = value
    formData.nodesReservesRatioETH = minusOthers(
      100,
      formData.redeemPoolRatioETH,
      formData.selfRewardRatioETH,
      formData.ETHOtherNodes
    )
  }
)
watch(
  () => props.formInput.ERC20OtherNodes,
  (value) => {
    formData.ERC20OtherNodes = value
    formData.nodesReservesRatioERC20 = minusOthers(
      100,
      formData.selfRewardRatioERC20,
      formData.ERC20OtherNodes
    )
  }
)
watch(
  () => formData,
  (value) => {
    emit('setFormData', value)
  },
  { deep: true }
)
import { BigNumber } from 'bignumber.js'

const setERCInput = (
  val: string | number,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  // const strNum = formData.ERC20OtherNodes
  const letNum = minusOthers(100, formData.ERC20OtherNodes)
  if (new BigNumber(inputNum).gt(letNum)) {
    formData.selfRewardRatioERC20 = letNum
    formData.nodesReservesRatioERC20 = 0
  } else {
    formData.selfRewardRatioERC20 = Number(inputNum)
    formData.nodesReservesRatioERC20 = minusOthers(letNum, Number(inputNum))
  }
}
const setETHInput = (
  val: string | number,
  type: keyof typeof formData,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  if (type === 'redeemPoolRatioETH') {
    const letNum = minusOthers(
      100,
      formData.ETHOtherNodes,
      formData.selfRewardRatioETH
    )
    if (new BigNumber(inputNum).gt(letNum)) {
      formData.redeemPoolRatioETH = letNum
      formData.nodesReservesRatioETH = 0
    } else {
      formData.redeemPoolRatioETH = Number(inputNum)
      formData.nodesReservesRatioETH = minusOthers(letNum, Number(inputNum))
    }
  }

  if (type === 'selfRewardRatioETH') {
    const letNum = minusOthers(
      100,
      formData.ETHOtherNodes,
      formData.redeemPoolRatioETH
    )
    if (new BigNumber(inputNum).gt(letNum)) {
      formData.selfRewardRatioETH = letNum
      formData.nodesReservesRatioETH = 0
    } else {
      formData.selfRewardRatioETH = Number(inputNum)
      formData.nodesReservesRatioETH = minusOthers(letNum, Number(inputNum))
    }
  }
}
const emit = defineEmits(['setFormData'])
onMounted(() => {
  if (!props.isEdit) {
    formData.redeemPoolRatioETH = props.formDataProp.thirdParty ? 0 : 100
    formData.nodesReservesRatioETH = props.formDataProp.thirdParty ? 100 : 0
    emit('setFormData', formData)
  } else {
    formData.redeemPoolRatioETH = props.formDataProp.ethAllocation[0]
    formData.selfRewardRatioETH = props.formDataProp.ethAllocation[1]
    formData.nodesReservesRatioETH = props.formDataProp.ethAllocation[2]
    formData.ETHOtherNodes =
      100 -
      formData.redeemPoolRatioETH -
      formData.selfRewardRatioETH -
      formData.nodesReservesRatioETH
    formData.selfRewardRatioERC20 = props.formDataProp.daoAllocation[0]
    formData.nodesReservesRatioERC20 = props.formDataProp.daoAllocation[1]
    formData.ERC20OtherNodes =
      100 - formData.selfRewardRatioERC20 - formData.nodesReservesRatioERC20
  }
})
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
.col-color-a {
  :deep(.v-field__input) {
    color: #a8e21e;
  }
}
.col-color-e {
  :deep(.v-field__input) {
    color: #ef8c44;
  }
}
.col-color-f {
  :deep(.v-field__input) {
    color: #f282be;
  }
}
.col-color-c {
  :deep(.v-field__input) {
    color: #ece76d;
  }
}
</style>
