<template>
  <v-card
    class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24"
    elevation="12"
  >
    <h3 class="node-name" v-if="store.addNodeType === 6">
      {{ $t('AddFormWork.title') }}
    </h3>
    <v-form ref="formRef">
      <FormRow
        :input-name="$t('AddFormWork.needMintableWorkLabel')"
        :importance="false"
        :tooltip-text="$t('AddFormWork.needMintableWorkTip')"
      >
        <v-switch
          v-model="formData.needMintableWork"
          inset
          color="#8C91FF"
        ></v-switch>
      </FormRow>
      <v-expand-transition>
        <FormRow
          :input-name="$t('AddFormWork.passesQuantityLabel')"
          :is-icon="false"
          v-if="formData.needMintableWork"
        >
          <v-text-field
            :label="$t('AddFormWork.passesQuantityPlaceholder')"
            density="comfortable"
            type="number"
            v-model="formData.passesQuantity"
            @update:modelValue="
              setInput(formData.passesQuantity, 'passesQuantity', 0, 1, 5000)
            "
          >
          </v-text-field>
        </FormRow>
      </v-expand-transition>
      <v-expand-transition>
        <FormRow
          v-if="!props.formDataProp.topUpMode"
          :importance="false"
          :input-name="$t('AddFormWork.daoTokenModeLabel')"
          :tooltip-text="$t('AddFormWork.daoTokenModeTip')"
        >
          <v-switch
            v-model="formData.daoTokenMode"
            color="#8C91FF"
            inset
          ></v-switch>
        </FormRow>
      </v-expand-transition>
      <FormRow
        :importance="false"
        :input-name="$t('AddFormWork.unifiedPriceModeLabel')"
        :tooltip-text="$t('AddFormWork.unifiedPriceModeTip')"
      >
        <v-switch
          v-model="formData.unifiedPriceMode"
          inset
          color="#8C91FF"
        ></v-switch>
      </FormRow>
      <v-expand-transition>
        <FormRow
          v-if="formData.unifiedPriceMode"
          :input-name="$t('AddFormWork.unifiedPriceLabel')"
          :tooltip-text="$t('AddFormWork.unifiedPriceTip')"
        >
          <v-text-field
            type="number"
            :label="$t('AddFormWork.unifiedPricePlaceholder')"
            density="comfortable"
            v-model="formData.unifiedPrice"
            @update:modelValue="
              setInput(formData.unifiedPrice, 'unifiedPrice', 4, 0, 1000000000)
            "
          >
          </v-text-field>
          <div class="poricemsg" v-if="formData.unifiedPrice === 0">
            {{ $t('AddFormWork.unifiedPriceWarn') }}
          </div>
        </FormRow>
      </v-expand-transition>
      <v-expand-transition>
        <div v-if="!formData.unifiedPriceMode">
          <FormRow
            :input-name="$t('AddFormWork.daoFloorPriceLabel')"
            :tooltip-text="$t('AddFormWork.daoFloorPriceTip')"
          >
            <v-text-field
              :label="$t('PleaseEnterLabel')"
              density="comfortable"
              type="number"
              v-model="formData.daoFloorPrice"
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
              type="number"
              v-model="formData.doublingFactor"
              :rules="[(v: any) => v >= 1 || $t('common.dontLess', { num: '1' })]"
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
      </v-expand-transition>
    </v-form>
    <div class="dflex flex-jc my-mgb24 my-mgt24" v-if="store.addNodeType !== 6">
      <v-btn
        block
        class="btnb fc7 text-none mr-10"
        type="submit"
        @click="setAddType(2)"
        >{{ t('common.back') }}</v-btn
      >
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="setAddType(4)"
        >{{ t('common.next') }}</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { ref, watch } from 'vue'
import useUserStore from '@/store'
import { t } from '@/lang'
const store = useUserStore()
const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => {},
  },
})
const fluctuationMethods = [
  { label: t('AddFormWork.exponentialIncrease'), value: 0 },
  { label: t('AddFormWork.linearIncrease'), value: 1 },
]
const formData = ref({
  needMintableWork: false,
  passesQuantity: 1000,
  daoTokenMode: false,
  daoFloorPrice: 0.0001,
  unifiedPriceMode: false,
  unifiedPrice: 0.01,
  fluctuationMethod: 0,
  doublingFactor: 2,
  growthFactor: 0.1,
}) as any

const emit = defineEmits(['setFormData'])

watch(
  () => [
    props.formDataProp.needMintableWork,
    props.formDataProp.passesQuantity,
    props.formDataProp.daoTokenMode,
    props.formDataProp.daoFloorPrice,
    props.formDataProp.unifiedPriceMode,
    props.formDataProp.unifiedPrice,
    props.formDataProp.fluctuationMethod,
    props.formDataProp.doublingFactor,
    props.formDataProp.growthFactor,
  ],
  ([
    needMintableWork,
    passesQuantity,
    daoTokenMode,
    daoFloorPrice,
    unifiedPriceMode,
    unifiedPrice,
    fluctuationMethod,
    doublingFactor,
    growthFactor,
  ]) => {
    formData.value.needMintableWork = needMintableWork
    formData.value.passesQuantity = passesQuantity
    formData.value.daoTokenMode = daoTokenMode
    formData.value.daoFloorPrice = daoFloorPrice
    formData.value.unifiedPriceMode = unifiedPriceMode
    formData.value.unifiedPrice = unifiedPrice
    formData.value.fluctuationMethod = fluctuationMethod
    formData.value.doublingFactor = doublingFactor
    formData.value.growthFactor = growthFactor
  },
  { deep: true }
)

const validateForm = async (value: any) => {
  if (!formRef.value) return

  const { valid } = await formRef.value.validate()
  emit('setFormData', {
    formVal: value,
    validVal: {
      position: 2,
      value: valid,
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
import { oninputNum } from '@/utils'

const setInput = (
  val: string | number,
  type: keyof typeof formData,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  formData.value[type] = inputNum as never
}

const formRef = ref()

const setAddType = async (val: number) => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  store.setNodeType(val)
  window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped>
.poricemsg {
  font-size: 0.75rem;
  color: #745cd4;
  margin-bottom: 0.375rem;
  margin-top: -18px;
}
</style>
