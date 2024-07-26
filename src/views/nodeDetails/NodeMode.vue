<template>
  <v-card class="node-card">
    <item-mode :dataObj="props.dataObj" :title="true" />
  </v-card>
</template>

<script setup lang="ts">
import ItemMode from '@/components/nodeItem/ItemMode.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
}
</style>
