<template>
  <div>
    <v-form ref="formRef">
      <FormRow
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.erc20IncentivesLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.erc20IncentivesTip')"
      >
        <v-row no-gutters>
          <v-col class="my-mgr12 col-color">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.builderLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.royalty.builder"
              type="number"
              @update:modelValue="
                setInput(
                  formData.royalty.builder,
                  'builder',
                  1,
                  0,
                  100 - formData.royalty.pDao
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
              v-model="formData.royalty.minter"
              type="number"
              @update:modelValue="
                setInput(
                  formData.royalty.minter,
                  'minter',
                  1,
                  0,
                  100 - formData.royalty.pDao
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
              v-model="formData.royalty.subDao"
              disabled
            >
            </v-text-field>
          </v-col>
          <v-col class="my-mgl12 col-color">
            <v-text-field
              :label="$t('AddFormTokenomicsStructure.semiosLabel')"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="formData.royalty.pDao"
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

const DEFAULT_ROYALTY = {
  pDao: 0,
  subDao: 50,
  builder: 25,
  minter: 25,
}

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
  royalty: props.formDataProp.royalty || DEFAULT_ROYALTY,
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
  () => props.formDataProp.royalty,
  (value) => {
    formData.royalty = value
  },
  { deep: true }
)

import { oninputNum, minusOthers, plusOthers } from '@/utils'
const setInput = (
  val: string | number,
  type: keyof typeof formData.royalty,
  position = 0,
  min = 0,
  max = Infinity
) => {
  formData.royalty[type] = Number(oninputNum(val, position, min, max))
  if (type === 'builder') {
    if (formData.royalty.builder >= 100 - formData.royalty.pDao) {
      formData.royalty.subDao = 0
      formData.royalty.minter = 0
    } else {
      const addTop = plusOthers(
        formData.royalty.builder,
        formData.royalty.minter
      )
      if (addTop >= 100 - formData.royalty.pDao) {
        formData.royalty.minter = minusOthers(
          100 - formData.royalty.pDao,
          formData.royalty.builder
        )
        formData.royalty.subDao = 0
      } else {
        formData.royalty.subDao = minusOthers(
          100 - formData.royalty.pDao,
          formData.royalty.builder,
          formData.royalty.minter
        )
      }
    }
  }

  if (type === 'minter') {
    if (formData.royalty.minter >= 100 - formData.royalty.pDao) {
      formData.royalty.subDao = 0
      formData.royalty.builder = 0
    } else {
      const addTop = plusOthers(
        formData.royalty.builder,
        formData.royalty.minter
      )
      if (addTop >= 100 - formData.royalty.pDao) {
        formData.royalty.builder = minusOthers(
          100 - formData.royalty.pDao,
          formData.royalty.minter
        )
        formData.royalty.subDao = 0
      } else {
        formData.royalty.subDao = minusOthers(
          100 - formData.royalty.pDao,
          formData.royalty.builder,
          formData.royalty.minter
        )
      }
    }
  }
}
onMounted(() => {
  if (props.isEdit) {
    formData.royalty = {
      pDao: props.formDataProp.daoRoyaltyToken.d4aReward,
      subDao: props.formDataProp.daoRoyaltyToken.daoReward,
      builder: props.formDataProp.daoRoyaltyToken.canvasReward,
      minter: props.formDataProp.daoRoyaltyToken.minterReward,
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
