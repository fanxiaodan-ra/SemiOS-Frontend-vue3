<template>
  <RightMemberTitle :dataObj="dataObj" :isLoading="isLoading" />
  <RightMemberManifesto :dataObj="dataObj" :isLoading="isLoading" />
  <RightMemberDescription :dataObj="dataObj" :isLoading="isLoading" />
</template>

<script setup lang="ts">
import RightMemberTitle from './RightMemberTitle.vue'
import RightMemberManifesto from './RightMemberManifesto.vue'
import RightMemberDescription from './RightMemberDescription.vue'
import { togetherDaoInfo } from '@/api/daos'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const isLoading = ref(true)
const dataObj = ref() as any
const getData = async () => {
  isLoading.value = true
  const query = {
    daoId: route.query.id,
  }
  const res = await togetherDaoInfo(query)
  dataObj.value = res.data
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss"></style>
