<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>Price on Asset Pool</h3>
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
        <div ref="ChartEth" class="chat-box"></div>
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
import { assetPool } from '@/api/dex'
import ChartNoData from '@/components/ChartNoData.vue'
import { bigNumFormat, roundToSignificantFigures } from '@/utils'
import { ref, inject, onMounted, markRaw } from 'vue'
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
const xTimeArr = ref([]) as any
const getData = async () => {
  const chartquery = { erc20Address: props.dataObj.erc20Address, dayTime: 90 }
  const res = (await assetPool(chartquery)) as any
  let timeArr = []
  timeArr = res.data.time.map((item: any) => {
    return dayjs(item * 1000).format('YYYY-MM-DD')
  })

  timeArr.forEach((ele: any) => {
    if (xTimeArr.value.indexOf(ele) > -1) {
      xTimeArr.value.push('')
    } else {
      xTimeArr.value.push(ele)
    }
  })
  chartData.value = {
    xdata: res.data.time,
    yadata: res.data.volume,
    ybdata: res.data.price,
    maxVolume: res.data.maxVolume,
    maxPrice: res.data.maxPrice,
  }

  console.log(chartData.value, 'chartData.value ')
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
  const maxprice = roundToSignificantFigures(Number(chartData.value.maxPrice))
  console.log(maxprice, 'maxprice')
  const maxvolume = roundToSignificantFigures(Number(chartData.value.maxVolume))
  console.log(maxvolume, 'maxvolume')
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
      top: '10%',
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
        return `${params[0].marker}Price:${bigNumFormat(
          params[0].value,
          12,
          0.000000000001
        )}<br/>${params[1].marker}Volume: ${bigNumFormat(
          params[1].value,
          6,
          0.000001
        )}<br/>${date}`
      },
    },
    xAxis: [
      {
        type: 'category',
        data: chartData.value.xdata,
        axisLabel: {
          color: '#9E9E9E',
          hideOverlap: true,
          // interval: 0,
          formatter: (value: any) => {
            const date = new Date(value * 1000)
            const hou = date.getHours()
            const mon = date.getMonth()
            const day = date.getDate()
            const isDay = xTimeArr.value.filter((item: any) => item !== '')
            if (isDay.length < 7) {
              return `${months[mon]} ${day} ${hou}:00`
            } else {
              return `${months[mon]} ${day}`
            }
          },
        },
        axisTick: { alignWithLabel: true },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: '#6062AA',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '',
        // interval: 50,
        max: maxprice,
        // interval: maxprice / 5,
        splitLine: {
          lineStyle: {
            color: '#6062AA',
          },
        },
        min: 0,
        // axisLabel: {
        //   formatter: "{value} ",
        // },
        nameLocation: 'middle',
        nameGap: 60,
        nameRotate: 90,
        nameTextStyle: {
          color: '#9E9E9E',
          fontWeight: 500,
          fontSize: 14,
          lineHeight: 22,
        },
        axisLabel: {
          color: '#9E9E9E',
          formatter: (value: any) => {
            return value >= 0 ? value : ''
          },
        },
      },
      {
        type: 'value',
        name: 'Volume',
        show: false,
        splitLine: {
          lineStyle: {
            color: '#6062AA',
          },
        },
        max: maxvolume * 5,
        min: 0,
        interval: maxvolume,
        nameLocation: 'middle',
        nameGap: 50,
        nameRotate: 270,
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
        name: 'Price（ETH）',
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
        name: 'Volume',
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
  margin: 0px;
  margin-right: 12px;
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
    height: 90%;
    // margin: 0 16px;
  }
}
</style>
