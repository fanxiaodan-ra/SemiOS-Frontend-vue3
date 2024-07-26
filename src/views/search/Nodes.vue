<template>
  <div class="tnode-card">
    <v-layout>
      <v-main class="flex justify-center">
        <div class="node-card-box" v-if="props.amountObj.daoAmount > 0">
          <node-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            :isSearch="true"
            :searchType="3"
            :is-favorited="true"
            @loadMore="continueLoadData"
          />
        </div>
        <NoItem v-else path="/explore" :query="{ type: 3 }" />
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import useDaoStore from '@/store/dao';
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import NoItem from '@/components/NoItem.vue'
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router';
const props = defineProps({
  amountObj: {
    type: Object,
    default: () => {},
  },
})
const daoStore = useDaoStore()

const list = computed(() => daoStore.searchNodes)
const isAll = computed(() => daoStore.searchNodesPageInfo?.isAll || false)
const isLoading = ref(false)

const route = useRoute()

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
const init = async () => {
  window.scrollTo(0, 0)
  if (daoStore.searchNodes.length > 5) {
    daoStore.searchNodes = [
      ...daoStore.searchNodes.slice(0, 5),
    ]
    daoStore.searchNodesPageQuery.pageNo = 1
    daoStore.searchNodesPageInfo.isAll = false
  } else {
    daoStore.searchNodesPageQuery.pageNo = 0
    daoStore.searchNodesPageInfo = {
      isAll: false,
      count: 0,
    }
    daoStore.searchNodes = []
  }
}

init()

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  daoStore.searchNodesPageQuery.pageNo += 1
  await getData(daoStore.getSearchNodesLazyLoad)
  done('ok')
}


watch(
  () => route.query.query,
  () => {
    if (route.query.query) {
      daoStore.searchNodesPageQuery = {
        ...daoStore.searchNodesPageQuery,
        searchWord: route.query.query as string,
        pageNo: 0,
      }
      daoStore.searchNodes = []
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
