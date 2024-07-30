<template>
  <div class="other-nodes">
    <SlotDialog :title="t('myPermissions.permissionTransfer')" :isDialog="props.isDialog" @cancelDialog="cancelDialog" width="800px">
      <div class="tab-hedar">
        <v-tabs v-model="tab" fixed-tabs color="deep-purple-accent-4" @click.stop.prevent>
          <v-tab selected-class="custom-tabs" :value="1" class="text-none">Select NFT</v-tab>
          <v-tab selected-class="custom-tabs" :value="2" class="text-none">External NFT</v-tab>
        </v-tabs>
      </div>
      <v-window v-model="tab" class="det-box">
        <v-window-item v-for="n in 2" :key="n" :value="n">
          <v-container fluid>
            <component
              ref="childRef"
              :is="currentCopmonent[tab - 1]"
              :topUpMintList="nfts"
              :isLoading="nftsLoading"
              type="transferNft"
              @setWorkItem="setWorkItem"></component>
          </v-container>
        </v-window-item>
      </v-window>
      <v-btn
        class="btnz text-none my-mgt16"
        type="submit"
        :disabled="tab < 3 && !selectWork.workId"
        @click="transfer">
        {{ t('myPermissions.transfer') }}
      </v-btn>
    </SlotDialog>
    <DialogLoading
      :title="t('common.loading')"
      :isLoading="isDialogLoading"
      :text="t('common.loadingText')"
    />
  </div>
</template>
<script lang="ts" setup>
import SlotDialog from '@/components/SlotDialog.vue'
import DialogLoading from '@/components/DialogLoading.vue'
import { ref, watch, shallowRef, defineExpose } from 'vue'
import usePermissionStore from '@/store/permissions'
import { setDaoPermission } from '@/common/exWeb3service'
import useToastNotify from '@/hooks/useToastNotify'
import BindingTopupBalanceTab from '../workDetails/BindingTopupBalanceTab.vue'
import BindingExternalNftTab from '../workDetails/BindingExternalNftTab.vue'

const currentCopmonent = shallowRef([
  BindingTopupBalanceTab,
  BindingExternalNftTab,
])

const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  selectItem: {
    type: Object,
    default: () => ({}),
  },
  workId: {
    type: String,
    default: '0',
  },
})
const tab = ref(1)
const nfts = ref([])
const nftsLoading = ref(false)
const isDialogLoading = ref(false)
const selectWork = ref<any>({})

const permissionStore = usePermissionStore()
const { notifySuc, notifyErr } = useToastNotify()
const init = async () => {
  try {
    nftsLoading.value = true
    const res = await permissionStore.getUserPermissionsNft({
      workId: props.selectItem.workId || props.workId,
    })
    nfts.value = res
  } catch (error) {
    console.error(error)
  } finally {
    nftsLoading.value = false
  }
}

watch(
  () => props.isDialog,
  () => {
    tab.value = 1
    selectWork.value = {}
    if (props.isDialog) {
      init()
    }
  }, { immediate: true }
)

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
const setWorkItem = (item: any) => {
  selectWork.value = item
}

import { t } from '@/lang'

const transfer = async () => {
  cancelDialog()
  try {
    isDialogLoading.value = true
    const tx = await setDaoPermission({
      params: {
        daoId: props.selectItem.projectId,
        daoNftAddress: selectWork.value.erc721Token,
        tokenId: selectWork.value.workNumber,
      },
      type: props.selectItem.permissionType,
    })
    await tx.wait()
    notifySuc(t('common.sucTrans'), true)
  } catch (error) {
    const err = JSON.stringify(error)
    notifyErr(err)
  } finally {
    isDialogLoading.value = false
  }
}
defineExpose({
  transfer
});
</script>

<style lang="scss" scoped>
.tab-hedar {
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
