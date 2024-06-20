<template>
  <v-card class="node-card">
    <div v-if="isLoading" class="card-loading card-table">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="chip,list-item-three-line,list-item-three-line,list-item-three-line,list-item-three-line"
      ></v-skeleton-loader>
    </div>
    <div v-else>
      <div class="card-box">
        <div class="box-top">
          <div class="card-title">
            <h3>ETH Received from other Nodes</h3>
          </div>
          <div
            class="box-content"
            v-if="infoData.receivedEthFromOther.length > 0"
          >
            <v-row
              align="start"
              no-gutters
              v-for="item in infoData.receivedEthFromOther"
              :key="item.daoName + 'receivedEthFromOther'"
            >
              <v-col cols="10">
                <router-link
                  :to="`/nodeDetails?type=2&id=${item.daoId}`"
                  class="a-style"
                >
                  <v-btn class="text-none" variant="text">
                    {{ item.daoName }}
                  </v-btn>
                </router-link>
              </v-col>
              <v-col cols="2" class="text-r init-font">
                {{ item.royaltyProportion }}%</v-col
              >
            </v-row>
          </div>
          <div class="box-content my-flex init-font" v-else>No Data</div>
        </div>
        <div class="box-bom">
          <div class="card-title">
            <h3>ETH Allocation to each Nodes</h3>
          </div>
          <div v-if="!infoData.topupMode">
            <div
              class="box-content"
              v-if="infoData.allocationEthToOtherDao.length > 0"
            >
              <v-row
                align="start"
                no-gutters
                v-for="item in infoData.allocationEthToOtherDao"
                :key="item.daoName + 'allocationEthToOtherDao'"
              >
                <v-col cols="10">
                  <router-link
                    :to="`/nodeDetails?type=2&id=${item.daoId}`"
                    class="a-style"
                  >
                    <v-btn class="text-none" variant="text">
                      {{ item.daoName }}
                    </v-btn>
                  </router-link>
                </v-col>
                <v-col cols="2" class="text-r init-font">
                  {{ item.royaltyProportion }}%</v-col
                >
              </v-row>
            </div>
            <div class="box-content my-flex init-font" v-else>No Data</div>
          </div>
          <div class="box-content my-flex init-font" v-else>
            Because this DAO opened top-up mode, there is no ETH-related asset
            information display.
          </div>
        </div>
        <div class="box-bom">
          <div class="card-title">
            <h3>ETH</h3>
          </div>
          <div v-if="!infoData.topupMode">
            <div
              class="box-content eth-box"
              v-if="infoData.allocationEthToOtherDao.length > 0"
            >
              <v-row align="start" no-gutters>
                <v-col cols="10">
                  <span class="eth-text">Builder Incentives</span>
                </v-col>
                <v-col cols="2" class="text-r init-font">
                  {{ infoData.ethRoyaltyToken.canvasReward }}%</v-col
                >
              </v-row>
              <v-row align="start" no-gutters>
                <v-col cols="10"
                  ><span class="eth-text">Starter Incentives </span>
                </v-col>
                <v-col cols="2" class="text-r init-font">
                  {{ infoData.ethRoyaltyToken.daoReward }}%</v-col
                >
              </v-row>
              <v-row align="start" no-gutters>
                <v-col cols="10"
                  ><span class="eth-text">Minter Incentives </span>
                </v-col>
                <v-col cols="2" class="text-r init-font">
                  {{ infoData.ethRoyaltyToken.minterReward }}%</v-col
                >
              </v-row>
              <v-row align="start" no-gutters>
                <v-col cols="10"
                  ><span class="eth-text"> Semios Incentives</span>
                </v-col>
                <v-col cols="2" class="text-r init-font">
                  {{ infoData.ethRoyaltyToken.d4aReward }}%</v-col
                >
              </v-row>
            </div>
            <div class="box-content my-flex init-font eth-box" v-else>
              No Data
            </div>
          </div>
          <div class="box-content my-flex init-font eth-box" v-else>
            Because this DAO opened top-up mode, there is no ETH-related asset
            information display.
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { allocationInfo } from '@/api/daos'
import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

const route = useRoute()

const isLoading = ref(true)
const infoData = ref({
  receivedEthFromOther: [],
  allocationEthToOtherDao: [],
}) as any
const getData = async () => {
  isLoading.value = true
  const res = await allocationInfo({
    daoId: route.query.id,
  })
  infoData.value = res.data
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #252b3a !important;
  padding: 0 !important;
  margin: 8px;
}
.card-box {
  display: flex;
  padding: 0 24px;
  flex: 1;
  flex-direction: column;
  padding-bottom: 24px;
  .card-title {
    display: flex;
    margin-top: 24px;
    h3 {
      color: #bbbaba;
      font-family: Inter;
      font-size: 18px;
      font-weight: 600;
      margin: 0;
    }
  }
  .box-content {
    height: 114px;
    overflow-y: auto;
  }
  .eth-box {
    height: 150px !important;
  }
  .v-row {
    line-height: 36px;
  }
  .text-r {
    padding-right: 48px;
  }
  .text-none {
    color: #b3b5f2;
  }
  .init-font {
    color: #9e9e9e;
    font-size: 14px;
  }
}
.eth-text {
  color: #9e9e9e;
  font-size: 14px;
}
.card-table {
  :deep(.v-skeleton-loader) {
    padding-top: 11px;
  }
  :deep(.v-skeleton-loader__chip) {
    max-width: 80%;
    // height: 42px;
  }
  :deep(.v-skeleton-loader__text) {
    width: 80%;
    margin: 14px;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    box-shadow: none !important;
  }
}
</style>
