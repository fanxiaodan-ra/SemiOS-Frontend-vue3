<template>
  <TabBox title="floatingPriceTab.title">
    <FloatPrice :dataObj="props.dataObj" />
    <FloorPrice :dataObj="props.dataObj" />
    <TopupAndMint :dataObj="props.dataObj" />
  </TabBox>
</template>
<script lang="ts" setup>
import TabBox from './components/TabBox.vue';
import TopupAndMint from './components/TopupAndMint.vue'
import FloorPrice from './components/FloorPrice.vue';
import FloatPrice from './components/FloatPrice.vue';
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>
