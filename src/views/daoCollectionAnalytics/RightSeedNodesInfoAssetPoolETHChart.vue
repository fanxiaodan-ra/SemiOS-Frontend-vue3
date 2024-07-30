<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>{{ t('RightSeedNodesInfoAssetPoolETHChart.title') }}</h3>
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
        <div ref="ChartEth" class="chat-box"></div>
      </div>
      <chart-no-data
        v-else
        :title="t('common.noDataInThisRange')"
        :text="t('common.noDataInThisRangeDesc')"
        class="chat-box"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { assetPoolEth } from '@/api/dex'
import ChartNoData from '@/components/ChartNoData.vue'
import { bigNumFormat, roundToSignificantFigures } from '@/utils'
import { ref, inject, onMounted, markRaw } from 'vue'
import { t } from '@/lang'
import dayjs from 'dayjs'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const ChartEth = ref()
const Echarts = inject('$echarts')
const chartData = ref({}) as any
const isLoading = ref(true)
const myChart = ref(null) as any
const getData = async () => {
  const chartquery = { erc20Address: props.dataObj.erc20Address, dayTime: 90 }
  const res = (await assetPoolEth(chartquery)) as any
  chartData.value = {
    xdata: res.data.time,
    yadata: res.data.changes,
    ybdata: res.data.totalAmount,
    ycdata: res.data.incomes,
    yddata: res.data.costs,
    maxVolume: res.data.maxChanges,
    maxPrice: res.data.maxTotalAmount,
  }
  isLoading.value = false
  if (chartData.value.xdata?.length > 0) {
    setTimeout(() => {
      myChart.value = null
      myChart.value = markRaw(
        (Echarts as any).init(ChartEth.value, null, { locale: 'EN' })
      )
      newEcharts()
    }, 500)
  }
}
const option = ref() as any
const newEcharts = () => {
  let maxvolume = 1
  if (Number(chartData.value.maxPrice) > Number(chartData.value.maxVolume)) {
    maxvolume = roundToSignificantFigures(Number(chartData.value.maxPrice))
  } else {
    maxvolume = roundToSignificantFigures(Number(chartData.value.maxVolume))
  }
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
      top: '25%',
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
        )}<br/>${date}`
      },
    },
    legend: [
      {
        left: '20px',
        top: '16px',
        itemWidth: 28,
        itemHeight: 10,
        textStyle: {
          color: '#BBBABA',
        },
        data: ['Asset Pool Changes'],
      },
      {
        left: '220px',
        top: '16px',
        itemWidth: 28,
        itemHeight: 2,
        textStyle: {
          color: '#BBBABA',
        },
        data: ['Asset Pool ETH Balance'],
      },
      {
        left: '20px',
        top: '46px',
        itemWidth: 28,
        itemHeight: 2,
        textStyle: {
          color: '#BBBABA',
        },
        data: ['Asset Pool Income'],
      },
      {
        left: '220px',
        top: '46px',
        itemWidth: 28,
        itemHeight: 2,
        textStyle: {
          color: '#BBBABA',
        },
        data: ['Asset Pool Outcome'],
      },
    ],
    xAxis: [
      {
        type: 'category',
        data: chartData.value.xdata,
        axisLabel: {
          // interval: 2,
          color: '#BBBABA',
          formatter: (value: number) => {
            const date = new Date(value * 1000)
            const mon = date.getMonth()
            const day = date.getDate()
            return `${months[mon]} ${day}`
            // return liangTools.unix2hm(value)
          },
        },
        axisTick: { alignWithLabel: true },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#2F305B',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        scale: true,
        alignTicks: true,
        // name: "Amount（ETH）",
        // interval: 50,
        max: maxvolume,
        interval: maxvolume / 4,
        min: Number(`-${maxvolume / 4}`),

        nameTextStyle: {
          color: '#BBBABA',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 22,
        },
        axisLabel: {
          color: '#BBBABA',
          formatter: (value: any) => {
            return value >= 0 ? value : ''
          },
        },
        splitLine: {
          lineStyle: {
            color: '#2F305B',
          },
        },
      },
      {
        type: 'value',
        name: 'Average Price',

        alignTicks: true,
        max: maxvolume * 4,
        interval: maxvolume,
        min: Number(`-${maxvolume}`),
        nameLocation: 'middle',
        nameGap: 50,
        nameRotate: 270,
        show: false,
      },
    ],
    series: [
      {
        name: 'Asset Pool ETH Balance',
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
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
        name: 'Asset Pool Income',
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        // yAxisIndex: 1,
        itemStyle: {
          color: '#FE8EA9',
          borderColor: '#FE8EA9',
        },
        lineStyle: {
          color: '#FE8EA9',
        },
        data: chartData.value.ycdata,
      },

      {
        name: 'Asset Pool Outcome',
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        // yAxisIndex: 1,
        itemStyle: {
          color: '#573DF6',
          borderColor: '#573DF6',
        },
        lineStyle: {
          color: '#573DF6',
        },
        data: chartData.value.yddata,
      },
      {
        name: 'Asset Pool Changes',
        type: 'bar',
        barMaxWidth: 40,
        yAxisIndex: 1,
        itemStyle: {
          color: '#DCE0E1',
        },
        data: chartData.value.yadata,
      },
    ],
  }
  if (myChart.value) {
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
  margin: 0px;
  margin-left: 12px;
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
  padding: 0 24px;
  box-sizing: border-box;
  .chat-box {
    width: 100%;
    height: 100%;
  }
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
