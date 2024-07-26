<template>
  <v-dialog max-width="420" height="600">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" variant="text" class="text-grey-1 text-base pl-2 pr-0 ml-2" @click="querySearch">
        {{ ercToken.erc20Symbol }}
        <v-icon icon="mdi-menu-down" start class="ml-1"></v-icon>
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="pb-5">
        <template v-slot:title>
          <v-card-title class="p-0 text-white text-lg text-center border-b-1">Select a
            Token</v-card-title>
        </template>
        <template v-slot:text>
          <v-text-field v-model="search" label="Search name or paste address" prepend-inner-icon="mdi-magnify"
            variant="outlined" hide-details single-line @update:model-value="querySearch"></v-text-field>
        </template>
        <v-list v-if="!loading">
          <v-list-item v-if="loading" v-for="item in new Array(6).fill('')" color="#8C91FF">
            <v-skeleton-loader v-if="loading" type="list-item-two-line">{{ item }}</v-skeleton-loader>
          </v-list-item>
          <div class="w-full flex justify-center items-center text-grey-1 h-[200px]"
            v-else-if="erc20TokenList.length === 0">No tokens found.</div>
          <v-list-item v-else v-for="(item, i) in erc20TokenList" :key="i" :value="item" color="#8C91FF" selectable
            @click="() => {
              selectToken(item)
              isActive.value = false
            }">
            <div class="flex justify-between items-center text-grey-1">
              <div class="flex flex-col">
                {{ item.erc20Name }}
                <span class="block mt-1">{{ item.erc20Symbol }}</span>
              </div>
              <span v-if="userStore.UserInfo.address">
                {{ item.erc20Balance }}
              </span>
            </div>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item v-for="_ in new Array(6).fill('')" color="#8C91FF">
            <v-skeleton-loader class="w-full bg-transparent" type="list-item-two-line"></v-skeleton-loader>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import { debounce } from 'lodash'
import useDexStore from '@/store/dex'
import useUserStore from '@/store'
import { useRouter } from 'vue-router'
const dexStore = useDexStore()
const userStore = useUserStore()
const router = useRouter()
const search = ref('')
const loading = ref(true)
const erc20TokenList = computed(() => dexStore.erc20TokenList)
const ercToken = computed(() => dexStore.ercToken)

const querySearch = debounce(async () => {
  loading.value = true
  await dexStore.getLiquidityErc20Token({
    searchWord: search.value,
    userAddress: userStore.UserInfo.address,
  })
  loading.value = false
}, 500)

const selectToken = (item: any) => {
  dexStore.setSelectedErc20Token(item)
  router.push({ query: { address: item.erc20Address } })
}

</script>
<style scoped>
</style>