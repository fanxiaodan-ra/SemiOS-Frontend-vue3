<template>
  <div class="tnode-card">
    <v-layout>
      <card-left-filter ref="RefChild" @getConditions="getConditions" />
      <v-main class="flex justify-center">
        <div class="box-top w-[1200px]">
          <div class="top-icon">
            <v-btn @click="callChildMethod" size="40">
              <i class="iconfont icon-tiaojian ft18" />
            </v-btn>
          </div>
          <div class="box-icons">
            <v-btn-toggle v-model="workType" divided mandatory>
              <v-btn size="40">
                <i
                  class="iconfont icon-qiehuanliebiao2 ft18"
                  :class="{ fcb: workType === 0 }"
                />
              </v-btn>
              <v-btn size="40">
                <i
                  class="iconfont icon-qiehuanliebiao1 ft18"
                  :class="{ fcb: workType === 1 }"
                />
              </v-btn>
            </v-btn-toggle>
          </div>
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
        <div class="work-card-box w-full">
          <work-item-box
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            v-if="workType === 0"
            @loadMore="continueLoadData"
          />
          <work-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            @loadMore="continueLoadData"
            v-else
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { cancelAllRequests } from '@/api/request'
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import CardLeftFilter from '@/components/CardLeftFilter.vue'
import { ref, watch, computed } from 'vue'
import useNftsStore from '@/store/nfts'

const options = [
  {
    value: 0,
    label: 'Recently Listed',
  },
  {
    value: 1,
    label: 'Most Favorited',
  },
  {
    value: 2,
    label: 'Price: High to Low',
  },
  {
    value: 3,
    label: 'Price: Low to High',
  },
]

const isLoading = ref(false)
const sortCondition = ref(0)
const nftStore = useNftsStore()
const workType = ref(0)

const list = computed(() => nftStore.exploreNfts || [])
const isAll = computed(() => nftStore.exploreNftsPageInfo?.isAll || false)
const pageSize = computed(() => workType.value === 0 ? 5 : 10)

const getData = async (loadFunc: Function = () => {}, done: Function = () => {}) => {
  isLoading.value = true
  try {
    await loadFunc(workType.value)
    done('ok')
  } catch (error) {
    done('error')
  } finally {
    isLoading.value = false
  }
}


const init = () => {
  window.scrollTo(0, 0)
  if (nftStore.exploreNfts.length > pageSize.value) {
    nftStore.exploreNfts = [
      ...nftStore.exploreNfts.slice(0, pageSize.value),
    ]
    nftStore.exploreNftsPageInfo.isAll = false
    nftStore.exploreNftsPageQuery.pageNo = 1
  } else {
    nftStore.exploreNftsPageQuery.pageNo = 0
    nftStore.exploreNftsPageInfo = {
      isAll: false,
      count: 0,
    }
    nftStore.exploreNfts = []
  }
}

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  nftStore.exploreNftsPageQuery.pageNo += 1
  getData(nftStore.getNftsInExploreLazyLoad, done)
}


const getConditions = (val:any) => {
  nftStore.exploreNftsPageQuery = {
    ...nftStore.exploreNftsPageQuery,
    sortCondition: sortCondition.value,
    pageNo: 0,
  }
  val.fixedPrice >= 0 && (nftStore.exploreNftsPageQuery.fixedPrice = val.fixedPrice)
  Number(val.maxPrice) >= 0 && (nftStore.exploreNftsPageQuery.maxPrice = val.maxPrice)
  Number(val.minPrice) >= 0 && (nftStore.exploreNftsPageQuery.minPrice = val.minPrice)
  nftStore.exploreNfts = []
  cancelAllRequests()
}

const RefChild = ref()

const callChildMethod = () => {
  if (RefChild.value) {
    RefChild.value.setDrawer()
  }
}

watch(
  () => workType.value,
  () => {
    cancelAllRequests()
    init()
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

  .top-icon {
    height: 40px;
    line-height: 40px;

    :deep(.v-btn.v-btn--density-default) {
      height: 40px;
    }

    i {
      cursor: pointer;
    }
  }

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

.icon-body {
  width: 34px;
  height: 34px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b5f2;
  // background-color: #151925;
}

.box-icons {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;

  :deep(.v-btn-group--density-default.v-btn-group) {
    height: 40px;
    margin-left: auto;
    margin-right: 16px;
  }
}

.cen-icons {
  height: 40px;
  display: flex;
  margin-left: auto;
  background-color: #282f41;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-right: 16px;
  padding: 0 16px;
}

.icon-item {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-card-box {
  margin-top: 190px;
  padding-top: 6px;
}
</style>
