<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>Transactions</h3>
    </div>
    <div v-if="isLoading" class="chart-body">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        width="100%"
        type="list-item,list-item,list-item,list-item,list-item,list-item,list-item,list-item,list-item,list-item,list-item,list-item,list-item"
      ></v-skeleton-loader>
    </div>
    <div class="chart-body" v-else>
      <div class="chat-box" v-if="list?.length > 0">
        <div class="body-box">
          <RightSeedNodesInfoTransactionsTable :list="list" />
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
import { transaction } from '@/api/dex'
import ChartNoData from '@/components/ChartNoData.vue'
import RightSeedNodesInfoTransactionsTable from './RightSeedNodesInfoTransactionsTable.vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const list = ref([]) as any
const isLoading = ref(true)
const getData = async () => {
  const ercquery = {
    erc20Address: props.dataObj.erc20Address,
    tradeType: [1, 2, 5],
    pageSize: 9999,
  }
  const data = (await transaction(ercquery)) as any
  list.value = data.dataList
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #252b3a !important;
  padding: 0 !important;
  margin: 0;
  // height: 955px;
  padding-bottom: 24px !important;
  margin-bottom: 24px;
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
  height: 100%;
  .chat-box {
    width: 100%;
    height: 576px;
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
    margin-bottom: 18px;
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
</style>
