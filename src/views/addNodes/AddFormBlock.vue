<template>
  <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="16">
    <h3 class="node-name" v-if="store.addNodeType === 6">
      {{ $t('AddFormBlock.title') }}
    </h3>
    <v-form ref="formRef">
      <TimePicker
        :input-name="$t('AddFormBlock.daoStartDateLabel')"
        :tooltip-text="$t('AddFormBlock.daoStartDateTip')"
        @setFormDate="setFormDate"
      />
      <v-expand-transition>
        <FormRow
          v-if="!props.formDataProp.daoTokenMode"
          :importance="false"
          :input-name="$t('AddFormBlock.topUpModeLabel')"
          :tooltip-text="$t('AddFormBlock.topUpModeTip')"
        >
          <v-switch v-model="formData.topUpMode" color="#745cd4"></v-switch>
        </FormRow>
      </v-expand-transition>

      <FormRow
        :importance="false"
        :input-name="$t('AddFormBlock.infiniteModeLabel')"
        :tooltip-text="$t('AddFormBlock.infiniteModeTip')"
      >
        <v-switch v-model="formData.infiniteMode" color="#745cd4"></v-switch>
      </FormRow>
      <v-expand-transition>
        <FormRow
          v-if="!formData.infiniteMode"
          :input-name="$t('AddFormBlock.daoMintWindowLabel')"
          :tooltip-text="$t('AddFormBlock.daoMintWindowTip')"
        >
          <v-text-field
            :label="$t('AddFormBlock.daoMintWindowPlaceholder')"
            density="comfortable"
            v-model="formData.daoMintWindow"
            @update:modelValue="
              setInput(formData.daoMintWindow, 'daoMintWindow', 0, 1, 999999999)
            "
          >
          </v-text-field>
        </FormRow>
      </v-expand-transition>

      <FormRow
        :input-name="$t('AddFormBlock.daoMintWindowDurationLabel')"
        :tooltip-text="$t('AddFormBlock.daoMintWindowDurationTip')"
      >
        <v-text-field
          :label="$t('AddFormBlock.daoMintWindowDurationPlaceholder')"
          density="comfortable"
          v-model="formData.daoMintWindowDuration"
          append-inner-icon="mdi-hours-24"
          @update:modelValue="
            setInput(
              formData.daoMintWindowDuration,
              'daoMintWindowDuration',
              0,
              1,
              999999999
            )
          "
        >
        </v-text-field>
      </FormRow>
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
          @update:modelValue="
            setInput(formData.dailyMintCap, 'dailyMintCap', 1, 1)
          "
        >
        </v-text-field>
      </FormRow>
    </v-form>
    <div
      class="dflex flex-jc my-mgb24 my-mgt24"
      v-if="store.addNodeType !== 6"
    >
      <v-btn
        block
        class="btnb fc7 text-none mr-10"
        type="submit"
        @click="setAddType(1)"
        >Back</v-btn
      >
      <v-btn block class="btnz text-none" type="submit" @click="setAddType(3)"
        >Next</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import TimePicker from '@/components/TimePicker.vue'
import FormRow from '@/components/FormRow.vue'
import { ref, reactive, watch } from 'vue'
import useUserStore from '@/store'
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
const castings = [
  { label: '1k', value: 0 },
  { label: '5k', value: 1 },
  { label: '10k', value: 2 },
  { label: '50k', value: 3 },
  { label: '100k', value: 4 },
]
const formData = reactive({
  daoStartDate: '',
  topUpMode: false,
  infiniteMode: false,
  daoMintWindow: 60,
  daoMintWindowDuration: 24,
  totalNftCasting: 2,
  dailyMintCap: 10000,
})
const emit = defineEmits(['setFormData'])
watch(
  () => formData,
  (value) => {
    emit('setFormData', value)
  },
  { deep: true }
)
const setFormDate = (val: any) => {
  formData.daoStartDate = val
}

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

const setAddType = async (val: number) => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  store.setNodeType(val)
  window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped></style>
