<template>
  <div>
    <h4 class="ftr my-mgb24">
      {{ $t('AddFormTokenomicsStructure.thisNodesInternalIncentivesLaabel') }}
      <i class="iconfont icon-info">
        <v-tooltip activator="parent" location="top" max-width="300">
          {{ $t('AddFormTokenomicsStructure.thisNodesInternalIncentivesTip') }}
        </v-tooltip>
      </i>
    </h4>
    <v-form ref="form721Ref">
      <FormRow
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.erc721MintFeeLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.erc721MintFeeTip')"
      >
        <div v-if="!props.formDataProp.unifiedPriceMode">
          <v-row no-gutters class="mint-price">
            {{ $t('AddFormTokenomicsStructure.floatingMintPriceLabel') }}</v-row
          >
          <v-row no-gutters>
            <v-col class="my-mgr12">
              <v-text-field
                :label="$t('AddFormTokenomicsStructure.builderFeeLabel')"
                density="comfortable"
                append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.builder"
                @update:modelValue="
                  setFloatingInput(
                    formData.daoPriceReserveRatio.builder,
                    'builder',
                    1,
                    0,
                    100
                  )
                "
                :error-messages="errorFloatingMessage"
                @change="inputFloatingErr"
              >
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12">
              <v-text-field
                class="color-input-a"
                :label="$t('AddFormTokenomicsStructure.subNodesFeeLabel')"
                density="comfortable"
                append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.subDAO"
                @update:modelValue="
                  setFloatingInput(
                    formData.daoPriceReserveRatio.subDAO,
                    'subDAO',
                    1,
                    0,
                    100
                  )
                "
                :error-messages="errorFloatingMessage"
                @change="inputFloatingErr"
              >
              </v-text-field>
            </v-col>
          </v-row>

          <v-row
            no-gutters
            v-if="!formDataProp.daoTokenMode && !formDataProp.thirdParty"
          >
            <v-col class="my-mgr12">
              <v-text-field
                class="color-input-a"
                :label="$t('AddFormTokenomicsStructure.seedNodesFeeLabel')"
                density="comfortable"
                append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.mainDAO"
                @update:modelValue="
                  setFloatingInput(
                    formData.daoPriceReserveRatio.mainDAO,
                    'mainDAO',
                    1,
                    0,
                    100
                  )
                "
                :error-messages="errorFloatingMessage"
                @change="inputFloatingErr"
              >
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12">
              <v-text-field
                :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')"
                density="comfortable"
                append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.pDao"
                disabled
              >
                <span class="old-fee">2.5</span>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters v-else>
            <v-col class="my-mgr12">
              <v-text-field
                :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')"
                density="comfortable"
                append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.pDao"
                disabled
              >
                <span class="old-fee">2.5</span>
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12"> </v-col>
          </v-row>
        </div>

        <v-row no-gutters class="mint-price">
          {{ $t('AddFormTokenomicsStructure.fixedMintPriceLabel') }}</v-row
        >
        <v-row no-gutters>
          <v-col class="my-mgr12">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.builderFeeLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.fixedPriceReserveRatio.builder"
              @update:modelValue="
                setFixedInput(
                  formData.fixedPriceReserveRatio.builder,
                  'builder',
                  1,
                  0,
                  100
                )
              "
              :error-messages="errorFixedMessage"
              @change="inputFixedErr"
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12">
            <v-text-field
              class="color-input-a"
              :label="$t('AddFormTokenomicsStructure.subNodesFeeLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.fixedPriceReserveRatio.subDAO"
              @update:modelValue="
                setFixedInput(
                  formData.fixedPriceReserveRatio.subDAO,
                  'subDAO',
                  1,
                  0,
                  100
                )
              "
              :error-messages="errorFixedMessage"
              @change="inputFixedErr"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row
          no-gutters
          v-if="!formDataProp.daoTokenMode && !formDataProp.thirdParty"
        >
          <v-col class="my-mgr12">
            <v-text-field
              class="color-input-a"
              :label="$t('AddFormTokenomicsStructure.seedNodesFeeLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.fixedPriceReserveRatio.mainDAO"
              @update:modelValue="
                setFixedInput(
                  formData.fixedPriceReserveRatio.mainDAO,
                  'mainDAO',
                  1,
                  0,
                  100
                )
              "
              :error-messages="errorFixedMessage"
              @change="inputFixedErr"
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.fixedPriceReserveRatio.pDao"
              disabled
            >
              <span class="old-fee">2.5</span>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters v-else>
          <v-col class="my-mgr12">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.fixedPriceReserveRatio.pDao"
              disabled
            >
              <span class="old-fee">2.5</span>
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
import { reactive, ref, onMounted, watch } from 'vue'
const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => {},
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})
// watch(
//   () => [props.formDataProp.thirdParty, props.formDataProp.daoTokenMode],
//   (cur, old) => {
//     if (cur[0] !== old[0] || cur[1] !== old[1]) {

//     }
//     console.log(cur, old, 'value', cur === old)
//     // if (value.includes(true)) {

