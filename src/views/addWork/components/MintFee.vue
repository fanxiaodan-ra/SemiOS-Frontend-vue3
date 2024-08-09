<template>
  <v-row no-gutters v-for="item in mintFeeList" :key="item.key">
    <v-col cols="6" class="text-sm text-grey-1 flex items-center">{{ t(item.title) }}</v-col>
    <v-col cols="6" class="text-sm text-grey-1 flex items-center justify-end">
      {{ item.value }}%
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { t } from '@/lang'
import { defineProps, computed, ComputedRef } from 'vue'
import { MINT_FEE_CONFIG } from './config'

type MintFee = {
  key: string
  title: string
  value: string
}

const props = defineProps({
  daoReserveRatio: {
    type: Object,
    default: () => {},
  },
})

const mintFeeList:ComputedRef<MintFee[]> = computed(() => {
  return MINT_FEE_CONFIG.map((item) => {
    return {
      ...item,
      value: props.daoReserveRatio[item.key],
    }
  })
})

</script>
