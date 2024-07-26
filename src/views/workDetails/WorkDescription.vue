<template>
  <v-card class="node-card">
    <MdPreview
      :description="props.dataObj.workDescription"
      title="Work Description"
    />
  </v-card>
</template>

<script setup lang="ts">
import MdPreview from '@/components/MdPreview.vue'
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
  padding: 0 !important;
}
</style>