//     // }
//     // formData.daoPriceReserveRatio.mainDAO = value.includes(true) ? 0 : 95
//     // formData.daoPriceReserveRatio.subDAO = value.includes(true) ? 97.5 : 2.5
//     // formData.fixedPriceReserveRatio.mainDAO = value.includes(true) ? 0 : 95
//     // formData.fixedPriceReserveRatio.subDAO = value.includes(true) ? 97.5 : 2.5
//     console.log(formData, 'formDataformDataformData')
//   }
// )
watch(
  () => props.formDataProp.thirdParty,
  (cur, old) => {
    if (cur !== old) {
      formData.daoPriceReserveRatio.mainDAO = cur ? 0 : 100
      formData.daoPriceReserveRatio.subDAO = cur ? 100 : 0
      formData.fixedPriceReserveRatio.mainDAO = cur ? 0 : 100
      formData.fixedPriceReserveRatio.subDAO = cur ? 100 : 0
    }
  }
)
// watch(
//   () => props.formDataProp.daoTokenMode,
//   (cur, old) => {
//     if (cur !== old) {
//       formData.daoPriceReserveRatio.mainDAO = cur ? 0 : 95
//       formData.daoPriceReserveRatio.subDAO = cur ? 97.5 : 2.5
//       formData.fixedPriceReserveRatio.mainDAO = cur ? 0 : 95
//       formData.fixedPriceReserveRatio.subDAO = cur ? 97.5 : 2.5
//     }
//   }
// )
const formData = reactive({
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
})

const emit = defineEmits(['setFormData'])
watch(
  () => formData,
  (value) => {
    emit('setFormData', value)
  },
  { deep: true }
)
import { oninputNum, plusOthers } from '@/utils'
const setFloatingInput = (
  val: string | number,
  type: keyof typeof formData.daoPriceReserveRatio,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  formData.daoPriceReserveRatio[type] = inputNum
}

const errorFloatingMessage = ref<string[]>([])
const inputFloatingErr = () => {
  const num = plusOthers(
    formData.daoPriceReserveRatio.builder,
    formData.daoPriceReserveRatio.mainDAO,
    formData.daoPriceReserveRatio.pDao,
    formData.daoPriceReserveRatio.subDAO
  )
  console.log(num, 'num')
  if (num !== 100) {
    errorFloatingMessage.value = ['The sum cannot exceed 100%']
    return false
  } else {
    errorFloatingMessage.value = []
    return true
  }
}

const setFixedInput = (
  val: string | number,
  type: keyof typeof formData.fixedPriceReserveRatio,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  console.log(inputNum, 'inputNum')
  formData.fixedPriceReserveRatio[type] = inputNum
  console.log(
    formData.fixedPriceReserveRatio[type],
    'formData.fixedPriceReserveRatio[type]',
    type
  )
}

const errorFixedMessage = ref<string[]>([])
const inputFixedErr = () => {
  const num = plusOthers(
    formData.fixedPriceReserveRatio.builder,
    formData.fixedPriceReserveRatio.mainDAO,
    formData.fixedPriceReserveRatio.pDao,
    formData.fixedPriceReserveRatio.subDAO
  )
  console.log(num, 'num')
  if (num !== 100) {
    errorFixedMessage.value = ['The sum cannot exceed 100%']
    return false
  } else {
    errorFixedMessage.value = []
    return true
  }
}

onMounted(() => {
  if (!props.isEdit) {
    if (props.formDataProp.thirdParty) {
      formData.daoPriceReserveRatio.mainDAO = 0
      formData.daoPriceReserveRatio.subDAO = 100
      formData.fixedPriceReserveRatio.mainDAO = 0
      formData.fixedPriceReserveRatio.subDAO = 100
    }
  } else {
    formData.daoPriceReserveRatio.builder =
      props.formDataProp.unFixedReserveRatio.canvasMintFee
    formData.daoPriceReserveRatio.mainDAO =
      props.formDataProp.unFixedReserveRatio.redeemPoolMintFee
    formData.daoPriceReserveRatio.pDao =
      props.formDataProp.unFixedReserveRatio.d4aMintFee
    formData.daoPriceReserveRatio.subDAO =
      props.formDataProp.unFixedReserveRatio.daoMintFee
    formData.fixedPriceReserveRatio.builder =
      props.formDataProp.fixedReserveRatio.canvasMintFee
    formData.fixedPriceReserveRatio.mainDAO =
      props.formDataProp.fixedReserveRatio.redeemPoolMintFee
    formData.fixedPriceReserveRatio.pDao =
      props.formDataProp.fixedReserveRatio.d4aMintFee
    formData.fixedPriceReserveRatio.subDAO =
      props.formDataProp.fixedReserveRatio.daoMintFee
  }
})
const inputErr = () => {
  return inputFloatingErr() && inputFixedErr()
}
defineExpose({
  inputErr,
})
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
.mint-price {
  height: 56px;
  display: flex;
  align-items: center;
  color: #9e9e9e;
}
</style>
