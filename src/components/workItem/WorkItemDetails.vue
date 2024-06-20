<template>
  <div class="card-det">
    <div class="tab-hedar">
      <v-tabs
        v-model="tab"
        fixed-tabs
        color="deep-purple-accent-4"
        @click.stop.prevent
      >
        <v-tab selected-class="custom-tabs" :value="1" class="text-none">{{
          $t('NodeDetail.currentBlockWindowInformationLabel')
        }}</v-tab>
      </v-tabs>
    </div>
    <v-window v-model="tab" class="det-box">
      <v-window-item v-for="n in 5" :key="n" :value="n">
        <v-container fluid>
          <component
            ref="childRef"
            :is="currentCopmonent[tab - 1]"
            :data-obj="props.dataObj"
            :topupMode="props.dataObj.topupMode"
          ></component>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import ItemCurrent from '@/components/nodeItem/ItemCurrent.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
import { ref, shallowRef } from 'vue'
const tab = ref(1)
const currentCopmonent = shallowRef([ItemCurrent])
</script>

<style scoped lang="scss">
.tab-hedar {
  margin: 16px 0;
  :deep(.v-tabs) {
    height: 32px !important;
    .v-btn {
      height: 32px !important;
      font-size: 14px;
      color: #bbbaba;
      font-weight: 400 !important;
    }
  }
}
.det-box {
  :deep(.v-container) {
    padding: 0 !important;
  }
}
.text-none {
  margin: 0 !important;
}
</style>
