<template>
  <div class="card-det">
    <div class="tab-hedar">
      <v-tabs v-model="tab" fixed-tabs color="deep-purple-accent-4" @click.stop.prevent>
        <v-tab selected-class="custom-tabs" :value="1" class="text-none">{{
          $t('NodeDetail.currentBlockWindowInformationLabel')
          }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="2" class="text-none">{{
          $t('NodeDetail.basicInformationLabel')
          }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="3" class="text-none">{{
          $t('NodeDetail.modeStatusLabel')
          }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="4" class="text-none">{{
          $t('NodeDetail.ethlabel')
          }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="5" class="text-none">{{
          $t('NodeDetail.erc20TokenLabel')
          }}</v-tab>
      </v-tabs>
      <v-divider class="border-purple mt-2"></v-divider>
    </div>
    <v-tabs-window v-model="tab" class="det-box min-h-[114px]">
      <v-tabs-window-item :value="1">
        <item-current :data-obj="dataObj" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <item-basic :data-obj="dataObj" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="3">
        <item-mode :data-obj="dataObj" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="4">
        <item-eth-info :data-obj="dataObj" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="5">
        <item-erc20-token :data-obj="dataObj" />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
            <!-- :topupMode="props.dataObj.modeStatusVo.topupMode" -->
<script setup lang="ts">
import { ref } from 'vue'
import ItemCurrent from './ItemCurrent.vue';
import ItemBasic from './ItemBasic.vue';
import ItemMode from './ItemMode.vue';
import ItemEthInfo from './ItemEthInfo.vue';
import ItemErc20Token from './ItemErc20Token.vue';
defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const tab = ref(1)
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
.container-box {
  min-height: 116px;
}
</style>
