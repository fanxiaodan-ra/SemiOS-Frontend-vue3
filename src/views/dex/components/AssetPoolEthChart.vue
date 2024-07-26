<template>
  <v-card class="bg-[#1A1F2E] shadow-none w-full">
    <v-card-title class="text-grey-1 text-lg px-0">Asset Pool ETH</v-card-title>
    <div class="chart-body w-full h-[320px]">
      <v-skeleton-loader v-show="isLoading" elevation="12" height="100%" type="image"></v-skeleton-loader>
      <chart-no-data title="No data in this time range" text="Try a different time range or check again later." v-show="!chartData" />
      <div ref="ChartEth" class="w-full h-full"></div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import useDexStore from '@/store/dex'
import ChartNoData from '@/components/ChartNoData.vue'
import { bigNumFormat, roundToSignificantFigures } from '@/utils'
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
  try {
    isLoading.value = true
    const data:any = await dexStore.getAssetPoolEth(chartquery)
    console.log(data, 'data')
    chartData.value = {
      xdata: data.time,
      yadata: data.changes,
      ybdata: data.totalAmount,
      ycdata: data.incomes,
      yddata: data.costs,
      maxVolume: data.maxChanges,
      maxPrice: data.maxTotalAmount,
    }
    newEcharts(chartData.value)
    // console.log(chartData, 'chartData ')
  } catch (error) {
    console.log(error, 'error')
  } finally {
    isLoading.value = false
    console.log(isLoading.value, 'isLoading')
  }
}
const option = ref() as any
const newEcharts = (chartData:any) => {
  let maxvolume = 1
  if (Number(chartData.maxPrice) > Number(chartData.maxVolume)) {
    maxvolume = roundToSignificantFigures(Number(chartData.maxPrice))
  } else {
    maxvolume = roundToSignificantFigures(Number(chartData.maxVolume))
  }
  console.log(maxvolume, 'maxvolumemaxvolumemaxvolume')
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
      top: "10%",
      left: "5%",
      right: "3%",
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
      formatter: function (params:any) {
        const date = dayjs(params[0].name * 1000).format(
          "DD/MM/YYYY HH:mm:ss "
        );
        return `${params[0].marker}${params[0].seriesName}: ${bigNumFormat(
          params[0].value,
          4,
          0.0001
        )}<br/>${params[1].marker}${params[1].seriesName}: ${bigNumFormat(
          params[1].value,
          4,
          0.0001
        )}<br/>${params[2].marker}${params[2].seriesName}: ${bigNumFormat(
          params[2].value,
          4,
          0.0001
        )}<br/>${params[3].marker}${params[3].seriesName}: ${bigNumFormat(
          params[3].value,
          4,
          0.0001
        )}<br/>${date}`;
      },
    },
    xAxis: [
      {
        type: "category",
        data: chartData.xdata,
        axisLabel: {
          color: "#9E9E9E",
          formatter: (value:number) => {
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
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Amount（ETH）",
        // interval: 50,
        max: maxvolume,
        interval: maxvolume / 4,
        min: Number(`-${maxvolume / 4}`),
        nameLocation: "middle",
        nameGap: 60,
        nameRotate: 90,
        axisLabel: {
          formatter: (value:number) => {
            return value >= 0 ? value : "";
          },
        },
        splitLine: {
          lineStyle: {
            color: "#2F305B",
          },
        },
      },
      {
        type: "value",
        name: "Average Price",
        max: maxvolume * 4,
        interval: maxvolume,
        min: Number(`-${maxvolume}`),
        nameLocation: "middle",
        nameGap: 50,
        nameRotate: 270,
        show: false,
        splitLine: {
          lineStyle: {
            color: "#2F305B",
          },
        },
      },
    ],
    series: [
      {
        name: "Asset Pool ETH Balance",
        type: "line",
        symbol: "circle",
        symbolSize: 1,
        // yAxisIndex: 1,
        itemStyle: {
          color: "#87D3DE",
          borderColor: "#87D3DE",
        },
        lineStyle: {
          color: "#87D3DE",
        },
        data: chartData.ybdata,
      },

      {
        name: "Asset Pool Income",
        type: "line",
        symbol: "circle",
        symbolSize: 1,
        // yAxisIndex: 1,
        itemStyle: {
          color: "#FE8EA9",
          borderColor: "#FE8EA9",
        },
        lineStyle: {
          color: "#FE8EA9",
        },
        data: chartData.ycdata,
      },

      {
        name: "Asset Pool Outcome",
        type: "line",
        symbol: "circle",
        symbolSize: 1,
        // yAxisIndex: 1,
        itemStyle: {
          color: "#573DF6",
          borderColor: "#573DF6",
        },
        lineStyle: {
          color: "#573DF6",
        },
        data: chartData.yddata,
      },
      {
        name: "Asset Pool Changes",
        type: "bar",
        barMaxWidth: 40,
        yAxisIndex: 1,
        itemStyle: {
          color: "#DCE0E1",
        },
        data: chartData.yadata,
      },
    ],
  }
  console.log(option.value)
}

watch(() => option.value, (option: any) => {
  myChartInstance.setOption(option)
})

watch(() => dexStore.ercToken, (ercToken: any) => {
  console.log(ercToken, 'ercToken')
  if (ercToken.erc20Address !== '') {
    getData()
  }
}, {immediate: true, deep: true})

onMounted(() => {
  myChartInstance = echarts.init(ChartEth.value, null, { locale: 'EN' })
  
  window.addEventListener('resize', function () {
    myChart.value && myChart.value.resize()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', function () {
    myChart.value  && myChart.value.resize()
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
