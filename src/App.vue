<template>
  <v-theme-provider theme="dark" with-background class="pa-10">
    <router-view :key="route.fullPath"> </router-view>
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { onMounted, watch, watchEffect, reactive } from 'vue'
import useAccount from '@/hooks/useAccount'
import { contractAbi } from '@/api/init'
import { useRoute } from 'vue-router'
const route = useRoute()
import useUserStore from '@/store';
const store = useUserStore()

const { isLoading, setLogin } = useAccount()
watch(
  () => isLoading,
  (cur, old) => {
    // isLoading.value = cur;
    console.log(cur, old, 'cur, old')
  },
  { immediate: true }
)
import { APP_LOCAL_NAME } from '@/config.ts'
const getAbi = async () => {
  const abi = window.localStorage.getItem(APP_LOCAL_NAME + 'PactAbi')
  if (abi) {
    console.log(JSON.parse(abi), 'JSON.parse(abi)')
    store.setPactAbi(JSON.parse(abi))
  } else {
    const res = await contractAbi()
    store.setPactAbi(res.data)
    window.localStorage.setItem(
      APP_LOCAL_NAME + 'PactAbi',
      JSON.stringify(res.data)
    )
  }
}

onMounted(async () => {
  window.addEventListener('resize', updateScreenWidth)
  await setLogin()
  await getAbi()
})

const screenWidth = reactive({
  width: window.innerWidth,
})

const updateScreenWidth = () => {
  screenWidth.width = window.innerWidth
}

watchEffect(() => {
  store.setScreenWidth(screenWidth.width)
})

// setTimeout(() => {
//   isShow.value = false;
// }, 2000);
</script>
<style>
#app {
  height: 100%;
  font-family: auto;
  background: #1b2233;
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #cecece;
}
</style>
