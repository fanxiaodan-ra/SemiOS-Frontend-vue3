<template>
  <div class="tnode-card">
    <v-layout>
      <card-left-filter ref="RefChild" @getConditions="getConditions" />
      <v-main class="flex justify-center">
        <div class="box-top justify-center">
          <div class="w-[1200px] flex justify-between">
            <div class="top-icon">
              <v-btn @click="callChildMethod" size="40">
                <i class="iconfont icon-tiaojian ft18" />
              </v-btn>
            </div>
            <div class="box-icons">
              <v-btn-toggle v-model="workType" divided mandatory>
                <v-btn size="40">
                  <i class="iconfont icon-qiehuanliebiao2 ft18" :class="{ fcb: workType === 0 }" />
                </v-btn>
                <v-btn size="40">
                  <i class="iconfont icon-qiehuanliebiao1 ft18" :class="{ fcb: workType === 1 }" />
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-select v-model="sortCondition" label="Select" density="compact" variant="solo" :items="options"
              item-title="label" item-value="value" @update:modelValue="getConditions"></v-select>
          </div>
        </div>
        <div class="work-card-box w-full">
          <work-item-box
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            v-if="workType === 0"
            @loadMore="continueLoadData"
          />
          <work-item-card :list="list" :isAll="isAll" :isLoading="isLoading" @loadMore="continueLoadData" v-else />
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
import useWorkStore from '@/store/work'
import { ref, watch, computed } from 'vue'

const sortCondition = ref(0)
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
const workStore = useWorkStore()

const pageSize = computed(() => workType.value === 0 ? 5 : 10)
const list = computed(() => workStore.exploreWorks)
const isAll = computed(() => workStore.exploreWorksPageInfo?.isAll || false)

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


const init = async () => {
  window.scrollTo(0, 0)
  if (workStore.exploreWorks.length > pageSize.value) {
    workStore.exploreWorks = [
      ...workStore.exploreWorks.slice(0, pageSize.value),
    ]
    workStore.exploreWorksQuery.pageNo = 1
    workStore.exploreWorksPageInfo.isAll = false
  } else {
    workStore.exploreWorksQuery.pageNo = 0
    workStore.exploreWorksPageInfo = {
      isAll: false,
      count: 0,
    }
    workStore.exploreWorks = []
  }
}

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  workStore.exploreWorksQuery.pageNo += 1
  getData(workStore.getWorksInExploreLazyLoad, done)
}

const getConditions = (val: any) => {
  workStore.exploreWorksQuery = {
    ...workStore.exploreWorksQuery,
    sortCondition: sortCondition.value,
    pageNo: 0,
  }
  val.fixedPrice >= 0 && (workStore.exploreWorksQuery.fixedPrice = val.fixedPrice)
  Number(val.maxPrice) >= 0 && (workStore.exploreWorksQuery.maxPrice = val.maxPrice)
  Number(val.minPrice) >= 0 && (workStore.exploreWorksQuery.minPrice = val.minPrice)
  workStore.exploreWorks = []
  cancelAllRequests()
}

const RefChild = ref()

const callChildMethod = () => {
  if (RefChild.value) {
    RefChild.value.setDrawer()
  }
}

const workType = ref(0)

watch(
  () => workType.value,
  () => {
    cancelAllRequests()
    init()
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

.box-top {
  height: 96px;
  display: flex;
  align-items: center;
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
