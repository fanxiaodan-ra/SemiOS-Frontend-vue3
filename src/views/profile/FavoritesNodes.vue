<template>
  <div class="div-box items-center">
    <div class="pos_fix !w-[calc(100%-55px)] min-w-[1225px]">
      <h2>Favorite Nodes</h2>
      <v-divider class="border-purple"></v-divider>
    </div>
    <div class="node-card-box w-full">
      <node-item-card
        :list="list"
        :isAll="isAll"
        :isLoading="isLoading"
        :is-favorited="true"
        @loadMore="continueLoadData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useDaoStore from '@/store/dao';
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import { ref, onMounted, computed } from 'vue'

const daoStore = useDaoStore()

const list = computed(() => daoStore.favouriteNodes)
const isAll = computed(() => daoStore.favouriteNodesPageInfo?.isAll || false)
const isLoading = ref(false)

const getData = async (loadFunc: Function = () => { }, done: Function = () => {}) => {
  isLoading.value = true
  try {
    await loadFunc()
    done('ok')
  } catch (error) {
    done('error')
  } finally {
    isLoading.value = false
  }
}

if (daoStore.favouriteNodes.length > 5) {
  daoStore.favouriteNodes = [
    ...daoStore.favouriteNodes.slice(0, 5),
  ]
  daoStore.favouriteNodesPageInfo.isAll = false
  daoStore.favouriteNodesPageQuery.pageNo = 1
} else {
  daoStore.favouriteNodesPageQuery.pageNo = 0
  daoStore.favouriteNodesPageInfo = {
    isAll: false,
    count: 0,
  }
  daoStore.favouriteNodes = []
}


onMounted(() => {
  window.scrollTo(0, 0)
})

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  daoStore.favouriteNodesPageQuery.pageNo += 1
  getData(daoStore.getFavouriteNodesLazyLoad, done)
}
</script>

<style lang="scss" scoped>
.div-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
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
.node-card-box {
  margin-top: 86px;
  padding-top: 24px;
}
</style>
