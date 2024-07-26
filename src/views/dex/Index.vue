<template>
  <div class="self-start w-full px-12 pt-6">
    <Redeem />
    <AssetPool />
    <Transactions v-if="dexStore.ercToken.erc20Address.length"/>
  </div>
</template>
<script setup lang="ts">
import AssetPool from './components/AssetPool.vue'
import Redeem from './components/Redeem.vue'
import Transactions from './components/Transactions.vue'
import useDexStore from '@/store/dex';

const dexStore = useDexStore()
</script>
