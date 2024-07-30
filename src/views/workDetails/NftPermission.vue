<template>
  <v-card class="node-card" v-if="dataList && dataList.length > 0">
    <h4 class="font-h4 text-white">{{ t('nftDetail.nftPermission') }}</h4>
    <template v-if="isLoading">
      <v-skeleton-loader class="bg-transparent w-full" type="list-item"></v-skeleton-loader>
      <v-skeleton-loader class="bg-transparent w-full" type="list-item"></v-skeleton-loader>
      <v-skeleton-loader class="bg-transparent w-full" type="list-item"></v-skeleton-loader>
      <v-skeleton-loader class="bg-transparent w-full" type="list-item"></v-skeleton-loader>
    </template>
    <template v-else>
      <div>
        <v-list lines="one" class="bg-card-1">
          <v-list-item class="ps-0 pe-0">
            <v-list-item-content class="flex items-center">
              <span class="title w-1/3">{{ t('nftDetail.nodes') }}</span>
              <span class="title w-1/2">{{ t('nftDetail.nftPermission') }}</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(item) in dataList" :key="item.nodeLink" class="!min-h-0 !p-0 [&:not(:last-child)]:mb-4">
            <template v-slot:default>
              <v-list-item-content class="flex items-center">
                <div class="w-1/3">
                  <a :href="item.nodeLink" class="link max-w-none block text-nowrap">{{ item.daoName }}</a>
                </div>
                <div class="flex items-center w-1/2">
                  <span class="text-white text-nowrap">{{ item.permissionName }}</span>
                  <v-btn v-show="isOwner" class="text-none ml-3 min-w-6 !p-1" :width="24"
                    @click="() => { onEdit(item) }" size="small" variant="text">
                    <v-tooltip location="top">
                      <template #activator="{ props }">
                        <i class="iconfont icon-font icon-bianji text-grey-4 hover:text-primary-1" v-bind="props"></i>
                      </template>
                      <span>{{ t('myPermissions.editTip') }}</span>
                    </v-tooltip>
                  </v-btn>
                </div>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </template>
    <PermissionTransfer :isDialog="isPermissionTransfer" :selectItem="selectItem"
      @cancelDialog="isPermissionTransfer = false" />
  </v-card>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { t } from '@/lang'
import { useRoute } from 'vue-router'
import usePermission from '@/store/permissions';
import PermissionTransfer from '../components/PermissionTransfer.vue';

type DataItem = {
  nodeLink: string;
  nftsName: string;
  nftsLink: string;
  permissionName: string | number;
  permissionType: number;
  daoId: string;
  daoName: string;
  projectId: string;
  workId: number;
  daoNameNft: string;
  workNumber: number;
  erc721Token: string;
}
const props = defineProps({
  isOwner: Boolean,
  daoId: {
    type: String,
    default: '',
  }
})

const permissionStore = usePermission()
const route = useRoute()
const isLoading = ref(false)
const dataList = ref<DataItem[] | undefined>([])
const isPermissionTransfer = ref(false)
const selectItem = ref({
  workId: route.query.id,
  daoId: props.daoId,
})

const init = async () => {
  try {
    isLoading.value = true
    const workId = Number(route.query.id)
    if (!workId) return
    const data = await permissionStore.getNftPermissionInDetail(workId)
    dataList.value = data
  } catch (error) {
    console.error('error', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  init()
})

const onEdit = (item: any) => {
  isPermissionTransfer.value = true
  selectItem.value = {
    ...item,
    workId: route.query.id,
  }
}

defineExpose({
  dataList,
  isLoading,
  isPermissionTransfer,
  selectItem,
  onEdit,
  init
})
</script>
<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
}
.title {
  @apply text-neutral-500 text-sm font-normal font-['Inter'] capitalize leading-[21px] tracking-tight;
}
</style>
