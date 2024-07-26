<template>
  <p class="text-grey-3 text-lg font-medium font-['Inter'] tracking-tight my-6 ">
    <v-skeleton-loader v-if="isLoading" height="100%" type="text"></v-skeleton-loader>
    <template v-else>
      {{ t('maker.subTitle') }}
      <router-link :to="'/workDetails?id=' + userPermission.workId"
        class="text-indigo-400 text-lg font-medium font-['Inter'] tracking-tight hover:text-primary-2">
        {{ `${userPermission.daoNameNft}.${userPermission.workNumber}` }}
      </router-link>
    </template>
  </p>
  <RightMakerTopUpBalanceETHTokens :userPermission="userPermission" />
  <RightMakerTopUpBalanceTokensETH :userPermission="userPermission" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import usePermission from '@/hooks/useUserPermission'
import { useRoute } from 'vue-router'
import { t } from '@/lang'
import RightMakerTopUpBalanceETHTokens from './RightMakerTopUpBalanceETHTokens.vue'
import RightMakerTopUpBalanceTokensETH from './RightMakerTopUpBalanceTokensETH.vue'
const { userPermission, getPermission } = usePermission()

const route = useRoute()
const isLoading = ref(false)

const init = async () => {
  try {
    isLoading.value = true
    await getPermission({
      daoId: route.query.id as string,
      permissionType: 7,
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
 init()
})

</script>

<style scoped lang="scss"></style>
