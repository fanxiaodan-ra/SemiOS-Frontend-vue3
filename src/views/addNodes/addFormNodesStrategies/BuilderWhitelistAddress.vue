<template>
  <FormRow
    :importance="false"
    :input-name="$t('AddFormNodesStrategies.whitelistAddressLabel')"
    :tooltip-text="$t('AddFormNodesStrategies.whitelistAddressTip')"
    class="my-mgb12"
  >
    <v-row no-gutters class="no-def" v-if="workWhitelistAddress.length > 0">
      <v-col>
        <v-card
          variant="tonal"
          v-for="(item, idx) in workWhitelistAddress"
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
    :data-list="workWhitelistAddress"
    :dialog-title="$t('AddFormNodesStrategies.whitelistAddressLabel')"
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
const workWhitelistAddress = ref<any>([])
const isDialog = ref(false)
const setDialog = () => {
  isDialog.value = true
}
const addData = (data: never) => {
  workWhitelistAddress.value.push({ address: data })
  setFormData()
}
const deleteItem = (idx: number) => {
  workWhitelistAddress.value.splice(idx, 1)
  setFormData()
}

const cancelDialog = () => {
  isDialog.value = false
}

const emit = defineEmits(['setFormData'])

const setFormData = () => {
  emit('setFormData', workWhitelistAddress.value, 'workWhitelistAddress')
}
onMounted(async () => {
  if (props.isEdit) {
    workWhitelistAddress.value = props.initData.createCanvas.whiteList
      ?.whiteListAddress
      ? props.initData.createCanvas.whiteList.whiteListAddress.map(
          (item: string) => {
            return {
              address: item,
            }
          }
        )
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
