<template>
  <div class="flex flex-col items-center">
    <v-btn block stacked class="w-[920px] text-none" variant="outlined" color="#2F305B" size="small" height="90px"
      @click="setupPlan">
      <v-icon class="mb-2">mdi-plus</v-icon>
      {{ t('IncentivePlan.btnText') }}
    </v-btn>
    <template v-if="isLoading">
      <div v-for="item in new Array(3).fill(0)" class="mt-6">
        <v-skeleton-loader elevation="12" width="920px" height="288px" type="table-heading,  image"
          :key="item"></v-skeleton-loader>
      </div>
    </template>
    <template v-else>
      <div v-if="dataList.length === 0" class="text-lg text-grey-1 font-bold h-[350px] flex justify-center items-center">
        {{ t('IncentivePlan.noItem') }}
      </div>
      <div v-for="item in dataList" class="mt-6" v-else>
        <PlanCard :data="item" />
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">
import { onMounted, computed, ref, onBeforeUnmount } from 'vue';
import { t } from '@/lang';
import { useRouter, useRoute } from 'vue-router';
import useDaoColAnsStore from '@/store/daoColAns';
import PlanCard from './components/PlanCard.vue';
const router = useRouter()
const route = useRoute()
const daoColAnsStore = useDaoColAnsStore()
const isLoading = ref(false)
const setupPlan = () => {
  router.push({
    path: '/setupPlan',
    query: {
      id: daoColAnsStore.togetherPlan.projectId,
    },
  })
}

const dataList = computed(() => {
  return daoColAnsStore.togetherPlanList.dataList
})

onMounted(() => {
  isLoading.value = true
  daoColAnsStore.getTogetherPlanList({
    daoId: route.query.id as string,
  }).finally(() => {
    isLoading.value = false
  })
})

onBeforeUnmount(() => {
  daoColAnsStore.clearTogetherPlanList()
})

</script>