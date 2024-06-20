<template>
  <v-card class="timer-card">
    <div class="card-left">
      <!-- <drb-charts v-if="!isLoading" :proportion="drbData.proportion + ''" /> -->
    </div>
    <div class="card-right">
      <div>
        <h4>Block Window Countdown</h4>
        <div class="right-item">
          <span class="num-span">123</span>
          <span class="type-span">HOURS</span>
        </div>
        <div class="right-item">
          <span class="num-span">123</span>
          <span class="type-span">MINUTES</span>
        </div>
        <div class="right-item">
          <span class="num-span">123</span>
          <span class="type-span">SECONDS</span>
        </div>
      </div>
      <v-progress-linear
        color="light-blue"
        height="10"
        model-value="10"
        striped
      ></v-progress-linear>
    </div>
  </v-card>
</template>

<script setup lang="ts">
// import { ellipsis, truncateString, copyToClipboard } from '@/utils'
// const props = defineProps({
//   dataObj: {
//     type: Object,
//     default: () => {},
//   },
// })
</script>

<style scoped lang="scss">
.timer-card {
  height: 220px;
  margin: 24px 48px;
  background-color: #252b3a !important;
  display: flex;
  padding: 24px;
  box-sizing: border-box;

  h4 {
    color: #9e9e9e;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    margin-bottom: 24px;
  }

  .right-item {
    margin-bottom: 12px;
    display: flex;
    height: 32px;
    background-color: #2e3547;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    color: #9e9e9e;
    align-items: center;
  }

  .num-span {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    display: block;
    width: 40%;
    text-align: end;
    margin-right: 20px;
  }
}
</style>
