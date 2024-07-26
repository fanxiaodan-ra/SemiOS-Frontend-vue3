<template>
  <div class="tnode-card">
    <v-layout>
      <v-main class="flex justify-center">
        <div class="node-card-box" v-if="props.amountObj.seedNodesAmount > 0">
          <SeedNodeItemCard
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            :isSearch="true"
            :searchType="4"
            :isFavorited="false"
            @loadMore="continueLoadData"
          />
        </div>
        <NoItem v-else path="/explore" :query="{ type: 4 }" />
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import useDaoStore from '@/store/dao';
import SeedNodeItemCard from '@/components/nodeItem/seedNode/Index.vue'
import NoItem from '@/components/NoItem.vue'

import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  amountObj: {
    type: Object,
    default: () => {},
  },
})
const route = useRoute()
const daoStore = useDaoStore()

const list = computed(() => daoStore.searchSeedNodes)
const isAll = computed(() => daoStore.searchSeedNodesPageInfo?.isAll || false)
const isLoading = ref(false)

const getData = async (loadFunc: Function = () => { }) => {
  isLoading.value = true
  try {
    await loadFunc()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  await getData(daoStore.getSearchSeedNodesLazyLoad)
  done('ok')
}

daoStore.searchSeedNodesPageInfo.isAll = false

watch(
  () => route.query.query,
  () => {
    if (route.query.query) {
      daoStore.searchSeedNodesPageQuery = {
        searchWord: route.query.query as string,
      }
      daoStore.searchSeedNodes = []
    }
  }, {
  immediate: true,
}
)
</script>
<style lang="scss" scoped>
.tnode-card {
  flex: 1;
  height: 100%;

  :deep(.v-input__control) {
    width: 100%;
    margin-left: auto;
  }
}

:deep(.v-layout) {
  height: 100%;
}

.node-card-box {
  margin-top: 144px;
  height: 100%;
  padding-top: 6px;
}
</style>
