<template>
  <v-card class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24 bg-card-1" elevation="12">
    <h3 class="node-name">
      {{ $t('AddFormBlock.title') }}
    </h3>
    <v-form ref="formRef">
      <FormRow
        :importance="false"
        :input-name="$t('AddFormBlock.infiniteModeLabel')"
        :tooltip-text="$t('AddFormBlock.infiniteModeTip')"
      >
        <v-switch v-model="formData.infiniteMode" color="#8C91FF" inset></v-switch>
      </FormRow>
      <v-expand-transition>
        <FormRow
          v-if="!formData.infiniteMode"
          :importance="false"
          input-name="Modify Remaining Mint Window"
          tooltip-text="The works of this Nodes cannot be minted after Block Window."
          class="no-del"
        >
          <v-checkbox
            label="Need to adjust parameters"
            v-model="formData.radioModify"
            color="#745cd4"
            class="checkbox-d"
          ></v-checkbox>
          <p class="re-m">
            Remaining Mint Windows : {{ props.initData.remainingMintWindow }}
          </p>
          <v-text-field
            label="Please enter your Nodes Mint Window Duration."
            density="comfortable"
            v-model="formData.modifyRemainingMintWindow"
            :disabled="!formData.radioModify"
            :rules="modifyRemainingMintWindowRules"
            @update:modelValue="
              setInput(
                formData.modifyRemainingMintWindow,
                'modifyRemainingMintWindow',
                0,
                1
              )
            "
          >
          </v-text-field>
        </FormRow>
      </v-expand-transition>

      <FormRow
        :input-name="$t('AddFormBlock.totalNftCastingLabel')"
        :tooltip-text="$t('AddFormBlock.totalNftCastingTip')"
      >
        <v-radio-group v-model="formData.totalNftCasting" inline>
          <v-radio
            v-for="item in castings"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            color="#745cd4"
          >
          </v-radio>
        </v-radio-group>
      </FormRow>
      <FormRow
        :input-name="$t('AddFormBlock.dailyMintCapLabel')"
        :tooltip-text="$t('AddFormBlock.dailyMintCapTip')"
      >
        <v-text-field
          :label="$t('PleaseEnterLabel')"
          density="comfortable"
          v-model="formData.dailyMintCap"
          type="number"
          @update:modelValue="
            setInput(formData.dailyMintCap, 'dailyMintCap', 0, 1, 10000)
          "
        >
        </v-text-field>
      </FormRow>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { ref, reactive, onMounted, watch } from 'vue'

const props = defineProps({
  initData: {
    type: Object,
    default: () => {
      remainingMintWindow: 0
    },
  },
})
const castings = [
  { label: '1k', value: 0 },
  { label: '5k', value: 1 },
  { label: '10k', value: 2 },
  { label: '50k', value: 3 },
  { label: '100k', value: 4 },
]
const formData = reactive({
  infiniteMode: false,
  daoMintWindow: 60,
  totalNftCasting: 2,
  dailyMintCap: 10000,
  modifyRemainingMintWindow: 0,
  radioModify: false,
})
watch(
  () => formData.infiniteMode,
  (value) => {
    if (value) {
      formData.radioModify = false
      formData.modifyRemainingMintWindow = 0
    }
  },
  { deep: true }
)

const modifyRemainingMintWindowRules = [
  (value: string) => {
    if (value) return true
    return 'This field is required.'
  },
]
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

const setFormBlock = async () => {
  if (formData.radioModify) {
    const { valid } = await formRef.value.validate()
    if (!valid) return false
    emit('setFormData', formData)
    return true
  } else {
    emit('setFormData', formData)
    return true
  }
}
defineExpose({
  setFormBlock,
})

onMounted(() => {
  formData.daoMintWindow = props.initData.daoMintWindow
  formData.totalNftCasting = props.initData.totalNftMintCap
  formData.dailyMintCap = props.initData.dailyMintCap
  formData.infiniteMode = props.initData.infiniteMode
})
</script>

<style lang="scss" scoped>
:deep(.v-form) {
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 24px;
  width: 100%;
}
:deep(.v-input__control) {
  height: 56px !important;
}
:deep(.v-selection-control-group--inline) {
  height: 56px !important;
}
.re-m {
  color: #9e9e9e;
  margin-bottom: 6px;
  margin-left: 12px;
}
.checkbox-d {
  :deep(.v-input__details) {
    display: none;
  }
}
</style>
