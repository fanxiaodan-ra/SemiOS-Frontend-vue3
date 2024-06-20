<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>Volume and Average Price</h3>
    </div>
    <div v-if="isLoading" class="chart-body">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="table-heading,  image"
      ></v-skeleton-loader>
    </div>
    <div class="chart-body" v-else>
      <div class="chat-box" v-if="chartData.xdata?.length > 0">
        <div ref="ChartVolume" class="chat-box"></div>
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
import { analyticsAveragePrice } from '@/api/daos'
import ChartNoData from '@/components/ChartNoData.vue'
import { ref, inject, watch, onMounted, markRaw } from 'vue'
import dayjs from 'dayjs'
import { BigNumber } from 'bignumber.js'
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
const ChartVolume = ref()
const Echarts = inject('$echarts')
import { useRoute } from 'vue-router'
const route = useRoute()
const chartData = ref({}) as any
const isLoading = ref(true)
const myChart = ref(null) as any
const getData = async () => {
  const query = { daoId: route.query.id, dayTime: props.dayTime }
  const res = (await analyticsAveragePrice(query)) as any
  chartData.value = {
    xdata: res.data.times,
    yadata: res.data.volume,
    ybdata: res.data.price,
    maxVolume: res.data.maxVolume,
    maxPrice: res.data.maxPrice,
  }
  isLoading.value = false
  if (chartData.value.xdata?.length > 0) {
    setTimeout(() => {
      myChart.value = null
      myChart.value = markRaw(
        (Echarts as any).init(ChartVolume.value, null, { locale: 'EN' })
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
  option.value = {
    grid: {
      top: '15%',
      left: '5%',
      right: '5%',
      bottom: '5%',
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      triggerOn: 'mousemove',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#E5E5E5',
        },
      },
      formatter: function (params: any) {
        const date = dayjs(params[0].name * 1000).format('DD/MM/YYYY HH:mm:ss ')
        return `${params[0].marker}${params[0].seriesName}: <span style="height: 18px; width: 100%;color:#424242 ;font-style: normal;font-weight: 400;font-size: 14px;"> 
              ${params[0].value}
            </span>
            <br/>
            ${params[1].marker}${params[1].seriesName}: 
              <span style="height: 18px; width: 100%;color:#424242 ;font-style: normal;font-weight: 400;font-size: 14px;"> 
                ${params[1].value}
              </span>
            <br/>
            ${date}`
      },
    },
    legend: {
      left: '20px',
      top: '16px',
      itemWidth: 20,
      itemHeight: 2,
      textStyle: {
        color: '#9E9E9E',
      },
      data: ['Volume', 'Average Price'],
    },
    xAxis: [
      {
        type: 'category',
        data: chartData.value.xdata,
        axisLabel: {
          // interval: 2,
          color: '#9E9E9E',
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
          onZero: true,
          lineStyle: {
            color: '#6062AA',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Volume（ETH）',
        splitLine: {
          lineStyle: {
            color: '#6062AA',
          },
        },
        // interval: 50,
        max: chartData.value.maxVolume,
        interval: new BigNumber(chartData.value.maxVolume).div(5).toNumber(),
        nameTextStyle: {
          color: '#9E9E9E',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 22,
        },
        axisLabel: {
          color: '#9E9E9E',
          formatter: '{value} ',
        },
        nameLocation: 'middle',
        nameGap: 60,
        nameRotate: 90,
      },
      {
        type: 'value',
        name: 'Average Price（ETH）',
        // interval: 5,
        max: chartData.value.maxVolume,
        splitLine: {
          lineStyle: {
            color: '#6062AA',
          },
        },
        interval: new BigNumber(chartData.value.maxVolume).div(5).toNumber(),
        nameTextStyle: {
          color: '#9E9E9E',
          fontWeight: 500,
          fontSize: 14,
        },
        axisLabel: {
          color: '#9E9E9E',
          formatter: '{value} ',
        },
        nameLocation: 'middle',
        nameGap: 60,
        // nameRotate: 270,
      },
    ],
    series: [
      {
        name: 'Volume',
        type: 'bar',
        barMaxWidth: 40,
        itemStyle: {
          color: '#745CD4',
        },
        emphasis: {
          itemStyle: {
            color: '#745CD4',
          },
        },
        data: chartData.value.yadata,
      },
      {
        name: 'Average Price',
        type: 'line',
        symbol: 'circle',
        yAxisIndex: 1,
        itemStyle: {
          borderWidth: 2,
          color: '#87D3DE',
          borderColor: '#FFFFFF',
        },
        showSymbol: false,
        symbolSize: 8,
        lineStyle: {
          color: '#87D3DE',
        },
        data: chartData.value.ybdata,
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
}

.loading-box {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chart-body {
  width: 100%;
  height: 420px;
  .chat-box {
    width: 100%;
    height: 100%;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
  }
  :deep(.v-skeleton-loader__image) {
    height: 300px;
    margin: 0 16px;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    box-shadow: none !important;
  }
}
</style>
