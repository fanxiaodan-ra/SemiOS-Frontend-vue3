<template>
  <FormRow
    :importance="false"
    :input-name="
      $t('AddFormNodesStrategies.whitelistERC721WithUnlimitedMintingLabel')
    "
    :tooltip-text="
      $t('AddFormNodesStrategies.whitelistERC721WithUnlimitedMintingTip')
    "
    class="my-mgb12"
  >
    <v-row
      no-gutters
      class="no-def"
      v-if="mintingErcWithUnlimitedlistAddress.length > 0"
    >
      <v-col>
        <v-card
          variant="tonal"
          v-for="(item, idx) in mintingErcWithUnlimitedlistAddress"
          :key="item.address"
        >
          <v-row no-gutters>
            <v-col cols="10">
              <p>{{ item.address }}</p>
            </v-col>
            <v-col cols="2">
              <v-icon color="#745cd4" @click="deleteItem(idx)" class="">
                mdi-trash-can-outline
              </v-icon>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      border
      class="text-none btnmo btnb ftr fc7"
      prepend-icon="mdi-plus"
      variant="text"
      block
      size="large"
      style="width: 100%"
      @click="setDialog"
    >
    </v-btn>
  </FormRow>

  <DialogFormAddress
    :is-dialog="isDialog"
    @cancelDialog="cancelDialog"
    @addData="addData"
    :data-list="mintingErcWithUnlimitedlistAddress"
    :isErcAddress="true"
    :dialog-title="
      $t('AddFormNodesStrategies.whitelistERC721WithUnlimitedMintingLabel')
    "
  />
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import DialogFormAddress from '@/components/nodeStrategies/DialogFormAddress.vue'

import { ref, onMounted } from 'vue'
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Object,
    default: () => {},
  },
})
const mintingErcWithUnlimitedlistAddress = ref<any>([])
const isDialog = ref(false)
const setDialog = () => {
  isDialog.value = true
}
const addData = (data: never) => {
  mintingErcWithUnlimitedlistAddress.value.push({ address: data })
  setFormData()
}
const deleteItem = (idx: number) => {
  mintingErcWithUnlimitedlistAddress.value.splice(idx, 1)
  setFormData()
}
const cancelDialog = () => {
  isDialog.value = false
}

const emit = defineEmits(['setFormData'])

const setFormData = () => {
  emit(
    'setFormData',
    mintingErcWithUnlimitedlistAddress.value,
    'mintingErcWithUnlimitedlistAddress'
  )
}
onMounted(async () => {
  if (props.isEdit) {
    mintingErcWithUnlimitedlistAddress.value = props.initData.minting
      ?.whiteListedERC721
      ? props.initData.minting.whiteListedERC721.map((item: any) => {
          return {
            address: item,
          }
        })
      : []
    setFormData()
  }
})
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
.delete-ipput {
  cursor: pointer;
}
.no-def {
  :deep(.v-card--variant-tonal) {
    background-color: #21293a !important;
    color: #9e9e9e;
    padding: 12px;
    margin-bottom: 6px;
  }
  :deep(.v-col-2) {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
