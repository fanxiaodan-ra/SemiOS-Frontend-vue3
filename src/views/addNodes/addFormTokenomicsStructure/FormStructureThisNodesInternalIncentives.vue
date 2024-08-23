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
    <v-form ref="formRef">
      <FormRow :importance="false" :input-name="$t('AddFormTokenomicsStructure.erc721MintFeeLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.erc721MintFeeTip')">
        <!-- unifiedPriceMode is used in setupdao, unifiedPriceSet is used in edit onchain params -->
        <div v-if="!props.formDataProp.unifiedPriceMode && !props.formDataProp.unifiedPriceSet">
          <v-row no-gutters class="mint-price">
            {{ $t('AddFormTokenomicsStructure.floatingMintPriceLabel') }}</v-row>
          <v-row no-gutters>
            <v-col class="my-mgr12">
              <v-text-field
                :label="$t('AddFormTokenomicsStructure.builderFeeLabel')"
                density="comfortable"
                append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.builder"
                :error-messages="errorFloatingMessage"
                type="number"
                @update:modelValue="
                  setFloatingInput(
                    formData.daoPriceReserveRatio.builder,
                    'builder',
                    1,
                    0,
                    100
                  )
                  "
                 @change="inputFloatingErr">
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12">
              <v-text-field class="color-input-a" :label="$t('AddFormTokenomicsStructure.subNodesFeeLabel')"
                density="comfortable" append-inner-icon="mdi-percent-outline"
                v-model="formData.daoPriceReserveRatio.subDao" 
                :rules="[
                  (v:number) => v >= 0.1 || $t('common.dontLess', { num: 0.1 }),
                ]"
                type="number"
                @update:modelValue="
                  setFloatingInput(
                    formData.daoPriceReserveRatio.subDao,
                    'subDao',
                    1,
                    0.1,
                    100
                  )"
                :error-messages="errorFloatingMessage"
                @change="inputFloatingErr">
              </v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters v-if="!formDataProp.daoTokenMode && !formDataProp.thirdParty">
            <v-col class="my-mgr12">
              <v-text-field class="color-input-a" :label="$t('AddFormTokenomicsStructure.seedNodesFeeLabel')"
                density="comfortable" append-inner-icon="mdi-percent-outline"
                type="number"
                v-model="formData.daoPriceReserveRatio.mainDao" @update:modelValue="
        setFloatingInput(
          formData.daoPriceReserveRatio.mainDao,
          'mainDao',
          1,
          0,
          100
        )
        " :error-messages="errorFloatingMessage" @change="inputFloatingErr">
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12">
              <v-text-field :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')" density="comfortable"
                append-inner-icon="mdi-percent-outline" v-model="formData.daoPriceReserveRatio.pDao" disabled>
                <span class="old-fee">{{ t('AddFormTokenomicsStructure.oldFee') }}</span>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters v-else>
            <v-col class="my-mgr12">
              <v-text-field :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')" density="comfortable"
                append-inner-icon="mdi-percent-outline" v-model="formData.daoPriceReserveRatio.pDao" disabled>
                <span class="old-fee">{{ t('AddFormTokenomicsStructure.oldFee') }}</span>
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12"> </v-col>
          </v-row>
        </div>

        <v-row no-gutters class="mint-price">
          {{ $t('AddFormTokenomicsStructure.fixedMintPriceLabel') }}</v-row>
        <v-row no-gutters>
          <v-col class="my-mgr12">
            <v-text-field :label="$t('AddFormTokenomicsStructure.builderFeeLabel')" density="comfortable"
              append-inner-icon="mdi-percent-outline" v-model="formData.fixedPriceReserveRatio.builder"
              type="number"
              @update:modelValue="
        setFixedInput(
          formData.fixedPriceReserveRatio.builder,
          'builder',
          1,
          0,
          100
        )
        " :error-messages="errorFixedMessage" @change="inputFixedErr">
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12">
            <v-text-field class="color-input-a" :label="$t('AddFormTokenomicsStructure.subNodesFeeLabel')"
              density="comfortable" append-inner-icon="mdi-percent-outline"
              v-model="formData.fixedPriceReserveRatio.subDao"
              :rules="[
                  (v:number) => v >= 0.1 || $t('common.dontLess', { num: 0.1 }),
                ]"
              type="number"
              @update:modelValue="
              setFixedInput(
                formData.fixedPriceReserveRatio.subDao,
                'subDao',
                1,
                0.1,
                100
              )"
              :error-messages="errorFixedMessage"
              @change="inputFixedErr"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters v-if="!formDataProp.daoTokenMode && !formDataProp.thirdParty">
          <v-col class="my-mgr12">
            <v-text-field
              class="color-input-a"
              :label="$t('AddFormTokenomicsStructure.seedNodesFeeLabel')"
              density="comfortable" append-inner-icon="mdi-percent-outline"
              type="number"
              v-model="formData.fixedPriceReserveRatio.mainDao"
              @update:modelValue="
                setFixedInput(
                  formData.fixedPriceReserveRatio.mainDao,
                  'mainDao',
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
            <v-text-field :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')" density="comfortable"
              append-inner-icon="mdi-percent-outline" v-model="formData.fixedPriceReserveRatio.pDao" disabled>
              <span class="old-fee">{{ t('AddFormTokenomicsStructure.oldFee') }}</span>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters v-else>
          <v-col class="my-mgr12">
            <v-text-field :label="$t('AddFormTokenomicsStructure.semiosFeeLabel')" density="comfortable"
              append-inner-icon="mdi-percent-outline" v-model="formData.fixedPriceReserveRatio.pDao" disabled>
              <span class="old-fee">{{ t('AddFormTokenomicsStructure.oldFee') }}</span>
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
import { t } from '@/lang'

const DEFAULT_DAO_PRICE_RESERVE_RATIO = {
  builder: 0,
  mainDao: 97.5,
  pDao: 0,
  subDao: 2.5,
}
const DEFAULT_FIXED_PRICE_RESERVE_RATIO = {
  builder: 0,
  mainDao: 97.5,
  pDao: 0,
  subDao: 2.5,
}

const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => { },
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const setMainDaoAndBuilder = (cur: boolean, old: boolean) => {
  if (cur !== old) {
    formData.fixedPriceReserveRatio.mainDao = cur ? 0 : 97.5
    formData.fixedPriceReserveRatio.builder = cur ? 97.5 : 0
    formData.fixedPriceReserveRatio.subDao = 2.5
    formData.daoPriceReserveRatio.mainDao = cur ? 0 : 97.5
    formData.daoPriceReserveRatio.builder = cur ? 97.5 : 0
    formData.daoPriceReserveRatio.subDao = 2.5
  }
}
watch(
  () => props.formDataProp.thirdParty,
  setMainDaoAndBuilder
)

watch(
  () => props.formDataProp.daoTokenMode,
  setMainDaoAndBuilder
)

const formRef = ref()

const formData = reactive({
  daoPriceReserveRatio: props.formDataProp.daoPriceReserveRatio || DEFAULT_DAO_PRICE_RESERVE_RATIO,
  fixedPriceReserveRatio: props.formDataProp.fixedPriceReserveRatio || DEFAULT_FIXED_PRICE_RESERVE_RATIO,
})

watch(() => [
  props.formDataProp.daoPriceReserveRatio,
  props.formDataProp.fixedPriceReserveRatio,
], ([daoPriceReserveRatio, fixedPriceReserveRatio]) => {
  if (!props.isEdit) {
    formData.daoPriceReserveRatio = daoPriceReserveRatio
    formData.fixedPriceReserveRatio = fixedPriceReserveRatio
  }
}, { deep: true })

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
  Object.assign(formData.daoPriceReserveRatio, { [type]: inputNum })
}

