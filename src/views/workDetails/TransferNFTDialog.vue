<template>
  <div class="other-nodes">
    <SlotDialog
      title="Transfer NFT"
      :isDialog="props.isDialog"
      @cancelDialog="cancelDialog"
    >
      <p class="text-p">
        {{
          props.dataObj.basicDao === 2
            ? `You are transferring this work to another address. The recipient can
        enter this DAO and mint up to 5 more NFTs.DO NOT TRANSFER YOUR ONLY NFT!
        Or you will lose access to this DAO.`
            : 'You are transferring this work to another address.'
        }}
      </p>
      <v-form ref="formRef">
        <v-text-field
          label="Please input wallet address"
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
        @click="transferNft"
        >Transfer NFT</v-btn
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
  dataObj: {
    type: Object,
    default: () => {},
  },
  isMintAndTransfer: {
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
const { isAddressExistence } = useIsInput()
const valueRules = ref([
  (v: any) => !!v || 'Item is required',
  async (val: any) => {
    return isAddressExistence(val, [], 'address')
  },
])

const emit = defineEmits(['cancelDialog', 'transferNft', 'mintTransferNft'])
const cancelDialog = () => {
  address.value = ''
  emit('cancelDialog')
}

const address = ref('')

const formRef = ref()
const transferNft = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  if (props.isMintAndTransfer) {
    emit('mintTransferNft', address.value)
  } else {
    emit('transferNft', address.value)
  }
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
.text-p {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin: 32px 0;
}
</style>
