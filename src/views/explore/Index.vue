<template>
  <v-card class="exploe-card bg-transparent">
    <div class="exploe-hedar min-w-[1280px]">
      <v-tabs v-model="tab" fixed-tabs color="deep-purple-accent-4" @update:modelValue="setTab">
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
    <v-tabs-window v-model="tab">
      <v-tabs-window-item :value="1">
        <Works ref="childRef" v-if="tab === 1" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="2">
        <NFTs ref="childRef" v-if="tab === 2" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="3">
        <Nodes ref="childRef" v-if="tab === 3" />
      </v-tabs-window-item>
      <v-tabs-window-item :value="4">
        <SeedNodes ref="childRef" v-if="tab === 4" />
      </v-tabs-window-item>
    </v-tabs-window>

  </v-card>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Works from './Works.vue'
import NFTs from './NFTs.vue'
import Nodes from './Nodes.vue'
import SeedNodes from './SeedNodes.vue'
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
  padding-top: 34px;
  padding-bottom: 10px;
  border-bottom: 0.0625rem solid #2F305B !important;
  position: fixed;
  width: 100%;
  z-index: 9999;
  background: #151925;
}

.v-container {
  padding: 0 !important;
  height: 100%;
}
</style>
