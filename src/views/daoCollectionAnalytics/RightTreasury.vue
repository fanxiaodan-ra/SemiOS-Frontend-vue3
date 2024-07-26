<template>
  <RightTreasuryTitle :initData="initData" :userPermission="userPermission" :isLoading="isLoading" />
  <RightTreasuryDeposit :initData="initData" :isLoading="isLoading" />
  <RightTreasuryERC20AllocationtoSubNodes
    :initData="initData"
    :isLoading="isLoading"
    :treasuryDataList="treasuryDataList"
    :userPermission="userPermission"
  />
  <TreasuryTransactions />
</template>

<script setup lang="ts">
import RightTreasuryTitle from './RightTreasuryTitle.vue'
import RightTreasuryDeposit from './RightTreasuryDeposit.vue'
import RightTreasuryERC20AllocationtoSubNodes from './RightTreasuryERC20AllocationtoSubNodes.vue'
import TreasuryTransactions from './TreasuryTransactions.vue'
import { treasuryInfo, treasuryList } from '@/api/daos'
import usePermission from '@/hooks/useUserPermission'
import { ref, onMounted } from 'vue'
const initData = ref({}) as any
const isLoading = ref(true)
const { userPermission, getPermission } = usePermission()

import { useRoute } from 'vue-router'
const route = useRoute()
const treasuryDataList = ref([]) as any
const getData = async () => {
  const query = {
    daoId: route.query.id,
  }
  const res = (await treasuryInfo(query)) as any
  initData.value = res.data
  const list:any = await treasuryList({
    daoId: route.query.id,
    pageSize: -1,
  })
  treasuryDataList.value = list.dataList
  isLoading.value = false
}
onMounted(() => {
  getData()
  getPermission({
    daoId: route.query.id as string,
    permissionType: 5,
  })
})
</script>

<style scoped lang="scss"></style>
