<template>
  <TabBox title="fixedPriceTab.title">
    <template #default>
      <FixedPrice v-model="fixedPrice" />
      <FloorPrice :dataObj="props.dataObj" />
      <TopupAndMint :dataObj="props.dataObj" />
    </template>
  </TabBox>
</template>
<script lang="ts" setup>

import { watch, ref } from 'vue'
import TabBox from './components/TabBox.vue'
import FloorPrice from './components/FloorPrice.vue'
import TopupAndMint from './components/TopupAndMint.vue'
import FixedPrice from './components/FixedPrice.vue'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const fixedPrice = ref(0)

const emit = defineEmits(['setFixedPrice'])
watch(
  () => fixedPrice.value,
  (val) => {
    emit('setFixedPrice', Number(val))
  },
  { immediate: true }
)

</script>
