<template>
  <div class="other-nodes">
    <SlotDialog
      :title="t('permissionList.title')"
      :isDialog="props.isDialog"
      @cancelDialog="cancelDialog"
      width="800px"
      cardActionsClass="!py-0"
    >
      <Table
        :headers="headers"
        :serverItems="serverItems"
        :loadItems="loadItems"
        :loading="isLoading"
        :pageInfo="pageInfo"
        :empty-text="t('common.noData')"
        className="!bg-card-1 min-h-0"
      >
        <template v-slot:item.permissionType="{ item }">
          <span class="text-white text-sm">{{ (item as TableItem).permissionName }}</span>
        </template>
        <template v-slot:item.nftsName="{ item }">
          <div class="flex items-center">
            <TextEllipsis :text="(item as TableItem).nftsName" :width="100" className="text-primary-1">
              <template #default>
                <a :href="(item as TableItem).nftsLink" class="link">{{ (item as TableItem).nftsName }}</a>
              </template>
            </TextEllipsis>
          </div>
        </template>
        <template v-slot:item.ownerAddress="{ item }">
          <a :href="`${APP_OPEN_URL}/address/${(item as TableItem).ownerAddress}`" target="_blank" class="link">
            <HashEllipsis :hash="(item as TableItem).ownerAddress" :before="2" :after="4" />
          </a>
        </template>
      </Table>
      <v-btn class="btnz text-none my-10" type="submit" @click="cancelDialog">
        {{ t('common.back') }}
      </v-btn>
    </SlotDialog>
  </div>
</template>
<script lang="ts" setup>
import SlotDialog from '@/components/SlotDialog.vue'
import usePermissionStore from '@/store/permissions'
import { useRoute } from 'vue-router'
import { t } from '@/lang'
import { ref, computed } from 'vue'
import { APP_OPEN_URL } from '@/config'
import Table from '@/components/Table.vue'
import TextEllipsis from '@/components/TextEllipsis.vue'
import HashEllipsis from '@/components/HashEllipsis.vue'
type TableItem = {
  permissionType: string;
  permissionName: string;
  nftsName: string;
  nftsLink: string;
  ownerAddress: string;
}
const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
})

const headers = ref([
  {
    title: t('permissionList.permission'),
    align: 'start',
    value: 'permissionType',
  },
  {
    title: t('permissionList.nft'),
    align: 'start',
    value: 'nftsName',
  },
  { title: t('permissionList.holder'), value: 'ownerAddress', align: 'start', },
])
const permissionStore = usePermissionStore()
const serverItems = computed(() => {
  return permissionStore.permissionList
})

const pageInfo = ref({
  itemsPerPage: 10,
  totalItems: 0,
  curPage: 1,
  pageCount: 0
})

const isLoading = ref(false)
const route = useRoute()

const loadItems = async () => {
  try {
    isLoading.value = true
    await permissionStore.getPermissionListInDetail({
      daoId: route.query.id as string,
    })
  } catch (e) {
    console.error(e)
  } finally {
    console.log(111111111111)
    isLoading.value = false
  }
}
const emit = defineEmits(['cancelDialog', 'setNftIdentifier'])
const cancelDialog = () => {
  emit('cancelDialog')
}

</script>
<style lang="scss" scoped>
:deep(.v-table) {
  margin: 0;
}
:deep(thead .v-data-table__td) {
  border-bottom-color: #3E4072!important;
}
:deep(.v-data-table__tr .v-data-table__td) {
  border-bottom: 0!important;
}
:deep(.v-card .v-card-actions) {
  padding: 0!important;
}
</style>
