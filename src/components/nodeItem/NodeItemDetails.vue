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
    </div>
    <v-window v-model="tab" class="det-box">
      <v-window-item v-for="n in 5" :key="n" :value="n">
        <v-container fluid class="container-box">
          <component
            ref="childRef"
            :is="currentCopmonent[tab - 1]"
            :data-obj="computedObj"
            :topupMode="props.dataObj.modeStatusVo.topupMode"
          ></component>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, defineAsyncComponent } from 'vue'
const ItemCurrent = defineAsyncComponent(() => import('./ItemCurrent.vue'))
const ItemBasic = defineAsyncComponent(() => import('./ItemBasic.vue'))
const ItemMode = defineAsyncComponent(() => import('./ItemMode.vue'))
const ItemEthInfo = defineAsyncComponent(() => import('./ItemEthInfo.vue'))
const ItemErc20Token = defineAsyncComponent(
  () => import('./ItemErc20Token.vue')
)
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const tab = ref(1)
const currentCopmonent = shallowRef([
  ItemCurrent,
  ItemBasic,
  ItemMode,
  ItemEthInfo,
  ItemErc20Token,
])
const computedObj = computed(() => {
  if (tab.value === 1) {
    return {
      ...props.dataObj,
      ...props.dataObj.mintWindowInfoVo,
    }
  }
  if (tab.value === 2) {
    return {
      ...props.dataObj,
      ...props.dataObj.basicInformationVo,
    }
  }
  if (tab.value === 3) {
    return {
      ...props.dataObj,
      ...props.dataObj.modeStatusVo,
    }
  }
  return { ...props.dataObj }
})
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
