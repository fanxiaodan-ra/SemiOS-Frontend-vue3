<template>
  <div class="tnode-card">
    <v-layout>
      <v-main>
        <div class="node-card-box">
          <SubNodesAssetPoolAddress
            :initData="initData"
            :isLoading="isLoading"
          />
          <v-row no-gutters>
            <v-col cols="6"
              ><ETHRelevantInformation
                :initData="initData"
                :isLoading="isLoading"
              />
            </v-col>
            <v-col cols="6">
              <TokensRelevantInformation
                :initData="initData"
                :isLoading="isLoading"
                :dataObj="props.dataObj"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="6">
              <SubNodesAssetPoolETHChart :initData="initData" />
            </v-col>
            <v-col cols="6">
              <SubNodesAssetPoolTokensChart :initData="initData" />
            </v-col>
          </v-row>

          <v-row no-gutters>
            <v-col cols="6">
              <SubNodesAssetPoolETHTable />
            </v-col>
            <v-col cols="6">
              <SubNodesAssetPoolTokensTable />
            </v-col>
          </v-row>
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { daoAllocation } from '@/api/daos'
import SubNodesAssetPoolAddress from './SubNodesAssetPoolAddress.vue'
import ETHRelevantInformation from './ETHRelevantInformation.vue'
import TokensRelevantInformation from './TokensRelevantInformation.vue'
import SubNodesAssetPoolETHChart from './SubNodesAssetPoolETHChart.vue'
import SubNodesAssetPoolTokensChart from './SubNodesAssetPoolTokensChart.vue'
import SubNodesAssetPoolETHTable from './SubNodesAssetPoolETHTable.vue'
import SubNodesAssetPoolTokensTable from './SubNodesAssetPoolTokensTable.vue'

import { ref, onMounted } from 'vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const initData = ref({}) as any
const isLoading = ref(true)
import { useRoute } from 'vue-router'
const route = useRoute()
const getData = async () => {
  const query = {
    daoId: route.query.id,
  }
  const res = (await daoAllocation(query)) as any
  initData.value = res.data
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped>
.tnode-card {
  flex: 1;
  height: 100%;
}

:deep(.v-layout) {
  height: 100%;
}

.node-card-box {
  padding: 0 40px;
  display: flex;
  flex-direction: column;
}
</style>
