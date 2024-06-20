<template>
  <div class="tab-box">
    <h5>
      This DAO has opened Unified Pricing Mode, all works under this DAO will be
      minted at the unified price set by the starter.
    </h5>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Unified Price </v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.canvasCurrentPrice }}
        <TokenIcon
          size="14px"
          mgl="6px"
          :daoToken="props.dataObj.erc20PaymentMode"
          :daoSymbol="props.dataObj.daoSymbol"
          :daoErc20Address="props.dataObj.daoErc20Address"
          :payCurrencyType="props.dataObj.payCurrencyType"
          :inputTokenAddress="props.dataObj.inputTokenAddress"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Sub Nodes Fee </v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.fixedDaoReserveRatio.daoMintFee }}%
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Builder Fee </v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.fixedDaoReserveRatio.canvasMintFee }}%
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Semios Fee </v-col>
      <v-col cols="6" class="text-font flexend">
        <span class="old-fee">2.5 </span>
        {{ props.dataObj.fixedDaoReserveRatio.d4aMintFee }}%
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import TokenIcon from '@/components/TokenIcon.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
.tab-box {
  padding: 16px;
  height: 240px;
  display: flex;
  flex-direction: column;
  h5 {
    font-weight: 400;
    font-size: 14px;
    color: #9e9e9e;
    line-height: 32px;
  }
  .text-font {
    font-weight: 400;
    font-size: 14px;
    color: #9e9e9e;
    display: flex;
    align-items: center;
  }
  .flexend {
    justify-content: flex-end;
  }
}
</style>
