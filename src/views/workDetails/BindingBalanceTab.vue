<template>
  <div class="other-nodes">
    <SlotDialog
      title="Binding Top-up Balance"
      :isDialog="props.isDialog"
      @cancelDialog="cancelDialog"
      width="800px"
    >
      <div class="tab-hedar">
        <v-tabs
          v-model="tab"
          fixed-tabs
          color="deep-purple-accent-4"
          @click.stop.prevent
        >
          <v-tab selected-class="custom-tabs" :value="1" class="text-none"
            >Select NFT</v-tab
          >
          <v-tab selected-class="custom-tabs" :value="2" class="text-none"
            >External NFT</v-tab
          >
          <v-tab selected-class="custom-tabs" :value="3" class="text-none"
            >Bind to this upcoming NFT</v-tab
          >
        </v-tabs>
      </div>
      <v-window v-model="tab" class="det-box">
        <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid>
            <component
              ref="childRef"
              :is="currentCopmonent[tab - 1]"
              :topUpMintList="props.topUpMintList"
              :dataObj="props.dataObj"
              @setWorkItem="setWorkItem"
            ></component>
          </v-container>
        </v-window-item>
      </v-window>
      <v-btn
        block
        class="btnz text-none my-mgt16"
        type="submit"
        :disabled="tab < 3 && !selectWork.workId"
        @click="setDialogBindData"
        >Top Up</v-btn
      >
    </SlotDialog>
  </div>
</template>
<script lang="ts" setup>
import SlotDialog from '@/components/SlotDialog.vue'
import { ref, watch, shallowRef } from 'vue'
import BindingTopupBalanceTab from './BindingTopupBalanceTab.vue'
import BindingExternalNftTab from './BindingExternalNftTab.vue'
import BindingUpcomingNftTab from './BindingUpcomingNftTab.vue'

const currentCopmonent = shallowRef([
  BindingTopupBalanceTab,
  BindingExternalNftTab,
  BindingUpcomingNftTab,
])

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  topUpMintList: {
    type: Array,
    default: () => [],
  },
  dataObj: {
    type: Object,
    default: () => {},
  },
})
watch(
  () => props.isDialog,
  () => {
    tab.value = 1
    selectWork.value = {}
  }
)

const tab = ref(1)
watch(
  () => tab.value,
  () => {
    selectWork.value = {}
  }
)

const emit = defineEmits(['cancelDialog', 'setNftIdentifier'])
const cancelDialog = () => {
  emit('cancelDialog')
}
const selectWork = ref<any>({})
const setWorkItem = (item: any) => {
  selectWork.value = item
}

import { ethers } from 'ethers'
const setDialogBindData = async () => {
  if (tab.value === 1) {
    const nftIdentifier = {
      erc721Address: selectWork.value.erc721TokenAddress,
      tokenId: selectWork.value.workNumber,
    }
    emit('setNftIdentifier', nftIdentifier)
  } else {
    const nftIdentifier = {
      erc721Address: ethers.constants.AddressZero,
      tokenId: 0,
    }
    emit('setNftIdentifier', nftIdentifier)
  }
  cancelDialog()
}
</script>

<style lang="scss" scoped>
.tab-hedar {
  // margin: 16px 0;
  width: 100%;
  padding-bottom: 0.5rem;
  border-bottom: 0.0625rem solid #2F305B !important;
  :deep(.v-tabs) {
    height: 32px !important;
    .v-btn {
      height: 32px !important;
      font-size: 14px;
      color: #bbbaba;
      font-weight: 400 !important;
    }
  }
}
.det-box {
  width: 100%;
  :deep(.v-container) {
    padding: 0 !important;
  }
}
</style>
