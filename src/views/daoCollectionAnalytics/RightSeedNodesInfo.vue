<template>
  <v-row no-gutters class="owner-top">
    <v-col cols="6">
      <RightSeedNodesInfoPriceAssetPoolChart :dataObj="props.dataObj" />
    </v-col>
    <v-col cols="6">
      <RightSeedNodesInfoAssetPoolETHChart :dataObj="props.dataObj" />
    </v-col>
  </v-row>
  <v-row no-gutters class="owner-box">
    <v-col cols="12">
      <RightSeedNodesInfoOwners :dataObj="props.dataObj" />
    </v-col>
  </v-row>
  <v-row no-gutters class="owner-box">
    <v-col cols="12">
      <RightSeedNodesInfoTransactions :dataObj="props.dataObj" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import RightSeedNodesInfoOwners from './RightSeedNodesInfoOwners.vue'
import RightSeedNodesInfoPriceAssetPoolChart from './RightSeedNodesInfoPriceAssetPoolChart.vue'
import RightSeedNodesInfoAssetPoolETHChart from './RightSeedNodesInfoAssetPoolETHChart.vue'
import RightSeedNodesInfoTransactions from './RightSeedNodesInfoTransactions.vue'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>

<style scoped lang="scss">
.owner-top {
  margin-bottom: 24px;
}
</style>
