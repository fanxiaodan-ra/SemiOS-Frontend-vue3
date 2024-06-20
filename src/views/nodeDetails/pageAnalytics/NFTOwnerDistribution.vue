<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>NFT Owner Distribution</h3>
      <h5>{{ chartData.length === 0 ? 0 : amount }}</h5>
    </div>
    <div v-if="isLoading" class="chart-body">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        width="100%"
        type="list-item,list-item,list-item,list-item"
      ></v-skeleton-loader>
    </div>
    <div class="chart-body" v-else>
      <div class="chat-box" v-if="chartData?.length > 0">
        <div class="body-box">
          <div
            class="box-item"
            v-for="(item, idx) in chartData"
            :key="item.range + idx"
            :style="marginStyle()"
          >
            <div class="item-text">
              <span>{{
                itemText(item.ratio) ? lessNum : item.ratio + '%'
              }}</span>
              <span class="text-right">{{ item.range }}</span>
            </div>
            <div class="item-div">
              <div class="div-item" :style="{ width: item.ratio + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      <chart-no-data
        v-else
        title="No events have occurred yet"
        text="Check again later."
        class="chat-box"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { analyticsOwnerDistribution } from '@/api/daos'
import ChartNoData from '@/components/ChartNoData.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const chartData = ref([]) as any
const amount = ref(0)
const isLoading = ref(true)
const getData = async () => {
  const query = {
    daoId: route.query.id,
  }
  const data = (await analyticsOwnerDistribution(query)) as any
  chartData.value = data.dataList
  amount.value = data.data.amount
  isLoading.value = false
}
const lessNum = '< 1%'
const itemText = (item: any) => {
  return Math.abs(item) < 1 && Math.abs(item) > 0
}
const marginStyle = () => {
  const length = chartData.length
  return {
    'margin-bottom': (344 - length * 54) / length + 'px',
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #252b3a !important;
  padding: 0 !important;
  margin: 8px;
}
.chat-title {
  display: flex;
  margin-top: 24px;
  padding-left: 24px;

  h3 {
    color: #bbbaba;
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  h5 {
    line-height: 27px;
    margin-left: auto;
    margin-right: 24px;
    color: #bbbaba;
    font-size: 14px;
  }
  .title-right {
    margin-left: auto;
    margin-right: 24px;
  }

  :deep(.v-input__details) {
    display: none;
  }
  :deep(.v-checkbox .v-selection-control) {
    min-height: auto;
    display: flex;
    justify-content: end;
  }
  :deep(.v-selection-control__wrapper) {
    height: 28px;
  }
}

.loading-box {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-body {
  width: 100%;
  height: 380px;
  display: flex;
  align-items: center;
  .chat-box {
    width: 100%;
    // height: 100%;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
  }
  :deep(.v-skeleton-loader__image) {
    height: 300px;
    margin: 0 16px;
  }
}

.body-box {
  box-sizing: border-box;
  margin: 0 24px;
  margin-top: 24px;

  .box-item {
    margin-bottom: 36px;
    height: 54px;
  }
}

.item-text {
  height: 22px;
  line-height: 22px;
  color: #9e9e9e;
  font-size: 14px;
  font-family: Inter6;
  margin-bottom: 8px;

  .text-right {
    float: right;
    color: #9e9e9e;
  }
}

.item-div {
  height: 24px;
  background: rgba(37, 176, 194, 0.12);
  border-radius: 2px;
}

.div-item {
  background: #87d3de;
  border-radius: 2px;
  height: 100%;
}
:deep(.v-skeleton-loader) {
  background-color: transparent;
  box-shadow: none !important;
}
</style>
