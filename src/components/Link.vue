<template>
  <v-btn
    variant="text"
    base-color="#8C91FF"
    height="26px"
    :class="`text-none p-0 hover:underline ${className}`"
    :ripple="false"
    @click="handleClick"
  >
    {{ text }}
    <slot></slot>
  </v-btn>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
  text: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  handleClick: {
    type: Function,
    default: () => {},
  },
})
</script>
<style lang="scss" scoped>
:deep(.v-btn__overlay) {
  opacity: 0!important;
}
</style>