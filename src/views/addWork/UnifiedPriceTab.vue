<template>
  <TabBox title="unifiedPriceTab.title">
    <template #default>
      <UnifiedPrice :dataObj="props.dataObj" />
      <TopupAndMint :dataObj="props.dataObj" />
    </template>
  </TabBox>
</template>
<script lang="ts" setup>
import TabBox from './components/TabBox.vue';
import UnifiedPrice from './components/UnifiedPrice.vue';
import TopupAndMint from './components/TopupAndMint.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>