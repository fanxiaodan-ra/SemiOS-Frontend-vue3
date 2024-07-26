<template>
  <div class="tnode-card">
    <v-layout>
      <v-main class="flex justify-center">
        <div class="box-top w-[1200px]">
          <div class="box-top-right">
            <v-select
              v-model="sortCondition"
              label="Select"
              density="compact"
              variant="solo"
              :items="options"
              item-title="label"
              item-value="value"
              @update:modelValue="getConditions"
            ></v-select>
          </div>
        </div>
        <div class="node-card-box w-full">
          <node-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="loading"
            :is-favorited="true"
            @loadMore="continueLoadData"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import useDaoStore from '@/store/dao';
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import { ref, computed, onMounted } from 'vue'
import { cancelAllRequests } from '@/api/request';
const options = [
  {
    value: 0,
    label: 'Recently Listed',
  },
  {
    value: 1,
    label: 'Most Favorited',
  },
]
const sortCondition = ref(0)
const daoStore = useDaoStore()

const list = computed(() => daoStore.explorerNodes)
const isAll = computed(() => daoStore.explorerNodesPageInfo?.isAll || false)

const loading = ref(false)

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

if (daoStore.explorerNodes.length > 5) {
  daoStore.explorerNodes = [
    ...daoStore.explorerNodes.slice(0, 5),
  ]
  daoStore.explorerNodesPageQuery.pageNo = 1
  daoStore.explorerNodesPageInfo.isAll = false
} else {
  daoStore.explorerNodesPageQuery.pageNo = 0
  daoStore.explorerNodesPageInfo = {
    isAll: false,
    count: 0,
  }
  daoStore.explorerNodes = []

}

onMounted(() => {
  window.scrollTo(0, 0)
})

const continueLoadData = async ({
  done,
}: {
  done: (val:string) => void
}) => {
  daoStore.explorerNodesPageQuery.pageNo += 1
  getData(daoStore.getExplorerNodesLazyLoad, done)
}

const getConditions = (val: number) => {
  daoStore.explorerNodesPageQuery = {
    ...daoStore.explorerNodesPageQuery,
    pageNo: 0,
    sortCondition: val,
  }
  daoStore.explorerNodes = []
  cancelAllRequests()
}

</script>
<style lang="scss" scoped>
.tnode-card {
  flex: 1;
  height: 100%;

  :deep(.v-input__control) {
    width: 240px;
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
  margin-top: 190px;
  height: 100%;
}

.box-top-right {
  width: 100%;
  justify-content: flex-end;
}
</style>
