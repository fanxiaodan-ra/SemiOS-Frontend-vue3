<template>
  <template v-if="openedTopup">
    <p class="text-center text-base text-grey-1 font-normal py-5">{{ t('addwork.openedTopupMode') }}</p>
  </template>
  <template v-else>
    <MintFee :daoReserveRatio="props.dataObj.daoReserveRatio" />
  </template>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { t } from '@/lang'
import MintFee from './MintFee.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})

const openedTopup = computed(() => {
  return props.dataObj.topupMode === 1
})
</script>