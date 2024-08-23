<template>
  <v-btn
    variant="outlined"
    block
    color="#8C91FF"
    height="32px"
    :class="`text-none ${className}`"
    :loading="loading"
  >
    {{ text }}
  </v-btn>
</template>
<script setup lang="ts">
defineProps({
  text: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>