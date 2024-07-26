<template>
  <v-card class="node-card">
    <div class="chat-title">
      <h3>Mint</h3>
      <div class="title-right">
        <v-checkbox
          label="Fixed price included "
          color="#745cd4"
          v-model="checked"
        ></v-checkbox>
      </div>
    </div>
    <div v-if="isLoading" class="chart-body">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="image"
      ></v-skeleton-loader>
    </div>
    <div class="chart-body" v-else>
      <div class="chat-box" v-if="chartData.xtime?.length > 0">
        <div ref="ChartMint" class="chat-box"></div>
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
import { analyticsMintScatterPlot } from '@/api/daos'
import ChartNoData from '@/components/ChartNoData.vue'
import { ref, inject, watch, onMounted, markRaw } from 'vue'
import dayjs from 'dayjs'
import $ from 'jquery'
const props = defineProps({
  dayTime: {
    type: Number,
    default: 90,
  },
})
const checked = ref(true)
watch(
  () => checked.value,
  (val) => {
    console.log(val, 'val')
    isLoading.value = true
    getData()
  }
)
watch(
  () => props.dayTime,
  (val) => {
    console.log(val, 'val')
    isLoading.value = true
    getData()
  }
)
const ChartMint = ref()
const Echarts = inject('$echarts')
import { useRoute } from 'vue-router'
const route = useRoute()
const chartData = ref({}) as any
const isLoading = ref(true)
const myChart = ref(null) as any
const getData = async () => {
  const query = {
    daoId: route.query.id,
    dayTime: props.dayTime,
    fixedPrice: checked.value ? 1 : 0,
  }
  const res = (await analyticsMintScatterPlot(query)) as any
  chartData.value = res.data
  isLoading.value = false
  if (chartData.value.xtime?.length > 0) {
    setTimeout(() => {
      myChart.value = null
      myChart.value = markRaw(
        (Echarts as any).init(ChartMint.value, null, { locale: 'EN' })
      )
      newEcharts()
    }, 500)
  }
}
const option = ref() as any
const newEcharts = () => {
  option.value = {
    grid: {
      top: '10%',
      left: '8%',
      right: '3%',
      bottom: '6%',
      containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'item',
      triggerOn: 'mousemove',
      // enterable: true,
      extraCssText: `
  background-color: red;
  height: 92px;
  width: 320px;
  background: #ffffff;
  border: 1px solid #c5dadd;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  padding: 10px;
  box-sizing: border-box;`,
      formatter: (params: any) => {
        if (params.value[1] !== '') {
          const name = chartData.value.name[params.dataIndex]
          const img = chartData.value.image[params.dataIndex]
          const date = dayjs(params.value[0]).format('DD/MM/YYYY HH:mm:ss ')
          //  new Date(params.value[0] * 1000);
          const htmlText =
            `
    <div  id=${params.dataIndex + 'tooltip_one'} class="custom-tooltip-box">
      <div class="skeleton__item" style="width: 72px; height: 72px"></div>
      <div style="flex: 1; margin-left: 12px">
        <div style="height: 18px; width: 30%" class="skeleton__item"></div>
        <div
          style="height: 18px; width: 90%; margin: 6px 0"
          class="skeleton__item"
        ></div>
        <div style="height: 18px; width: 55%" class="skeleton__item"></div>
      </div>
    </div>
    <div id=${
      params.dataIndex + 'tooltip_two'
    } class="custom-tooltip-box" style="display: none;">
      <div style="width: 72px; height: 72px;border: 1px solid #C5DADD;">` +
            "<img style='object-fit: contain; width: 100%; height: 100%;' src='" +
            img +
            "'/>" +
            ` </div>
      <div style="flex: 1; margin-left: 12px">
        <div style="height: 18px; width: 100%;color:#424242 ;font-style: normal;
font-weight: 600;font-size: 16px;">${params.value[1]} ETH</div>
        <div style="height: 18px; width: 100%; margin: 6px 0">
         ${name}
        </div>
        <div style="height: 18px; width: 100%">${date}</div>
      </div>
    </div>
    `
          setTimeout(() => {
            $(`#${params.dataIndex + 'tooltip_two'}`).css('display', 'flex')
            $(`#${params.dataIndex + 'tooltip_one'}`).css('display', 'none')
          }, 1000)
          return htmlText
        } else {
          return ''
        }
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#E5E5E5',
        },
      },
    },
    xAxis: {
      type: 'time',
      min: function (value: any) {
        const das = dayjs(value.min).format('YYYY-MM-DD')
        return dayjs(das).unix() * 1000
      },
      max: function (value: any) {
        const das = dayjs(value.max).add(1, 'day').format('YYYY-MM-DD')
        return dayjs(das).unix() * 1000
      },
      splitNumber: 5,
      dataZoom: [
        {
          show: true,
          start: 0,
          end: 50,
        },
      ],
      axisLabel: {
        // interval: 2,
        color: '#9E9E9E',
        // formatter: "{MMM}{d}",
        // formatter: (value) => {
        //   console.log(value, "asd");
        //   const date = new Date(value);
        //   const mon = date.getMonth();
        //   const day = date.getDate();
        //   return `${months[mon]} ${day}`;
        // },
        formatter: '{MMM} {d}',
      },
      // axisTick: { alignWithLabel: true },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#2F305B',
        },
      },
    },
    yAxis: {
      type: 'value',
      name: 'Price（ETH）',
      nameLocation: 'middle',
      nameGap: 70,
      nameRotate: 90,
      nameTextStyle: {
        color: '#9E9E9E',
        fontWeight: 500,
        fontSize: 14,
      },
      splitLine: {
        lineStyle: {
          color: '#2F305B',
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },

      axisLabel: {
        color: '#9E9E9E',
      },
    },
    series: [
      {
        // type: "scatter",
        symbolSize: 8,
        itemStyle: {
          color: 'rgba(37, 176, 194, 0.6)',
        },
        data: chartData.value.xtime.map((item: any, idx: number) => {
          return [new Date(item * 1000), chartData.value.price[idx]]
        }),
        type: 'effectScatter',
        showEffectOn: 'emphasis',
        rippleEffect: {
          //设置涟漪动画样式
          // color:'purple',
          // brushType:'fill'
          period: 3,
          scale: '3',
          brushType: 'fill',
        },
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
  height: 420px;
  .chat-box {
    width: 100%;
    height: 100%;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    padding: 16px 0;
  }
  :deep(.v-skeleton-loader__image) {
    height: 100%;
    margin: 0 16px;
    padding: 16px 0;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    box-shadow: none !important;
  }
}
</style>
