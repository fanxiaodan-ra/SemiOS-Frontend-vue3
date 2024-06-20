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
          v-model="address"
          :rules="valueRules"
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

import { ref, watch } from 'vue'
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
  isErcAddress: {
    type: Boolean,
    default: false,
  },
})
watch(
  () => props.isDialog,
  (value) => {
    if (value) {
      address.value = ''
    }
  }
)

import useIsInput from '@/hooks/useIsInput'
const { isAddressExistence, isERC721Existence } = useIsInput()
const valueRules = ref([
  (v: any) => !!v || 'Item is required',
  async (val: any) => {
    if (props.isErcAddress) {
      return await isERC721Existence(val, props.dataList, 'address')
    } else {
      return isAddressExistence(val, props.dataList, 'address')
    }

    return true
  },
])

const emit = defineEmits(['cancelDialog', 'addData'])
const cancelDialog = () => {
  emit('cancelDialog')
  // setTimeout(() => {
  //   address.value = ''
  // }, 500)
  // address.value = ''
}

const address = ref('')

const formRef = ref()
const addData = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  emit('addData', address.value)
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
