<template>
  <v-card class="bg-[#1A1F2E] shadow-none w-full">
    <v-card-title class="text-grey-1 text-lg px-0">Royalty APY</v-card-title>
    <div class="chart-body w-full h-[320px]">
      <v-skeleton-loader v-show="isLoading" elevation="12" height="100%" type="image"></v-skeleton-loader>
      <chart-no-data title="No data in this time range" text="Try a different time range or check again later."
        v-show="!chartData" />
      <div ref="ChartEth" class="w-full h-full"></div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import useDexStore from '@/store/dex'
import ChartNoData from '@/components/ChartNoData.vue'
import { ref, onMounted, watch, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import * as echarts from 'echarts';


const dexStore = useDexStore()
const ChartEth = ref()
const chartData = ref()
const isLoading = ref(false)
const myChart = ref(null) as any
let myChartInstance: echarts.ECharts;

const getData = async () => {
  const chartquery = { dayTime: 7 }
  console.log(chartquery, 'chartquery')
  try {
    isLoading.value = true
    const data = await dexStore.getApy(chartquery)
    console.log(data, 'data')
    chartData.value = data
    newEcharts(chartData.value)
  } catch (error) {
    console.log(error, 'error')
  } finally {
    isLoading.value = false
    console.log(isLoading.value, 'isLoading')
  }
}
const option = ref() as any
const newEcharts = (chartData: any) => {
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
    color: ["#B3B5F2"],
    grid: {
      top: "12%",
      left: "8%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      triggerOn: "mousemove",
      axisPointer: {
        crossStyle: {
          color: "#999",
        },
      },
      formatter: function (params: any) {
        const date = dayjs(params[0].name * 1000).format(
          "DD/MM/YYYY HH:mm:ss "
        );
        const value = params[0].value ? params[0].value : params[1].value;
        return `${params[0].marker}APY: ${value}%<br/>${date}`;
      },
    },
    xAxis: {
      type: "category",
      axisLabel: {
        color: "#9E9E9E",
        formatter: (value: number) => {
          const date = new Date(value * 1000);
          const mon = date.getMonth();
          const day = date.getDate();
          return `${months[mon]} ${day}`;
        },
      },
      axisTick: { alignWithLabel: true },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: "#2F305B",
        },
      },
      data: chartData.xdata,
    },
    yAxis: {
      name: "APY",
      nameLocation: "middle",
      nameGap: 50,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        // interval: 2,
        color: "#9E9E9E",
        formatter: (value:number) => {
          return `${value}%`;
        },
      },
      splitLine: {
        lineStyle: {
          color: "#2F305B",
        },
      },
    },
    series: [
      {
        data: chartData.yadata,
        type: "line",
        showSymbol: false,
      },
      {
        data: chartData.ybdata,
        type: "line",
        showSymbol: false,
        lineStyle: {
          width: 2,
          type: "dotted",
        },
      },
    ],
  }
}

watch(() => option.value, (option: any) => {
  myChartInstance.setOption(option)
})

watch(() => dexStore.ercToken, (ercToken: any) => {
  console.log(ercToken, 'ercToken')
  if (ercToken.erc20Address !== '') {
    getData()
  }
}, { immediate: true, deep: true })

onMounted(() => {
  myChartInstance = echarts.init(ChartEth.value, null, { locale: 'EN' })

  window.addEventListener('resize', function () {
    myChart.value &&  myChart.value.resize()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', function () {
    myChart.value && myChart.value.resize()
  })
})
</script>

<style scoped lang="scss">
.chart-body {
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    box-shadow: none !important;
  }

  :deep(.v-skeleton-loader__image) {
    height: 300px;
    margin: 0 16px;
  }
}
</style>
