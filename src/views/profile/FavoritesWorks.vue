<template>
  <div class="div-box">
    <div class="pos_fix">
      <h2>Favorite Works</h2>
      <v-divider class="my-divider"></v-divider>
      <div class="box-top">
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

    <div class="work-card-box">
      <work-item-box
        :list="list"
        :isAll="isAll"
        :isLoading="isLoading"
        v-if="workType === 0"
      />
      <work-item-card
        :list="list"
        :isAll="isAll"
        :isLoading="isLoading"
        v-if="workType === 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import { favoriteWork } from '@/api/works'
import { cancelAllRequests } from '@/api/request'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
const pageSize = ref(10)
const pageNo = ref(1)
const count = ref(0)
const list = ref<any>([])
const isAll = ref(false)
const isLoading = ref(false)
const getData = async () => {
  isLoading.value = true
  const queryObj = {
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }
  const data: any = await favoriteWork(queryObj)
  list.value = list.value.concat(data.dataList)
  count.value = data.page.count
  isAll.value = pageNo.value * pageSize.value >= count.value
  isLoading.value = false
  ifScrollHeight()
}

const ifScrollHeight = () => {
  if (
    window.scrollY > 0 &&
    document.body.scrollHeight <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    !isAll.value
  ) {
    pageNo.value += 1
    isLoading.value = true
    getData()
  }
}
const lazyLoading = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (pageNo.value * pageSize.value < count.value) {
    if (scrollHeight - clientHeight <= scrollTop + 560) {
      if (isLoading.value) return
      pageNo.value += 1
      isLoading.value = true
      getData()
    }
  }
}

const workType = ref(0)
watch(
  () => workType,
  () => {
    list.value = []
    pageNo.value = 1
    isAll.value = false
    cancelAllRequests()
    getData()
  },
  { deep: true }
)
onMounted(() => {
  window.addEventListener('scroll', lazyLoading, true)
  getData()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', lazyLoading, true)
})
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
  width: 80%;
  margin: 0 auto;
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
  width: 80%;
  margin: 24px auto;
  .box-icons {
    text-align: end;
  }
}
</style>
