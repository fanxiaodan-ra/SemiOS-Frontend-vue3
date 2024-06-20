<template>
  <v-card class="node-card">
    <item-mode :dataObj="props.dataObj.modeStatusVo" :title="true" />
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
  background-color: #252b3a !important;
}
</style>
