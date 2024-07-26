<template>
  <div class="tnode-card">
    <v-layout>
      <v-main class="flex justify-center">
        <div class="node-card-box w-full">
          <SeedNodeItemCard
            :list="list"
            :isAll="isAll"
            :isLoading="loading"
            :isFavorited="false"
            @loadMore="continueLoadData"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import useSeedNodeStore from '@/store/seedNodes'
import SeedNodeItemCard from '@/components/nodeItem/seedNode/Index.vue'
import { ref, onMounted, computed } from 'vue'

const seedNodeStore = useSeedNodeStore()
const loading = ref(false)

const list = computed(() => seedNodeStore.explorerSeedNodes)
const isAll = computed(() => seedNodeStore.explorerSeedNodesPageInfo?.isAll || false)

const getData = async (loadFunc: Function = () => {}, done: Function = () => {}) => {
  loading.value = true
  try {
    await loadFunc()
    done('ok')
  } catch (error) {
    done('error')
  } finally {
    loading.value = false
  }
}

if (seedNodeStore.explorerSeedNodes.length > 5) {
  seedNodeStore.explorerSeedNodes = [
    ...seedNodeStore.explorerSeedNodes.slice(0, 5),
  ]
  seedNodeStore.explorerSeedNodesPageQuery.pageNo = 1
  seedNodeStore.explorerSeedNodesPageInfo.isAll = false
} else {
  seedNodeStore.explorerSeedNodesPageQuery.pageNo = 0
  seedNodeStore.explorerSeedNodesPageInfo = {
    isAll: false,
    count: 0,
  }
  seedNodeStore.explorerSeedNodes = []
}

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  seedNodeStore.explorerSeedNodesPageQuery.pageNo += 1
  getData(seedNodeStore.getExploreSeedNodes, done)
}

onMounted(() => {
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

.box-top {
  height: 96px;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-top: 24px;
  display: flex;
  position: fixed;
  margin-top: 93px;
  z-index: 4;
  background: #151925;

  :deep(.v-input) {
    flex: none;
  }

  :deep(.v-input__details) {
    display: none;
  }
}

:deep(.v-layout) {
  height: 100%;
}

.nav-box {
  background-color: #151925;

  h4 {
    padding: 0 16px;
    color: #bbbaba;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 22px;
  }
}

.nav-top {
  height: 86px;

  i {
    cursor: pointer;
  }
}

.node-card-box {
  margin-top: 144px;
  height: 100%;
}

.box-top-right {
  justify-content: flex-end;
}
</style>
