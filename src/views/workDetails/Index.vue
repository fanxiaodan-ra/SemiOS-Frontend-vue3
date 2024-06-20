<template>
  <loading v-if="isLoading" />
  <div class="det-body" v-else>
    <!-- TODO NFT锁定 -->
    <v-alert
      color="#533fa1"
      icon="mdi-alert-circle"
      theme="dark"
      border
      class="alert-box"
      v-if="countdownData.isCountdown"
    >
      {{ alertText }} {{ countdownData.h }} Hours :
      {{ countdownData.m }} Minutes : {{ countdownData.s }} Seconds
    </v-alert>
    <WorkTopBalance
      :topUpBalanceList="topUpBalanceList"
      v-if="dataObj.workStatus === 1 && topUpBalanceList.length > 0"
    />
    <WorkCurrent :dataObj="dataObj" />
    <WorkTitle
      :dataObj="dataObj"
      :countdownData="countdownData"
      @getData="getData"
    />
    <WorkMintFee :dataObj="dataObj" v-if="!dataObj.topupMode" />
    <WorkProportion
      :dataObj="dataObj"
      v-if="dataObj.workStatus === 0 && !dataObj.topupMode"
    />
    <WorkDetail :dataObj="dataObj" />
    <WorkDescription :dataObj="dataObj" />
  </div>
</template>
<script setup lang="ts">
import WorkTitle from './WorkTitle.vue'
import WorkMintFee from './WorkMintFee.vue'
import WorkProportion from './WorkProportion.vue'
import WorkDetail from './WorkDetail.vue'
import WorkCurrent from './WorkCurrent.vue'
import WorkDescription from './WorkDescription.vue'
import WorkTopBalance from './WorkTopBalance.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import useUserStore from '@/store'
// const store = useUserStore()
import { workDetail, workDetailNft } from '@/api/works'
import { useRoute } from 'vue-router'
const route = useRoute()
import Loading from '@/components/Loading.vue'
const isLoading = ref(true)
const dataObj = ref<any>({})
const topUpBalanceList = ref<any>([])
const countdownData = ref({
  h: 0,
  m: 0,
  s: 0,
  isCountdown: false,
})
const alertText = ref('')
import { countdown } from '@/utils'
const getData = async () => {
  alertText.value = ''
  clearInterval(timeDisplay.value)
  timeDisplay.value = null
  countdownData.value = {
    h: 0,
    m: 0,
    s: 0,
    isCountdown: false,
  }
  const data = await workDetail({ workId: route.query.id })
  dataObj.value = {
    ...data.data,
    imgHeight: Math.floor((420 / 260) * data.data.height),
  }
  if (dataObj.value.workStatus === 1) {
    const listData = await workDetailNft({
      workId: dataObj.value.workId,
      pageSize: -1,
    })
    topUpBalanceList.value = (listData as any).dataList
  }
  if (dataObj.value.workStatus === 0 && dataObj.value.nextDrbStartTime > 0) {
    alertText.value =
      'This Nodes has reached its Block Mint Cap, you need to wait for the next Block to mint.'
    const countdownObj = countdown(dataObj.value.nextDrbStartTime)
    countdownData.value = {
      ...countdownObj,
      isCountdown: true,
    }
    console.log(countdownData, 'countdownData')
    setTimeNum('nextDrbStartTime')
    // setTimeNum()
  }
  if (
    dataObj.value.workStatus === 1 &&
    dataObj.value.workLockStatus === 1 &&
    dataObj.value.lockTime > 0
  ) {
    alertText.value = 'This NFT is locked. Remaining lock time:'
    const countdownObj = countdown(dataObj.value.lockTime)
    countdownData.value = {
      ...countdownObj,
      isCountdown: true,
    }
    console.log(countdownData, 'countdownData')
    setTimeNum('lockTime')
  }
  isLoading.value = false
}
const timeDisplay = ref<any>(null)
const setTimeNum = (type: string) => {
  clearInterval(timeDisplay.value)
  timeDisplay.value = null
  timeDisplay.value = setInterval(() => {
    dataObj.value[type] -= 1
    if (dataObj.value[type] > 0) {
      const countdownObj = countdown(dataObj.value[type])
      countdownData.value = {
        ...countdownObj,
        isCountdown: true,
      }
    } else {
      clearInterval(timeDisplay.value)
      timeDisplay.value = null
      getData()
    }
  }, 1000)
}
// const setFavorite = (obj: any) => {
//   dataObj.value.favoritesAmount += obj.favoritesAmount
//   dataObj.value.favorited = obj.favorited
// }
onMounted(() => {
  getData()
})
onBeforeUnmount(() => {
  clearInterval(timeDisplay.value)
  timeDisplay.value = null
})
</script>
<style lang="scss" scoped>
.det-body {
  flex: 1;
  height: 100%;
}
.alert-box {
  margin: 0 48px;
  margin-top: 24px;
}
</style>
