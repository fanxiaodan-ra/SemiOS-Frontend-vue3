<template>
  <div class="other-nodes">
    <SlotDialog :title="`${$t('AddFormTokenomicsStructure.allocatableRatioLabel')}: ${props.titleNum
      }%`" :isDialog="props.isDialog" @cancelDialog="cancelDialog">
      <v-form ref="formRef">
        <v-select v-model="selectData" label="Select" :items="daos" item-title="daoName" item-value="projectId"
          :rules="selectRules" return-object></v-select>

        <v-text-field
          :label="$t('AddFormTokenomicsStructure.PleaseEnterLabel')"
          density="comfortable"
          type="number"
          v-model="formData.value" @update:modelValue="
      setInput(formData.value, 'value', 1, 0.1, props.titleNum)
      " :rules="valueRules">
        </v-text-field>
      </v-form>
      <v-btn block class="btnz text-none my-mgt16" type="submit" @click="addData()">{{ t('common.add') }}</v-btn>
    </SlotDialog>
  </div>
</template>
<script lang="ts" setup>
import SlotDialog from '@/components/SlotDialog.vue'
import { ref, reactive, watch } from 'vue'
import { t } from '@/lang'
const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  titleNum: {
    type: Number,
    default: 0,
  },
  daos: {
    type: Array,
    default: () => [],
  },
  dataList: {
    type: Array,
    default: () => [],
  },
})

watch(
  () => props.isDialog,
  (val) => {
    if (val) {
      selectData.value = null
      formData.projectId = null
      formData.daoName = ''
      formData.value = 0
    }
  }
)

const selectRules = [
  (v: any) => !!v || t('common.required'),
  (val: any) => {
    const list = props.dataList.map((item: any) => item.projectId)
    if (list.indexOf(val.projectId) > -1) {
      return t('common.daoExisted')
    }
    return true
  },
]
const valueRules = [
  (v: any) => !!v || t('common.required'),
  (val: any) => {
    if (val > props.titleNum) {
      return t('common.sumMustEqual100')
    }
    return true
  },
]
const emit = defineEmits(['cancelErcDialog', 'addERCData'])
const cancelDialog = () => {
  emit('cancelErcDialog')
}

const selectData = ref()
const formData = reactive({
  projectId: null,
  daoName: '',
  value: 0,
})

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
const addData = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  console.log(formData, 'formData')
  formData.daoName = selectData.value.daoName
  formData.projectId = selectData.value.projectId
  emit('addERCData', formData)
  cancelDialog()
}
</script>

<style lang="scss" scoped>
:deep(.v-card-actions .v-form) {
  width: 100%;
}

.other-nodes {
  :deep(.v-form) {
    width: 100%;
    background-color: transparent;
  }
}
</style>
