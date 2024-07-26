<template>
  <div class="tnode-card">
    <v-layout>
      <v-main class="flex justify-center">
        <div class="box-top w-[1200px]">
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
        </div>
        <div class="work-card-box w-full" v-if="props.amountObj.workAmount > 0">
          <work-item-box
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            :isSearch="true"
            :searchType="1"
            v-if="workType === 0"
            @loadMore="continueLoadData"
          />
          <work-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            :isSearch="true"
            :searchType="1"
            @loadMore="continueLoadData"
            v-else
          />
        </div>
        <NoItem
          v-else
          path="/explore"
          :query="{ type: 1 }"
        />
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { cancelAllRequests } from '@/api/request'
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import { ref, watch, computed } from 'vue'
import useWorkStore from '@/store/work'
import NoItem from '@/components/NoItem.vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  amountObj: {
    type: Object,
    default: () => {},
  },
})
const isLoading = ref(true)
const workStore = useWorkStore()
const route = useRoute()

const list = computed(() => workStore.searchWorks)
const isAll = computed(() => workStore.searchWorksPageInfo.isAll)

const getData = async (loadFunc: Function = () => { }) => {
  isLoading.value = true
  try {
    await loadFunc(workType.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const init = async () => {
  window.scrollTo(0, 0)
  if (workStore.searchWorks.length > 5) {
    workStore.searchWorks = [
      ...workStore.searchWorks.slice(0, 5),
    ]
    workStore.searchWorksQuery.pageNo = 1
    workStore.searchWorksPageInfo.isAll = false
  } else {
    workStore.searchWorksQuery.pageNo = 0
    workStore.searchWorksPageInfo = {
      isAll: false,
      count: 0,
    }
    workStore.searchWorks = []
  }
}
const workType = ref(0)

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  workStore.searchWorksQuery.pageNo += 1
  await getData(workStore.getWorksInSearchLazyLoad)
  done('ok')
}

init()
watch(
  () => workType.value,
  () => {
    cancelAllRequests()
    init()
  }
)

watch(
  () => route.query.query,
  () => {
    if (route.query.query) {
      workStore.searchWorksQuery = {
        ...workStore.searchWorksQuery,
        searchWord: route.query.query as string,
        pageNo: 0,
      }
      workStore.searchWorks = []
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

.box-icons {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;

  :deep(.v-btn-group--density-default.v-btn-group) {
    height: 40px;
    margin-left: auto;
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
