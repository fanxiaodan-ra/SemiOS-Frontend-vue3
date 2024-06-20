<template>
  <Loading v-if="isLoading" style="margin: auto" />
  <v-card class="exploe-card" v-else>
    <div class="exploe-hedar">
      <v-tabs
        v-model="tab"
        fixed-tabs
        color="deep-purple-accent-4"
        @update:modelValue="setTab"
      >
        <v-tab selected-class="custom-tabs" :value="1" class="text-none">{{
          `Works (${amountObj.workAmount})`
        }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="2" class="text-none">{{
          `SubNodes (${amountObj.daoAmount})`
        }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="3" class="text-none">{{
          `Seed Node (${amountObj.seedNodesAmount})`
        }}</v-tab>
      </v-tabs>
    </div>
    <v-container fluid class="container-box">
      <component
        ref="childRef"
        :is="currentCopmonent[tab - 1]"
        :amountObj="amountObj"
      ></component>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import { searchAmount } from '@/api/daos'
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue'
const Works = defineAsyncComponent(() => import('./Works.vue'))
const Nodes = defineAsyncComponent(() => import('./Nodes.vue'))
const SeedNodes = defineAsyncComponent(() => import('./SeedNodes.vue'))
const currentCopmonent = shallowRef([Works, Nodes, SeedNodes])
const tab = ref(1)

import { useRouter } from 'vue-router'
const router = useRouter()
const setTab = () => {
  router.push({
    path: '/search',
    query: {
      query: route.query.query,
    },
  })
}
const amountObj = ref({ workAmount: 0, daoAmount: 0, seedNodesAmount: 0 })
import { useRoute } from 'vue-router'
const route = useRoute()
const isLoading = ref(true)
const getData = async () => {
  if (route.query.query) {
    isLoading.value = true
    const res = await searchAmount(route.query.query)
    amountObj.value = res.data
    isLoading.value = false
  }
}
onMounted(() => {
  getData()
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
