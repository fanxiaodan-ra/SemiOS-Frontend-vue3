<template>
  <v-card class="node-card">
    <MdPreview
      :description="props.dataObj.daoManitesto"
      :title="$t('NodeDetail.nodesManifestolabel')"
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
  background-color: #252b3a !important;
  padding: 0 !important;
}
</style>
