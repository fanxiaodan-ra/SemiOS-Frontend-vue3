<template>
  <v-card
    class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24"
    elevation="12"
  >
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
          <v-switch
            v-model="formData.topUpMode"
            color="#8C91FF"
            inset
          ></v-switch>
        </FormRow>
      </v-expand-transition>

      <FormRow
        :importance="false"
        :input-name="$t('AddFormBlock.infiniteModeLabel')"
        :tooltip-text="$t('AddFormBlock.infiniteModeTip')"
      >
        <v-switch
          v-model="formData.infiniteMode"
          color="#8C91FF"
          inset
        ></v-switch>
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
            type="number"
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
          type="number"
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
          type="number"
          :rules="[(v:any) => !!v || $t('common.dontOver', { num: '10000' })]"
          @update:modelValue="
            setInput(formData.dailyMintCap, 'dailyMintCap', 0, 1, 10000)
          "
        >
        </v-text-field>
      </FormRow>
    </v-form>
    <div class="dflex flex-jc my-mgb24 my-mgt24" v-if="store.addNodeType !== 6">
      <v-btn
        v-if="!route.query.id"
        block
        class="btnb fc7 text-none mr-10"
        type="submit"
        @click="setAddType(1)"
        >{{ t('common.back') }}</v-btn
      >
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="setAddType(3)"
        >{{ t('common.next') }}</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import TimePicker from '@/components/TimePicker.vue'
import FormRow from '@/components/FormRow.vue'
import { ref, watch, onMounted } from 'vue'
import { t } from '@/lang'
import useUserStore from '@/store'
import { useRoute } from 'vue-router'
import useAddNodes from '@/hooks/useAddNodes'
import dayjs from 'dayjs'

const { getDaoTime } = useAddNodes()
const route = useRoute()
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
  { label: t('common.oneK'), value: 0 },
  { label: t('common.fiveK'), value: 1 },
  { label: t('common.tenK'), value: 2 },
  { label: t('common.fiftyK'), value: 3 },
  { label: t('common.oneHundredK'), value: 4 },
]
const formData = ref({
  daoStartDate: '',
  topUpMode: false,
  infiniteMode: false,
  daoMintWindow: 60,
  daoMintWindowDuration: 24,
  totalNftCasting: 2,
  dailyMintCap: 10000,
}) as any

const initDate = async () => {
  const daoTime = await getDaoTime()
  setFormDate(daoTime)
}

onMounted(() => {
  initDate()
})

const validateForm = async (value: any) => {
  const { valid } = await formRef.value.validate()
  emit('setFormData', {
    formVal: value,
    validVal: {
      position: 1,
      value: valid,
    },
  })
}

const emit = defineEmits(['setFormData'])
watch(
  () => formData,
  (value) => {
    console.log(value, 'value')
    validateForm(value)
  },
  { deep: true }
)
const setFormDate = (val: any) => {
  formData.value.daoStartDate = dayjs(new Date(val)).format('YYYY-MM-DD')
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

<style lang="scss" scoped></style>
