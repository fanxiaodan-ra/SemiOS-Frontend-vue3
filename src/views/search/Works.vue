<template>
  <div class="tnode-card">
    <v-layout>
      <card-left-filter ref="RefChild" @getConditions="getConditions" />
      <v-main>
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
        <div class="work-card-box">
          <work-item-box
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            :isSearch="true"
            :searchType="1"
            v-if="workType === 0"
          />
          <work-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            :isSearch="true"
            :searchType="1"
            v-if="workType === 1"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { searchWorks } from '@/api/works'
import { cancelAllRequests } from '@/api/request'
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import CardLeftFilter from '@/components/CardLeftFilter.vue'
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  amountObj: {
    type: Object,
    default: () => {},
  },
})
import { useRoute } from 'vue-router'
const route = useRoute()
const list = ref<any>([])
const isAll = ref(true)
const isLoading = ref(false)
const getData = async () => {
  isLoading.value = true
  const data: any = await searchWorks(route.query.query)
  list.value = list.value.concat(data.dataList)
  isLoading.value = false
}

const getConditions = () => {
  cancelAllRequests()
  list.value = []
  getData()
}

const workType = ref(0)
watch(
  () => workType,
  () => {
    list.value = []
    cancelAllRequests()
    getData()
  },
  { deep: true }
)
onMounted(() => {
  if (props.amountObj.workAmount === 0) return
  getData()
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
  margin-top: 24px;
  display: flex;
  position: fixed;
  width: 100%;
  margin-top: 49px;
  // padding: 0 48px;
  z-index: 4;
  background: #1b2233;
  padding: 0 48px;

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
  margin-top: 144px;
  padding-top: 6px;
}
</style>
