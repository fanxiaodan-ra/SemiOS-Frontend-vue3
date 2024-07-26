<template>
  <v-card class="pa-5 w-full mt-6" color="#1A1F2E">
    <v-card-title class="p-0 text-white text-medium">Assets Pool</v-card-title>
    <div class="">
      <div class="flex justify-between mt-[30px]">
        <div class="div-itemb">
          <p class="text-grey-1 text-lg">Price on Liquidity ({{ ercToken.erc20Symbol }})</p>
          <p class="text-main-1 text-[28px]">{{ priceData.price }} ETH</p>
        </div>
        <div class="text-grey-1">
          <p class="text-lg">ETH in Pool ({{ ercToken.erc20Symbol }})</p>
          <p class="text-[28px]">{{ ercInfo.ethInPool }}</p>
        </div>
        <div class="text-grey-1">
          <p class="text-lg">Valuable Royalty Token in pool</p>
          <p class="text-[28px]">{{ bigNumFormat(ercInfo.burnVolume, 2, 0.01) }}</p>
        </div>
      </div>
      <!-- <div v-else>
        <v-skeleton-loader elevation="12" height="100%" type="table-heading,  image"></v-skeleton-loader>
      </div> -->
    </div>
    <div class="mt-3 flex justify-between" v-if="dexStore.ercToken.erc20Address !== ''">
      <AssetPoolEthChart />
      <RoyaltyAPY/>
    </div>
  </v-card>
</template>
<script setup lang="ts">
import useDexStore from '@/store/dex';
import { computed } from 'vue';
import { bigNumFormat } from '@/utils'
import AssetPoolEthChart from './AssetPoolEthChart.vue'
import RoyaltyAPY from './RoyaltyAPY.vue'
const dexStore = useDexStore();

const ercToken = computed(() => dexStore.ercToken);
const priceData = computed(() => dexStore.ercPrice);
const ercInfo = computed(() => dexStore.assetPoolInfo);
</script>
