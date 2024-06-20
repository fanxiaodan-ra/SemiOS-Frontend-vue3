<template>
  <div class="tnode-card">
    <v-layout>
      <v-main>
        <div class="box-top">
          <div class="box-top-right">
            <v-select
              v-model="dayTime"
              label="Select"
              density="compact"
              variant="solo"
              :items="options"
              item-title="label"
              item-value="value"
            ></v-select>
          </div>
        </div>
        <div class="node-card-box">
          <AnalyticsTitle :day-time="dayTime" />
          <AnalyticsVolumeAverage :day-time="dayTime" />
          <v-row no-gutters>
            <v-col cols="6">
              <PriceRangeNFTs :day-time="dayTime" />
            </v-col>
            <v-col cols="6"> <AnalyticMintChart :day-time="dayTime" /> </v-col>
          </v-row>
          <v-row no-gutters class="owner-box">
            <v-col cols="6"> <AnalyticNFTOwners /> </v-col>
            <v-col cols="6">
              <div><NFTOwnerDistribution /></div>
              <div><NFTOwnersQuantityChart :day-time="dayTime" /></div>
            </v-col>
          </v-row>
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import AnalyticsTitle from './AnalyticsTitle.vue'
import AnalyticsVolumeAverage from './AnalyticsVolumeAverage.vue'
import PriceRangeNFTs from './PriceRangeNFTs.vue'
import AnalyticMintChart from './AnalyticMintChart.vue'
import AnalyticNFTOwners from './AnalyticNFTOwners.vue'
import NFTOwnerDistribution from './NFTOwnerDistribution.vue'
import NFTOwnersQuantityChart from './NFTOwnersQuantityChart.vue'
import { ref } from 'vue'

const options = [
  {
    value: 7,
    label: 'Last 7 days',
    disabled: false,
  },
  {
    value: 30,
    label: 'Last 30 days',
    disabled: false,
  },
  {
    value: 90,
    label: 'Last 90 days',
    disabled: false,
  },
]
const dayTime = ref(90)
</script>
<style lang="scss" scoped>
.tnode-card {
  flex: 1;
  height: 100%;

  :deep(.v-input__control) {
    width: 240px;
    margin-left: auto;
  }
}

.box-top {
  height: 96px;
  display: flex;
  align-items: center;
  margin-left: auto;
  display: flex;
  width: 100%;
  z-index: 4;
  background: #1b2233;
  padding: 0 48px;

  :deep(.v-input) {
    flex: none;
  }

  :deep(.v-input__details) {
    display: none;
  }
}

:deep(.v-layout) {
  height: 100%;
}

.nav-box {
  background-color: #1b2233;

  h4 {
    padding: 0 16px;
    color: #bbbaba;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 22px;
  }
}

.nav-top {
  height: 86px;

  i {
    cursor: pointer;
  }
}

.node-card-box {
  padding: 0 40px;
  display: flex;
  flex-direction: column;
}

.box-top-right {
  width: 100%;
  justify-content: flex-end;
}
.owner-box {
  min-height: 900px;
}
</style>
