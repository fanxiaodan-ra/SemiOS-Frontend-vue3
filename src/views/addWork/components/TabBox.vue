<template>
  <div class="py-4 h-[240px] flex flex-col">
    <h5 class="font-normal text-sm text-grey-1 leading-4">
      {{ t(title) }}
    </h5>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { t } from '@/lang'
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>
