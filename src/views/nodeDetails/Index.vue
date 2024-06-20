<template>
  <loading v-if="isLoading" />
  <div class="det-body" v-else>
    <v-alert
      color="#533fa1"
      icon="mdi-alert-circle"
      theme="dark"
      border
      class="alert-box"
      v-if="dataObj.daoStatus === 1 && dataObj.startTime > 0"
    >
      This Nodes will start to mint in {{ countdownData.h }} Hours :
      {{ countdownData.m }} Minutes : {{ countdownData.s }} Seconds
    </v-alert>
    <node-title :dataObj="dataObj" v-if="store.ScreenWidth < 1240" />
    <node-title-max :dataObj="dataObj" v-else />
    <node-timer-new :dataObj="dataObj" />
    <node-current :dataObj="dataObj" />
    <node-basic :dataObj="dataObj" />
    <node-mode :dataObj="dataObj" />
    <node-manifesto :dataObj="dataObj" />
    <node-description :dataObj="dataObj" />
    <node-page :dataObj="dataObj" />
  </div>
</template>
<script setup lang="ts">
import NodeTitle from './NodeTitle.vue'
import NodeTitleMax from './NodeTitleMax.vue'
import NodeTimerNew from './NodeTimerNew.vue'
import NodeCurrent from './NodeCurrent.vue'
import NodeBasic from './NodeBasic.vue'
import NodeMode from './NodeMode.vue'
import NodeManifesto from './NodeManifesto.vue'
import NodeDescription from './NodeDescription.vue'
import NodePage from './NodePage.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useUserStore from '@/store'
const store = useUserStore()
import { useRoute } from 'vue-router'
const route = useRoute()
import Loading from '@/components/Loading.vue'
const isLoading = ref(true)
const dataObj = ref<any>({})
import { analyticsDetail } from '@/api/daos'
import { countdown } from '@/utils'
const timeDisplay = ref<any>(null)
const countdownData = ref({
  h: 0,
  m: 0,
  s: 0,
})
const getData = async () => {
  isLoading.value = true
  const res = await analyticsDetail({
    daoId: route.query.id,
  })
  console.log(res, 'resresresresresresres')
  dataObj.value = res.data
  isLoading.value = false
  if (dataObj.value.daoStatus === 1 && dataObj.value.startTime > 0) {
    countdownData.value = countdown(dataObj.value.startTime)
    setTimeNum()
  }
  // dataObj.value = {
  //   basicDao: 1,
  //   basicInformation: {
  //     mintCap: 1,
  //     mintWindowCap: 1,
  //     mintWindowDuration: 1,
  //     remainingMintWindow: 50,
  //     subDaoAssetPoolDaoToken: '18620000',
  //     subDaoAssetPoolEth: '0.0000025',
  //     totalMintCap: 10000,
  //     totalMintWindowCap: 10000,
  //   },
  //   countdown: 2436419,
  //   creatorAddress: '0xf8baf7268f3daefe4135f7711473ae8b6c3b47d8',
  //   daoAssetPool: 0,
  //   daoDescription: '',
  //   daoFlow: 0.000095,
  //   daoId: 88,
  //   daoLogoUrl: 'https://image-test.protodao.io/dao/dao_default_logo.png',
  //   daoManitesto: '',
  //   daoMintWindow: 50,
  //   daoName: 'zmain DistopEpassDisunifiDislt20240319161712',
  //   daoNumber: 172,
  //   daoStatus: 2,
  //   daoToken: 0,
  //   daoVersion: 3,
  //   discordLink: null,
  //   erc20Address: '0x89c8332954281580ed05b46a4981ce7535bbc785',
  //   erc721Address: '0x0f8e8718952bce91d53d30bd0f426f12b0abf066',
  //   favoriteAmount: 0,
  //   favorited: false,
  //   feePool: '0xd7b56185707daef5968cc230df5969ba50b5afb1',
  //   isMainDaoCreator: false,
  //   mainDaoId: 89,
  //   mainDaoName: 'zmain DistopEpassDisunifiDislt20240319161712',
  //   mainDaoProjectId:
  //     '91bddaff9fe17b873060ef392abf6d9813dfa7676e749fc780a2c3207c5da0ab',
  //   mintRevenue: 0.000003,
  //   mintWindow: 0,
  //   mintWindowInfoVo: {
  //     blockRewardEth: '0',
  //     blockRewardToken: '380000',
  //     internalRewardEth: '0',
  //     internalRewardToken: '380000',
  //     mintFee: '0.000100',
  //     mintedWorks: 1,
  //     minters: 1,
  //   },
  //   modeStatusVo: {
  //     daoToken: false,
  //     erc20PaymentMode: false,
  //     infiniteMode: false,
  //     lotteryDuration: 0,
  //     lotteryMode: false,
  //     speicialStrategy: false,
  //     topupMode: false,
  //     unifiedPrice: null,
  //     unifiedPriceMode: false,
  //   },
  //   modifiable: false,
  //   nextMintWindowStartTime: 6467,
  //   nftNumber: 1,
  //   openseaLink: null,
  //   pausedMsg: null,
  //   projectId:
  //     '0x91bddaff9fe17b873060ef392abf6d9813dfa7676e749fc780a2c3207c5da0ab',
  //   proportion: '69',
  //   royaltyFee: '0.075',
  //   socialLinks: ['', '', ''],
  //   startDate: '2024-03-19',
  //   startTime: -1,
  //   topupMode: false,
  //   totalDaoNumber: 1,
  //   totalMintWindowTime: 3600,
  //   totalNftCasting: 10000,
  //   twitterLink: null,
  //   whiteList: false,
  //   workNumber: 1,
  // }
}
const setTimeNum = () => {
  clearInterval(timeDisplay.value)
  timeDisplay.value = null
  timeDisplay.value = setInterval(() => {
    dataObj.value.startTime -= 1
    if (dataObj.value.startTime > 0) {
      countdownData.value = countdown(dataObj.value.startTime)
    } else {
      clearInterval(timeDisplay.value)
      timeDisplay.value = null
      getData()
    }
  }, 1000)
}
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
