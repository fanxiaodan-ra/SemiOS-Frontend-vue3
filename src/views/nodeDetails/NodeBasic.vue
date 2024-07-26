<template>
  <v-card class="node-card">
    <item-basic
      :dataObj="{ ...props.dataObj, ...props.dataObj.mintWindowInfoVo }"
      :title="true"
    />
  </v-card>
</template>

<script setup lang="ts">
import ItemBasic from '@/components/nodeItem/ItemBasic.vue'
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
