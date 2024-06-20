<template>
  <v-card class="exploe-card">
    <div class="exploe-hedar">
      <v-tabs
        v-model="tab"
        fixed-tabs
        color="deep-purple-accent-4"
        @update:modelValue="setTab"
      >
        <v-tab selected-class="custom-tabs" :value="1" class="text-none">{{
          $t('Explore.tabs', 0)
        }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="2" class="text-none">{{
          $t('Explore.tabs', 1)
        }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="3" class="text-none">{{
          $t('Explore.tabs', 2)
        }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="4" class="text-none">{{
          $t('Explore.seedNodes')
        }}</v-tab>
      </v-tabs>
    </div>
    <v-container fluid class="container-box">
      <component ref="childRef" :is="currentCopmonent[tab - 1]"></component>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { ref, shallowRef, onMounted, defineAsyncComponent } from 'vue'
const Works = defineAsyncComponent(() => import('./Works.vue'))
const NFTs = defineAsyncComponent(() => import('./NFTs.vue'))
const Nodes = defineAsyncComponent(() => import('./Nodes.vue'))
const SeedNodes = defineAsyncComponent(() => import('./SeedNodes.vue'))
const currentCopmonent = shallowRef([Works, NFTs, Nodes, SeedNodes])
const tab = ref(3)

import { useRouter } from 'vue-router'
const router = useRouter()
const setTab = () => {
  router.push({
    path: '/explore',
    query: {
      type: tab.value,
    },
  })
}
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
  tab.value = Number(route.query.type) ? (Number(route.query.type) as any) : 1
})
</script>
<style lang="scss" scoped>
.exploe-card {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.exploe-hedar {
  border-bottom: 0.0625rem solid #6062aa !important;
  position: fixed;
  width: 100%;
  z-index: 9999;
  background: #1b2233;
}

.v-container {
  padding: 0 !important;
  height: 100%;
}
</style>
