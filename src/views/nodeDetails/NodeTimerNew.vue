<template>
  <v-card class="node-card timer-card">
    <h4 class="font-h4">{{ $t('NodeTitle.blockWindowCountdownLabel') }}</h4>
    <div class="card-time">
      <div class="card-left">
        <div class="left-item">
          <span class="num-span">{{ timeObj.h }}</span>
          <span class="type-span">HOURS</span>
        </div>
        <div class="left-item">
          <span class="num-span">{{ timeObj.m }}</span>
          <span class="type-span">MINUTES</span>
        </div>
        <div class="left-item">
          <span class="num-span">{{ timeObj.s }}</span>
          <span class="type-span">SECONDS</span>
        </div>
      </div>
      <div class="card-right">
        <v-progress-linear
          color="light-blue"
          height="32"
          :model-value="proportion"
          striped
        >
          <strong>{{ proportion }}%</strong></v-progress-linear
        >
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})

import { ref, onBeforeUnmount, watch } from 'vue'
import { countdown } from '@/utils'
const timer = ref()
const setTimer = () => {
  clearInterval(timer.value)
  timer.value = null
  timer.value = setInterval(() => {
    if (endTime.value > 0) {
      endTime.value -= 1
      getTime(endTime.value)
    } else {
      clearInterval(timer.value)
      timer.value = null
    }
  }, 1000)
}
const proportion = ref(0)
const endTime = ref(0)
const totalMintWindowTime = ref(0)
const timeObj = ref({
  h: 0,
  m: 0,
  s: 0,
})
const getTime = (val: number) => {
  timeObj.value = countdown(val)
  proportion.value =
    totalMintWindowTime.value === 0
      ? 0
      : Math.floor(
          ((totalMintWindowTime.value - val) / totalMintWindowTime.value) * 100
        )
}
watch(
  () => props.dataObj.countdown,
  (val) => {
    totalMintWindowTime.value = Math.floor(
      props.dataObj.totalMintWindowTime / 1000
    )
    endTime.value = Math.floor(val / 1000)
    getTime(endTime.value)
    setTimer()
  },
  { deep: true, immediate: true }
)
onBeforeUnmount(() => {
  clearInterval(timer.value)
  timer.value = null
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
}
.timer-card {
  :deep(.bg-light-blue) {
    background-color: #8c91ff !important;
    border-radius: 2px 0 0 2px;
  }
  :deep(.v-progress-linear__background) {
    border-radius: 0 2px 2px 0;
  }
  .card-time {
    display: flex;
  }
  .card-left {
    display: flex;
    margin-right: 12px;
    .left-item {
      width: 120px;
    }
  }
  .card-right {
    flex: 1;
  }

  .left-item {
    display: flex;
    height: 32px;
    background-color: #2e3547;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: #9e9e9e;
    align-items: center;
    margin-right: 12px;
  }

  .num-span {
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    display: block;
    margin: 0 12px;
    min-width: 20px;
    text-align: center;
  }
  .type-span {
    margin-right: 12px;
  }
}
</style>
