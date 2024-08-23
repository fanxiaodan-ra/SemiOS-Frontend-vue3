<template>
  <div>
    <v-form ref="formRef">
      <FormRow
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.ethIncentivesLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.ethIncentivesTip')"
      >
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.builderLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.eth.builder"
              @update:modelValue="
                setInput(
                  formData.eth.builder,
                  'builder',
                  1,
                  0,
                  100 - formData.eth.pDao
                )
              "
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12 col-color">
            <v-text-field
              class="color-input-a"
              :label="$t('AddFormTokenomicsStructure.minterLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.eth.minter"
              type="number"
              @update:modelValue="
                setInput(
                  formData.eth.minter,
                  'minter',
                  1,
                  0,
                  100 - formData.eth.pDao
                )
              "
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.starterLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.eth.subDao"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12 col-color">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.semiosLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.eth.pDao"
              disabled
            >
              <span class="old-fee">{{ t('AddFormTokenomicsStructure.oldFee') }}</span>
            </v-text-field>
          </v-col>
        </v-row>
      </FormRow>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { reactive, onMounted, watch } from 'vue'
import { t } from '@/lang'

const DEFAULT_ETH = { pDao: 0, subDao: 50, builder: 25, minter: 25 }

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  formDataProp: {
    type: Object,
    default: () => {},
  },
})
const formData = reactive({
  eth: props.formDataProp.eth || DEFAULT_ETH
})
const emit = defineEmits(['setFormData'])
watch(
  () => formData,
  (value) => {
    emit('setFormData', value)
  },
  { deep: true }
)

watch(
  () => props.formDataProp.eth,
  (value) => {
    formData.eth = value
  },
  { deep: true }
)

import { oninputNum, minusOthers, plusOthers } from '@/utils'
const setInput = (
  val: string | number,
  type: keyof typeof formData.eth,
  position = 0,
  min = 0,
  max = Infinity
) => {
  formData.eth[type] = Number(oninputNum(val, position, min, max))
  if (type === 'builder') {
    if (formData.eth.builder >= 100 - formData.eth.pDao) {
      formData.eth.subDao = 0
      formData.eth.minter = 0
    } else {
      const addTop = plusOthers(formData.eth.builder, formData.eth.minter)
      if (addTop >= 100 - formData.eth.pDao) {
        formData.eth.minter = minusOthers(
          100 - formData.eth.pDao,
          formData.eth.builder
        )
        formData.eth.subDao = 0
      } else {
        formData.eth.subDao = minusOthers(
          100 - formData.eth.pDao,
          formData.eth.builder,
          formData.eth.minter
        )
      }
    }
  }

  if (type === 'minter') {
    if (formData.eth.minter >= 100 - formData.eth.pDao) {
      formData.eth.subDao = 0
      formData.eth.builder = 0
    } else {
      const addTop = plusOthers(formData.eth.builder, formData.eth.minter)
      if (addTop >= 100 - formData.eth.pDao) {
        formData.eth.builder = minusOthers(
          100 - formData.eth.pDao,
          formData.eth.minter
        )
        formData.eth.subDao = 0
      } else {
        formData.eth.subDao = minusOthers(
          100 - formData.eth.pDao,
          formData.eth.builder,
          formData.eth.minter
        )
      }
    }
  }
}
onMounted(() => {
  // emit('setFormData', formData)
  if (props.isEdit) {
    formData.eth = {
      pDao: props.formDataProp.daoEthRoyaltyToken.d4aReward,
      subDao: props.formDataProp.daoEthRoyaltyToken.daoCreatorETHReward,
      builder: props.formDataProp.daoEthRoyaltyToken.canvasCreatorETHReward,
      minter: props.formDataProp.daoEthRoyaltyToken.minterETHReward,
    }
  }
})
</script>

<style lang="scss" scoped>
.col-color {
  :deep(.v-field__input) {
    color: #ece76d;
  }
}
</style>