const errorFloatingMessage = ref<string[]>([])
const inputFloatingErr = () => {
  const num = plusOthers(
    formData.daoPriceReserveRatio.builder,
    formData.daoPriceReserveRatio.mainDao,
    formData.daoPriceReserveRatio.pDao,
    formData.daoPriceReserveRatio.subDao
  )
  if (num !== 100) {
    errorFloatingMessage.value = ['The sum must equal 100%']
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
  Object.assign(formData.fixedPriceReserveRatio, { [type]: inputNum })
}

const errorFixedMessage = ref<string[]>([])
const inputFixedErr = () => {
  const num = plusOthers(
    formData.fixedPriceReserveRatio.builder,
    formData.fixedPriceReserveRatio.mainDao,
    formData.fixedPriceReserveRatio.pDao,
    formData.fixedPriceReserveRatio.subDao
  )
  if (num !== 100) {
    errorFixedMessage.value = [t('common.sumMustEqual100')]
    return false
  } else {
    errorFixedMessage.value = []
    return true
  }
}

onMounted(() => {
  if (!props.isEdit) {
    if (props.formDataProp.thirdParty) {
      formData.daoPriceReserveRatio.mainDao = 0
      formData.daoPriceReserveRatio.subDao = 100
      formData.fixedPriceReserveRatio.mainDao = 0
      formData.fixedPriceReserveRatio.subDao = 100
    }
  } else {
    formData.daoPriceReserveRatio.builder =
      props.formDataProp.unFixedReserveRatio.canvasMintFee
    formData.daoPriceReserveRatio.mainDao =
      props.formDataProp.unFixedReserveRatio.redeemPoolMintFee
    formData.daoPriceReserveRatio.pDao =
      props.formDataProp.unFixedReserveRatio.d4aMintFee
    formData.daoPriceReserveRatio.subDao =
      props.formDataProp.unFixedReserveRatio.daoMintFee
    formData.fixedPriceReserveRatio.builder =
      props.formDataProp.fixedReserveRatio.canvasMintFee
    formData.fixedPriceReserveRatio.mainDao =
      props.formDataProp.fixedReserveRatio.redeemPoolMintFee
    formData.fixedPriceReserveRatio.pDao =
      props.formDataProp.fixedReserveRatio.d4aMintFee
    formData.fixedPriceReserveRatio.subDao =
      props.formDataProp.fixedReserveRatio.daoMintFee
  }
})
const inputErr = async () => {
  const { valid } = await formRef.value.validate()
  return inputFloatingErr() && inputFixedErr() && valid
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
