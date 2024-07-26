<template>
  <div class="div-box items-center">
    <div class="pos_fix !w-[calc(100%-55px)] min-w-[1225px]">
      <h2>Favorite Works</h2>
      <v-divider class="border-purple"></v-divider>
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
        v-if="workType === 1"
        @loadMore="continueLoadData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import { cancelAllRequests } from '@/api/request'
import useWorkStore from '@/store/work'
import { ref, watch, computed } from 'vue'
const isLoading = ref(false)
const workStore = useWorkStore()

const list = computed(() => workStore.favoriteWorks)
const isAll = computed(() => workStore.favoriteWorksPageInfo.isAll)
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

const init = async () => {
  window.scrollTo(0, 0)

  if (workStore.favoriteWorks.length > pageSize.value) {
    workStore.favoriteWorks = [
      ...workStore.favoriteWorks.slice(0, pageSize.value),
    ]
    workStore.favoriteWorksPageInfo.isAll = false
    workStore.favoriteWorksQuery.pageNo = 1
  } else {
    workStore.favoriteWorksQuery.pageNo = 0
    workStore.favoriteWorksPageInfo = {
      isAll: false,
      count: 0,
    }
    workStore.favoriteWorks = []
  }
}
const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  workStore.favoriteWorksQuery.pageNo += 1
  getData(workStore.getWorksInFavouriteLazyLoad, done)

}

const workType = ref(0)
init()
watch(
  () => workType.value,
  () => {
    cancelAllRequests()
    init()
  }
)
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
.work-card-box {
  padding-top: 24px;
  margin-top: 150px;
}
.t-card {
  padding: 0;
}
.box-top {
  :deep(.v-btn-group--density-default.v-btn-group) {
    height: 40px;
  }
  margin: 24px auto;
  .box-icons {
    text-align: end;
  }
}
</style>
