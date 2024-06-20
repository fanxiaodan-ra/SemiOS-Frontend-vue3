<template>
  <v-card class="work-card">
    <h4 class="font-h4">
      Top-Up Unlock proportion
      <i class="iconfont icon-info ft18">
        <v-tooltip activator="parent" location="top" max-width="300">
          Proportion of ERC-20 Tokens unlocked when Using Top-up to unlock
          ERC-20 Tokens
        </v-tooltip>
      </i>
    </h4>
    <v-row align="start" no-gutters>
      <v-col
        :cols="
          !props.dataObj.erc20PaymentMode && !props.dataObj.isThirdpartyToken
            ? 3
            : 4
        "
      >
        <p class="card-num">{{ props.dataObj.walletRatio }}%</p>
        <p class="card-name">Wallet</p>
      </v-col>
      <v-col
        :cols="
          !props.dataObj.erc20PaymentMode && !props.dataObj.isThirdpartyToken
            ? 3
            : 4
        "
      >
        <p class="card-num">{{ props.dataObj.treasuryOrPoolRatio }}%</p>
        <p class="card-name">
          {{
            props.dataObj.erc20PaymentMode ? 'Redeem Asset Pool' : 'Treasury'
          }}
        </p>
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
