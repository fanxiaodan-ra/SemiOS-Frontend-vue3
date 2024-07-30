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
  dataObj.value = res.data
  isLoading.value = false
  if (dataObj.value.daoStatus === 1 && dataObj.value.startTime > 0) {
    countdownData.value = countdown(dataObj.value.startTime)
    setTimeNum()
  }
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
