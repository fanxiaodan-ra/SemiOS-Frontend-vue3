<template>
  <v-card class="node-card">
    <ItemTopBalance :dataList="props.topUpBalanceList" />
  </v-card>
</template>

<script setup lang="ts">
import ItemTopBalance from '@/components/ItemTopBalance.vue'
const props = defineProps({
  topUpBalanceList: {
    type: Object,
    default: () => {},
  },
})
</script>
<style scoped lang="scss">
.node-card {
  background-color: #252b3a !important;
}
</style>
