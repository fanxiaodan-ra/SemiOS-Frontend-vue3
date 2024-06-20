<template>
  <div class="card-det">
    <div class="tab-hedar">
      <v-tabs
        v-model="tab"
        fixed-tabs
        color="deep-purple-accent-4"
        @click.stop.prevent
      >
        <v-tab selected-class="custom-tabs" :value="1" class="text-none"
          >Members Of Seed Nodes</v-tab
        >
        <v-tab selected-class="custom-tabs" :value="2" class="text-none"
          >SubNodes Quantity</v-tab
        >
        <v-tab selected-class="custom-tabs" :value="3" class="text-none"
          >Seed Nodes Erc-20 Info</v-tab
        >
        <v-tab selected-class="custom-tabs" :value="4" class="text-none"
          >Maker</v-tab
        >
        <v-tab selected-class="custom-tabs" :value="5" class="text-none"
          >Treasury</v-tab
        >
      </v-tabs>
    </div>
    <v-window v-model="tab" class="det-box">
      <v-window-item v-for="n in 5" :key="n" :value="n">
        <v-container fluid class="container-box">
          <component
            ref="childRef"
            :is="currentCopmonent[tab - 1]"
            :data-obj="computedObj"
          ></component>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, computed, defineAsyncComponent } from 'vue'
const ItemMembers = defineAsyncComponent(() => import('./ItemMembers.vue'))
const ItemSubNodesQuantity = defineAsyncComponent(
  () => import('./ItemSubNodesQuantity.vue')
)
const ItemSeedNodesInfo = defineAsyncComponent(
  () => import('./ItemSeedNodesInfo.vue')
)
const ItemMaker = defineAsyncComponent(() => import('./ItemMaker.vue'))
const ItemTreasury = defineAsyncComponent(() => import('./ItemTreasury.vue'))
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const tab = ref(1)
const currentCopmonent = shallowRef([
  ItemMembers,
  ItemSubNodesQuantity,
  ItemSeedNodesInfo,
  ItemMaker,
  ItemTreasury,
])
const computedObj = computed(() => {
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
