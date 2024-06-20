<template>
  <div class="other-nodes">
    <SlotDialog
      :title="props.dialogTitle"
      :isDialog="props.isDialog"
      @cancelDialog="cancelDialog"
    >
      <v-form ref="formRef">
        <v-text-field
          :label="$t('NodeDetail.addressPlaceholder')"
          density="comfortable"
          v-model="formData.erc721Address"
          :rules="erc721AddressRules"
        >
        </v-text-field>
        <v-text-field
          :label="$t('NodeDetail.tokenIdPlaceholder')"
          density="comfortable"
          v-model="formData.tokenId"
          @update:modelValue="setInput(formData.tokenId, 'tokenId')"
          :rules="tokenIdRules"
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
  dataList: {
    type: Array,
    default: () => [],
  },
})
watch(
  () => props.isDialog,
  (value) => {
    if (value) {
      formData.erc721Address = ''
      formData.tokenId = undefined
    }
  }
)
const formData = reactive({
  erc721Address: '',
  tokenId: undefined,
})

import { oninputNum } from '@/utils'
import useIsInput from '@/hooks/useIsInput'
const { isERC721Existence, isNftExistence } = useIsInput()

const erc721AddressRules = [
  (v: any) => !!v || 'Item is required',
  async (val: any) => {
    return isERC721Existence(val, props.dataList, 'erc721Address', false)
  },
]

const tokenIdRules = [
  async (v: any) => {
    if (typeof v === 'undefined') return 'Item is required'
    if (props.dataList.length > 0) {
      return isNftExistence(
        props.dataList,
        'erc721Address',
        'tokenId',
        formData,
        v
      )
    } else {
      return true
    }
  },
]
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
