<template>
  <v-theme-provider theme="dark" with-background class="pa-10">
    <router-view :key="route.fullPath"> </router-view>
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { onMounted, watchEffect, reactive } from 'vue'
import useAccount from '@/hooks/useAccount'
import { contractAbi } from '@/api/init'
import { useRoute } from 'vue-router'
const route = useRoute()
import useUserStore from '@/store';
const store = useUserStore()

const { setLogin } = useAccount()
import { APP_LOCAL_NAME } from '@/config.ts'

const getAbi = async () => {
  const abi = window.localStorage.getItem(APP_LOCAL_NAME + 'PactAbi')
  if (abi) {
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
  window.addEventListener('offline', () => {
    window.location.reload()
  })
  window.addEventListener('online', () => {
    window.location.reload()
  })
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

</script>
<style>
#app {
  height: 100%;
  font-family: auto;
  background: #151925;
  min-width: 1280px;
}
</style>
