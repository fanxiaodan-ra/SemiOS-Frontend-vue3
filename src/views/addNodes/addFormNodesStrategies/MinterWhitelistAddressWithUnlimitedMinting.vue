<template>
  <FormRow
    :importance="false"
    :input-name="
      $t('AddFormNodesStrategies.whitelistAddressWithUnlimitedMintingLabel')
    "
    :tooltip-text="
      $t('AddFormNodesStrategies.whitelistAddressWithUnlimitedMintingTip')
    "
    class="my-mgb12"
  >
    <v-row
      no-gutters
      class="no-def"
      v-if="mintingWithUnlimitedlistAddress.length > 0"
    >
      <v-col>
        <v-card
          variant="tonal"
          v-for="(item, idx) in mintingWithUnlimitedlistAddress"
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
    :data-list="mintingWithUnlimitedlistAddress"
    :dialog-title="
      $t('AddFormNodesStrategies.whitelistAddressWithUnlimitedMintingLabel')
    "
  />
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import DialogFormAddress from '@/components/nodeStrategies/DialogFormAddress.vue'

import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Object,
    default: () => {},
  },
  list: {
    type: Array<{ address: string }>,
    default: () => [],
  },
})
const mintingWithUnlimitedlistAddress = ref(props.list)
watch(
  () => props.list,
  (val) => {
    mintingWithUnlimitedlistAddress.value = val
  },
  { deep: true }
)

const isDialog = ref(false)
const setDialog = () => {
  isDialog.value = true
}
const addData = (data: never) => {
  mintingWithUnlimitedlistAddress.value.push({ address: data })
  setFormData()
}
const deleteItem = (idx: number) => {
  mintingWithUnlimitedlistAddress.value.splice(idx, 1)
  setFormData()
}

const cancelDialog = () => {
  isDialog.value = false
}

const emit = defineEmits(['setFormData'])

const setFormData = () => {
  emit(
    'setFormData',
    mintingWithUnlimitedlistAddress.value,
    'mintingWithUnlimitedlistAddress'
  )
}
onMounted(async () => {
  if (props.isEdit) {
    const maxAddrList = props.initData.minting?.designatedMintCaps
      ? props.initData.minting.designatedMintCaps.map(
          (item: any) => item.account
        )
      : []
    const minterWhites = props.initData.minting.whiteList?.whiteListAddress
      ? [...props.initData.minting.whiteList.whiteListAddress]
      : []

    const minterWhiteDelMaxAddrList = minterWhites.filter(
      (v) => maxAddrList.findIndex((el: any) => el === v) === -1
    )
    mintingWithUnlimitedlistAddress.value = minterWhiteDelMaxAddrList.map(
      (item) => {
        return {
          address: item,
        }
      }
    )

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
