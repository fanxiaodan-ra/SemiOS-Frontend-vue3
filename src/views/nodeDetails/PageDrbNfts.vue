<template>
  <div class="tnode-card">
    <v-layout>
      <card-left-filter
        ref="RefChild"
        @getConditions="getConditions"
        noTopHeight="64px"
      />
      <v-main>
        <div class="box-top">
          <div class="top-icon">
            <v-btn @click="callChildMethod" size="40">
              <i class="iconfont icon-tianjia ft24" />
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
            v-model="query.sortCondition"
            label="Select"
            density="compact"
            variant="solo"
            :items="options"
            item-title="label"
            item-value="value"
            @update:modelValue="getConditions(query)"
          ></v-select>
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
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { daoDrbNfts } from '@/api/works'
import { cancelAllRequests } from '@/api/request'
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import CardLeftFilter from '@/components/CardLeftFilter.vue'
import { ref, onMounted, onBeforeUnmount, reactive, watch } from 'vue'
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
const qvalue = ref(0)
const query = reactive({
  sortCondition: 0,
  fixedPrice: 2,
  minPrice: 0,
  maxPrice: 999999999,
})
const pageSize = ref(10)
const pageNo = ref(1)
const count = ref(0)
const list = ref<any>([])
const isAll = ref(false)
const isLoading = ref(false)
import { useRoute } from 'vue-router'
const route = useRoute()
const getData = async () => {
  isLoading.value = true
  const queryObj = {
    daoId: route.query.id,
    sortCondition: query.sortCondition,
    fixedPrice: query.fixedPrice,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }
  const data: any = await daoDrbNfts(queryObj)
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

const getConditions = (val: any) => {
  cancelAllRequests()
  qvalue.value = 3
  query.maxPrice = val.maxPrice
  query.minPrice = val.minPrice
  query.fixedPrice = val.fixedPrice
  pageNo.value = 1
  list.value = []
  isAll.value = false
  getData()
}

const RefChild = ref()
const callChildMethod = () => {
  if (RefChild.value) {
    RefChild.value.setDrawer()
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
  display: flex;
  width: 100%;
  z-index: 4;
  background: #1b2233;
  padding: 0 48px;

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
  background-color: #1b2233;

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
  // background-color: #1b2233;
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
</style>
