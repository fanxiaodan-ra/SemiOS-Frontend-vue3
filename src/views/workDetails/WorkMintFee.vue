<template>
  <v-card class="work-card">
    <h4 class="font-h4">
      Mint Fee
      <i class="iconfont icon-info ft18">
        <v-tooltip activator="parent" location="top" max-width="300">
          Mint Fee will be allocated based on the following proportions
        </v-tooltip>
      </i>
    </h4>
    <v-row align="start" no-gutters>
      <v-col>
        <p class="card-num">{{ props.dataObj.reserveRatio.canvasMintFee }}%</p>
        <p class="card-name">Builder Fee</p>
      </v-col>
      <v-col
        v-if="
          !props.dataObj.erc20PaymentMode && !props.dataObj.isThirdpartyToken
        "
      >
        <p class="card-num">
          {{ props.dataObj.reserveRatio.redeemPoolMintFee }}%
        </p>
        <p class="card-name">Seed Nodes Fee</p>
      </v-col>
      <v-col>
        <p class="card-num">{{ props.dataObj.reserveRatio.daoMintFee }}%</p>
        <p class="card-name">Sub Nodes Fee</p>
      </v-col>
      <v-col>
        <p class="card-num">
          <span class="old-fee">2.5%</span
          >{{ props.dataObj.reserveRatio.d4aMintFee }}%
        </p>
        <p class="card-name">Semios Fee</p>
      </v-col>
    </v-row>
    <!-- <v-row align="start" no-gutters class="card-name">
      <v-col> Builder Fee </v-col>
      <v-col> Seed Nodes Fee</v-col>
      <v-col> Sub Nodes Fee</v-col>
      <v-col> Semios Fee</v-col>
    </v-row> -->
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>
<style scoped lang="scss">
.work-card {
  background-color: #252b3a !important;
}

.card-num {
  color: #fff;
  font-size: 16px;
}
.card-name {
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 400;
}
</style>
