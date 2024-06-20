<template>
  <FormRow
    :importance="false"
    :input-name="
      $t('AddFormNodesStrategies.whitelistedNFTWithUnlimitedMintingLabel')
    "
    :tooltip-text="
      $t('AddFormNodesStrategies.whitelistedNFTWithUnlimitedMintingTip')
    "
    class="my-mgb12"
  >
    <v-row
      no-gutters
      class="no-def"
      v-if="mintingNftWithUnlimitedlistAddress.length > 0"
    >
      <v-col>
        <v-card
          variant="tonal"
          v-for="(item, idx) in mintingNftWithUnlimitedlistAddress"
          :key="item.erc721Address"
        >
          <v-row no-gutters>
            <v-col cols="10">
              <p>{{ item.erc721Address }}</p>
              <p>Token ID:{{ item.tokenId }}</p>
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
  <DialogFormNft
    :is-dialog="isDialog"
    @cancelDialog="cancelDialog"
    @addData="addData"
    :data-list="mintingNftWithUnlimitedlistAddress"
    :dialog-title="
      $t('AddFormNodesStrategies.whitelistedNFTWithUnlimitedMintingLabel')
    "
  />
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import DialogFormNft from '@/components/nodeStrategies/DialogFormNft.vue'
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
const mintingNftWithUnlimitedlistAddress = ref<any>([])
const isDialog = ref(false)
const setDialog = () => {
  isDialog.value = true
}
const addData = (data: never) => {
  mintingNftWithUnlimitedlistAddress.value.push(data)
  setFormData()
}
const deleteItem = (idx: number) => {
  mintingNftWithUnlimitedlistAddress.value.splice(idx, 1)
  setFormData()
}

const cancelDialog = () => {
  isDialog.value = false
}

const emit = defineEmits(['setFormData'])

const setFormData = () => {
  emit(
    'setFormData',
    mintingNftWithUnlimitedlistAddress.value,
    'mintingNftWithUnlimitedlistAddress'
  )
}
onMounted(async () => {
  if (props.isEdit) {
    mintingNftWithUnlimitedlistAddress.value = props.initData.minting
      ?.whiteListedERC721Id
      ? props.initData.minting.whiteListedERC721Id
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
