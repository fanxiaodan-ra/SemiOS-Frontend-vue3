<template>
  <v-card class="node-card">
    <item-current
      :dataObj="props.dataObj"
      :topupMode="props.dataObj.topupMode"
      :title="true"
    />
  </v-card>
</template>

<script setup lang="ts">
import ItemCurrent from '@/components/nodeItem/ItemCurrent.vue'
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
