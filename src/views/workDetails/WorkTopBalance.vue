<template>
  <v-card class="node-card">
    <ItemTopBalance :dataList="props.topUpBalanceList" />
  </v-card>
</template>

<script setup lang="ts">
import ItemTopBalance from '@/components/ItemTopBalance.vue'
type DataList = {
  name: string
  togetherDaoId: string
  daoName: string
  workId: string
  workName: string
  workNumber: number
  workLockStatus: number
  ethBalance: number
  payCurrencyType: number
  inputTokenAddress: string
  tokenBalance: number
  daoSymbol: string
  daoErc20Address: string
}[]
const props = defineProps({
  topUpBalanceList: {
    type: Array,
    default: () => [] as DataList,
  },
})
</script>
<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
}
</style>
