<template>
  <div class="div-box">
    <div class="pos_fix !w-[calc(100%-55px)] min-w-[1225px]">
      <h2>Top-up Balance</h2>
      <v-divider class="border-purple"></v-divider>
      <v-tabs v-model="tab" fixed-tabs color="deep-purple-accent-4">
        <v-tab selected-class="custom-tabs" :value="1" class="text-none">Available</v-tab>
        <v-tab selected-class="custom-tabs" :value="2" class="text-none">Pending</v-tab>
      </v-tabs>
    </div>

    <v-container fluid class="container-box min-w-[1225px]">
      <component ref="childRef" :is="currentCopmonent[tab - 1]"></component>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import TopUpBalanceAvailable from './TopUpBalanceAvailable.vue';
import TopUpBalancePending from './TopUpBalancePending.vue';

const currentCopmonent = shallowRef([
  TopUpBalanceAvailable,
  TopUpBalancePending,
])
const tab = ref(1)
</script>

<style lang="scss" scoped>
.div-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
h2 {
  color: #f3f3f3;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  height: 84px;
  line-height: 84px;
  text-align: center;
}
.v-tabs {
  border-bottom: 1px solid #2F305B;
}
.container-box {
  margin-top: 117px;
  height: 100%;
}
.pos_fix {
  top: 64px;
}
</style>
