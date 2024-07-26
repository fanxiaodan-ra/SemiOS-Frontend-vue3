<template>
  <div class="box">
    <div class="pos_fix min-w-[1225px]">
      <h2>{{ t('myPermissions.title') }}</h2>
      <v-divider class="border-purple"></v-divider>
      <Table
        :headers="headers"
        :serverItems="serverItems"
        :loadItems="loadItems"
        :loading="isLoading"
        :pageInfo="pageInfo"
        :skeletonNum="10"
        :emptyText="t('common.noData')"
        class="w-full min-w-[1080px] max-w-[1200px] mx-auto px-4 !mt-6"
      >
        <template v-slot:item.permissionType="{ item }">
          <span class="text-white text-sm">{{ (item as TableItem).permissionName }}</span>
        </template>
        <template v-slot:item.daoName="{ item }">
          <TextEllipsis :text="(item as TableItem).daoName" :width="100">
            <template #default>
              <a :href="(item as TableItem).nodeLink" class="link">{{ (item as TableItem).daoName }}</a>
            </template>
          </TextEllipsis>
        </template>
        <template v-slot:item.daoNameNft="{ item }">
          <div class="flex items-center">
            <TextEllipsis :text="(item as TableItem).nftsName" :width="100">
              <template #default>
                <a :href="(item as TableItem).nftsLink" class="link">{{ (item as TableItem).nftsName }}</a>
              </template>
            </TextEllipsis>
            <v-btn class="text-none ml-3 min-w-6 !p-1" :width="24" @click="() => {onEdit(item)}" size="small" variant="text">
              <v-tooltip location="top">
                <template #activator="{ props }">
                  <i class="iconfont icon-font icon-bianji text-grey-4 hover:text-primary-1" v-bind="props"></i>
                </template>
                <span>{{ t('myPermissions.editTip') }}</span>
              </v-tooltip>
            </v-btn>
          </div>
        </template>
      </Table>
    </div>
    <PermissionTransfer
      :isDialog="isPermissionTransfer"
      :selectItem="selectItem"
      @cancelDialog="isPermissionTransfer = false"
    />
  </div>
</template>

<script setup lang="ts">
import { t } from '@/lang'
import { ref, computed } from 'vue'
import Table from '@/components/Table.vue'
import TextEllipsis from '@/components/TextEllipsis.vue'
import usePermissionStore from '@/store/permissions'
import PermissionTransfer from '../components/PermissionTransfer.vue'
import useUserStore from '@/store'

type TableItem = {
  permissionType: string;
  permissionName: string;
  nftsName: string;
  nftsLink: string;
  daoName: string;
  nodeLink: string;
}

const isLoading = ref(false)
const selectItem = ref({
  workId: '',
})
const permissionStore = usePermissionStore()
const userStore = useUserStore()
const headers = ref([
  {
    title: t('myPermissions.permissions'),
    align: 'start',
    value: 'permissionType',
  },
  {
    title: t('myPermissions.nodes'),
    align: 'start',
    value: 'daoName',
  },
  { title: t('myPermissions.nfts'), value: 'daoNameNft', align: 'start', },
])

const isPermissionTransfer = ref(false)

const serverItems = computed(() => {
  return permissionStore.myPermissions
})

const pageInfo = computed(() => {
  return {
    itemsPerPage: 10,
    totalItems: permissionStore.myPermissionsPageInfo.totalItems,
    curPage: permissionStore.myPermissionsPageInfo.pageNo,
  }
})
const onEdit = (item: any) => {
  isPermissionTransfer.value = true
  selectItem.value = item
}
const loadItems = async ({ page }:{page:number}) => {
  try {
    isLoading.value = true
    await permissionStore.getUserPermissions({
      userAddress: userStore.UserInfo.address,
      pageNo: page
    })
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

defineExpose({
  loadItems,
  isLoading,
  pageInfo,
  serverItems,
  isPermissionTransfer,
  selectItem,
  onEdit
})
</script>

<style lang="scss" scoped>
.box {
  @apply flex flex-col h-full flex-1 items-center;
}
h2 {
  color: #f3f3f3;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  height: 84px;
  line-height: 84px;
  text-align: center;
}

.v-card {
  width: 100%;
}
</style>
