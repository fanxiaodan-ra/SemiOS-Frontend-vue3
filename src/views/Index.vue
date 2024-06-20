<template>
  <v-app id="inspire">
    <HaderBarWeb />
    <div
      class="alert-bom"
      v-if="store.NeworkId && APP_NETWORK !== store.NeworkId"
    >
      <v-alert
        color="#533fa1"
        icon="mdi-alert-circle"
        theme="dark"
        border
        class="alert-box"
      >
        You're viewing data from the
        {{ APP_NETWORK === '0xaa36a7' ? 'sepolia' : 'mainnet' }} network
        (Ethereum), but your wallet is connected to the incorrect network.
        Please switch network to
        {{ APP_NETWORK === '0xaa36a7' ? 'sepolia' : 'mainnet' }} network
        (Ethereum).
      </v-alert>
    </div>
    <v-main class="initbgc my-flex">
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HaderBarWeb from '@/components/HaderBarWeb.vue'
import { APP_NETWORK } from '@/config.js'
import useUserStore from '@/store'
const store = useUserStore()
</script>
<style scoped lang="scss">
.v-toolbar {
  z-index: 9 !important;
}
.alert-bom {
  position: fixed;
  z-index: 3;
  bottom: 0px;
  width: 100%;
}
</style>
