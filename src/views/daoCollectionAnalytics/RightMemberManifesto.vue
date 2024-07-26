<template>
  <v-card class="node-card">
    <v-skeleton-loader
      elevation="12"
      height="100%"
      type="list-item-two-line"
      class="loading-text"
      v-if="props.isLoading"
    ></v-skeleton-loader>
    <MdPreview
      v-else
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
  isLoading: {
    type: Boolean,
    default: true,
  },
})
</script>
<style scoped lang="scss">
.node-card {
  padding: 0 !important;
  background-color: #1A1F2E !important;
  display: flex;
  padding: 24px;
  box-sizing: border-box;
  min-width: 780px;
  margin: 0;
  margin-bottom: 24px;
}
.loading-text {
  background-color: transparent;
  :deep(.v-skeleton-loader__bone) {
    padding: 0 8px;
  }
}
</style>
