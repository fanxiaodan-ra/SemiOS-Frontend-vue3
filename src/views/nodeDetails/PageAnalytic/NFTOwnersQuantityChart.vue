<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>NFT Owners Quantity</h3>
    </div>
    <div v-if="isLoading" class="chart-body">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="image"
      ></v-skeleton-loader>
    </div>
    <div class="chart-body" v-else>
      <div class="chat-box" v-if="chartData.xdata?.length > 0">
        <div ref="ChartQuantity" class="chat-box"></div>
      </div>
      <chart-no-data
        v-else
        title="No data in this time range"
        text="Try a different time range or check again later."
        class="chat-box"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { analyticsNftOwnersQuantity } from '@/api/daos'
import ChartNoData from '@/components/ChartNoData.vue'
import { ref, inject, watch, onMounted, markRaw } from 'vue'
import dayjs from 'dayjs'
const props = defineProps({
  dayTime: {
    type: Number,
    default: 90,
  },
})

watch(
  () => props.dayTime,
  (val) => {
    console.log(val, 'val')
    isLoading.value = true
    getData()
  }
)
const ChartQuantity = ref()
const Echarts = inject('$echarts')
import { useRoute } from 'vue-router'
const route = useRoute()
const chartData = ref({}) as any
const isLoading = ref(true)
const myChart = ref(null) as any
const getData = async () => {
  const query = { daoId: route.query.id, dayTime: props.dayTime }
  const res = (await analyticsNftOwnersQuantity(query)) as any
  chartData.value = {
    xdata: res.data.times,
    yadata: res.data.price,
    ybdata: res.data.volume,
    maxVolume: res.data.maxVolume,
    maxPrice: res.data.maxPrice,
  }
  isLoading.value = false
  if (chartData.value.xdata?.length > 0) {
    setTimeout(() => {
      myChart.value = null
      myChart.value = markRaw(
        (Echarts as any).init(ChartQuantity.value, null, { locale: 'EN' })
      )
      newEcharts()
    }, 500)
  }
}
const option = ref() as any
const newEcharts = () => {
  // let utc = require('dayjs/plugin/utc')
  // var timezone = require('dayjs/plugin/timezone')
  // dayjs.extend(utc)
  // dayjs.extend(timezone)
  // dayjs.tz.guess();
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]
  const maxprice =
    Number(chartData.value.maxPrice) === 0 ? 1 : chartData.value.maxPrice
  const maxvolume =
    Number(chartData.value.maxVolume) === 0 ? 1 : chartData.value.maxVolume
  option.value = {
    grid: {
      top: '10%',
      left: '8%',
      right: '3%',
      bottom: '5%',
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      triggerOn: 'mousemove',
      axisPointer: {
        crossStyle: {
          color: '#999',
        },
      },
      formatter: function (params: any) {
        const date = dayjs(params[0].name * 1000).format('DD/MM/YYYY HH:mm:ss ')
        return `${params[0].marker}NFT Owners Quantity: <span style="height: 18px; width: 100%;color:#424242 ;font-style: normal;
font-weight: 600;font-size: 16px;"> ${params[0].value}</span><br/>${params[1].marker}NFT Owners Changes:<span style="height: 18px; width: 100%;color:#424242 ;font-style: normal;
font-weight: 600;font-size: 16px;"> ${params[1].value}</span><br/>${date}`
      },
    },
    xAxis: [
      {
        type: 'category',
        data: chartData.value.xdata,
        axisLabel: {
          // interval: 2,
          color: '#757575',
          formatter: (value: any) => {
            const date = new Date(value * 1000)
            const mon = date.getMonth()
            const day = date.getDate()
            return `${months[mon]} ${day}`
            // return liangTools.unix2hm(value)
          },
        },
        axisTick: { alignWithLabel: true },
        axisLine: {
          lineStyle: {
            color: '#2F305B',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Quantity',
        max: maxvolume,
        interval: maxvolume / 5,
        min: Number(`-${maxvolume / 5}`),
        // axisLabel: {
        //   formatter: "{value} ",
        // },
        nameLocation: 'middle',
        nameGap: 40,
        nameRotate: 90,
        nameTextStyle: {
          color: '#BBBABA',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 22,
        },
        splitLine: {
          lineStyle: {
            color: '#2F305B',
          },
        },
        axisLabel: {
          formatter: (value: any) => {
            return value >= 0 ? value : ''
          },
        },
      },
      {
        type: 'value',
        name: 'Average Price',
        max: maxprice * 5,
        interval: maxprice,
        min: Number(`-${maxprice}`),
        nameLocation: 'middle',
        nameGap: 50,
        nameRotate: 270,
        splitLine: {
          lineStyle: {
            color: '#2F305B',
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Quantity',
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        // yAxisIndex: 1,
        itemStyle: {
          color: '#87D3DE',
          borderColor: '#87D3DE',
        },
        lineStyle: {
          color: '#87D3DE',
        },
        data: chartData.value.ybdata,
      },
      {
        name: 'Average Price',
        type: 'bar',
        barMaxWidth: 40,
        yAxisIndex: 1,
        itemStyle: {
          color: '#745CD4',
        },
        data: chartData.value.yadata,
      },
    ],
  }
  if (myChart.value) {
    console.log(myChart.value, 'myChart.value')
    myChart.value.setOption(option.value, true)
    window.addEventListener('resize', function () {
      myChart.value.resize()
    })
  }
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
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
}

.loading-box {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-body {
  width: 100%;
  height: 410px;
  .chat-box {
    width: 100%;
    height: 100%;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
  }
  :deep(.v-skeleton-loader__image) {
    margin: 0 16px;
    height: 370px;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    box-shadow: none !important;
  }
}
</style>
