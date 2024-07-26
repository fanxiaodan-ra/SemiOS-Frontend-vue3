<template>
  <div class="other-nodes">
    <SlotDialog
      :title="props.dialogTitle"
      :isDialog="props.isDialog"
      @cancelDialog="cancelDialog"
    >
      <v-form ref="formRef">
        <v-text-field
          :label="$t('NodeDetail.amountPlaceholder')"
          density="comfortable"
          type="number"
          v-model="formData.amount"
          @update:modelValue="setInput(formData.amount, 'amount', 0, 1)"
          :rules="amountRules"
        >
        </v-text-field>
      </v-form>
      <v-btn
        block
        class="btnz text-none my-mgt16"
        type="submit"
        @click="addData()"
        >Add</v-btn
      >
    </SlotDialog>
  </div>
</template>
<script lang="ts" setup>
import SlotDialog from '@/components/SlotDialog.vue'

import { reactive, ref, watch } from 'vue'
const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: '',
  },
})
watch(
  () => props.isDialog,
  (value) => {
    if (value) {
      formData.amount = undefined
    }
  }
)
const formData = reactive({
  amount: undefined,
})
const amountRules = [(v: any) => !!v || 'Item is required']

import { oninputNum } from '@/utils'
const setInput = (
  val: any,
  type: keyof typeof formData,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  formData[type] = inputNum as never
}
const emit = defineEmits(['cancelDialog', 'addData'])
const cancelDialog = () => {
  emit('cancelDialog')
}

const formRef = ref()
const addData = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  emit('addData', { ...formData })
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
