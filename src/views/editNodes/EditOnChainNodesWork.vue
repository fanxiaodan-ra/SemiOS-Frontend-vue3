<template>
  <v-card class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24 bg-card-1" elevation="12">
    <h3 class="node-name">
      {{ $t('AddFormWork.title') }}
    </h3>
    <v-form ref="formRef">
      <FormRow
        v-if="formData.unifiedPriceMode && formData.unifiedPrice !== 0"
        :input-name="$t('AddFormWork.unifiedPriceLabel')"
        :tooltip-text="$t('AddFormWork.unifiedPriceTip')"
      >
        <v-text-field
          :label="$t('AddFormWork.unifiedPricePlaceholder')"
          density="comfortable"
          v-model="formData.unifiedPrice"
          type="number"
          @update:modelValue="
            setInput(formData.unifiedPrice, 'unifiedPrice', 4, 0, 999999999)
          "
          :messages="
            formData.unifiedPrice === 0
              ? [$t('AddFormWork.unifiedPriceWarn')]
              : undefined
          "
        >
        </v-text-field>
      </FormRow>
      <div v-if="!formData.unifiedPriceMode">
        <FormRow
          :input-name="$t('AddFormWork.daoFloorPriceLabel')"
          :tooltip-text="$t('AddFormWork.daoFloorPriceTip')"
        >
          <v-text-field
            :label="$t('PleaseEnterLabel')"
            density="comfortable"
            v-model="formData.daoFloorPrice"
            type="number"
            :rules="[(v: any) => v >= 0.0001 || $t('common.dontLess', { num: '0.0001' })]"
            @update:modelValue="
              setInput(
                formData.daoFloorPrice,
                'daoFloorPrice',
                4,
                0.0001,
                999999999
              )
            "
          >
          </v-text-field>
        </FormRow>
        <FormRow
          :input-name="$t('AddFormWork.fluctuationMethodLabel')"
          :tooltip-text="$t('AddFormWork.fluctuationMethodTip')"
        >
          <v-select
            v-model="formData.fluctuationMethod"
            label="Select"
            :items="fluctuationMethods"
            item-title="label"
            item-value="value"
          ></v-select>
        </FormRow>
        <FormRow
          v-if="formData.fluctuationMethod === 0"
          :input-name="$t('AddFormWork.doublingFactorLabel')"
          :tooltip-text="$t('AddFormWork.doublingFactorTip')"
        >
          <v-text-field
            :label="$t('PleaseEnterLabel')"
            density="comfortable"
            v-model="formData.doublingFactor"
            type="number"
            @update:modelValue="
              setInput(
                formData.doublingFactor,
                'doublingFactor',
                1,
                1,
                999999999
              )
            "
          >
          </v-text-field>
        </FormRow>
        <FormRow
          v-if="formData.fluctuationMethod === 1"
          :input-name="$t('AddFormWork.growthFactorLabel')"
          :tooltip-text="$t('AddFormWork.growthFactorTip')"
        >
          <v-text-field
            :label="$t('PleaseEnterLabel')"
            density="comfortable"
            type="number"
            v-model="formData.growthFactor"
            @update:modelValue="
              setInput(formData.growthFactor, 'growthFactor', 1, 0, 999999999)
            "
          >
          </v-text-field>
        </FormRow>
      </div>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { ref, reactive, onMounted } from 'vue'
const props = defineProps({
  initData: {
    type: Object,
    default: () => {},
  },
})
const fluctuationMethods = [
  { label: 'Exponential Increase', value: 0 },
  { label: 'Linear Increase', value: 1 },
]
const formData = reactive({
  daoFloorPrice: 0.0001,
  unifiedPrice: 0.01,
  fluctuationMethod: 0,
  doublingFactor: 2,
  growthFactor: 0.1,
  unifiedPriceMode: false,
})
const emit = defineEmits(['setFormData'])

import { oninputNum } from '@/utils'

const setInput = (
  val: string | number,
  type: keyof typeof formData,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  formData[type] = inputNum as never
}

const formRef = ref()

const setFormWork = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  emit('setFormData', formData)
  return true
}
defineExpose({
  setFormWork,
})

import { BigNumber } from 'bignumber.js'
onMounted(() => {
  formData.unifiedPriceMode = props.initData.unifiedPriceSet
  formData.unifiedPrice = props.initData.unifiedPrice
  formData.daoFloorPrice = props.initData.daoFloorPrice
  formData.fluctuationMethod = props.initData.canvasPriceFluctuationMethod
  formData.doublingFactor =
    props.initData.canvasPriceFluctuationMethod === 0
      ? new BigNumber(props.initData.fluctuationMethodFactor)
          .div(10000)
          .toNumber()
      : 2
  formData.growthFactor =
    props.initData.canvasPriceFluctuationMethod === 1
      ? new BigNumber(props.initData.fluctuationMethodFactor)
          .div(props.initData.decimalsNum)
          .toNumber()
      : 0.1
  console.log(formData, 'formDataformDataformDataformDataformData')
})
</script>
