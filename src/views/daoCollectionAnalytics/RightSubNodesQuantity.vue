<template>
  <div class="tnode-card">
    <div class="node-card-box">
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
import { useRoute } from 'vue-router'

const daoStore = useDaoStore()
const route = useRoute()

const list = computed(() => daoStore.togetherDaoList)
const isAll = computed(() => daoStore.togetherDaoListPageInfo?.isAll || false)
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

if (daoStore.togetherDaoList.length > 5) {
  daoStore.togetherDaoList = [
    ...daoStore.togetherDaoList.slice(0, 5),
  ]
  daoStore.togetherDaoListPageQuery.pageNo = 1
  daoStore.togetherDaoListPageInfo.isAll = false
} else {
  daoStore.togetherDaoListPageQuery.pageNo = 0
  daoStore.togetherDaoListPageInfo = {
    isAll: false,
    count: 0,
  }
  daoStore.togetherDaoList = []
}

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  daoStore.togetherDaoListPageQuery.pageNo += 1
  getData(daoStore.getTogetherNodesLazyLoad, done)
}

onMounted(() => {
  daoStore.togetherDaoListPageQuery.daoId = route.query.id as string
  window.scrollTo(0, 0)
})

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

.node-card-box {
  height: 100%;
}
</style>
