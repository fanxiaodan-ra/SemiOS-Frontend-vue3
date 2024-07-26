<template>
  <div class="dc-body">
    <div class="dc-left">
      <v-item-group mandatory v-model="tab">
        <v-container>
          <LeftMember :tab="tab" />
          <LeftQuantity :tab="tab" />
          <LeftInfo :tab="tab" />
          <LeftMaker :tab="tab" />
          <LeftTreasury :tab="tab" />
          <LeftPlan :tab="tab" />
        </v-container>
        <LeftButton />
      </v-item-group>
    </div>
    <div class="dc-right">
      <RightMember v-if="tab === 0" />
      <RightSubNodesQuantity v-if="tab === 1" />
      <RightSeedNodesInfo v-if="tab === 2" :dataObj="dataObj" />
      <RightMaker v-if="tab === 3" />
      <RightTreasury v-if="tab === 4" />
      <RightIncentivePlan v-if="tab === 5" />
    </div>
  </div>
</template>
<script setup lang="ts">
import LeftMember from './LeftMember.vue'
import LeftQuantity from './LeftQuantity.vue'
import LeftInfo from './LeftInfo.vue'
import LeftMaker from './LeftMaker.vue'
import LeftTreasury from './LeftTreasury.vue'
import LeftPlan from './LeftPlan.vue'
import LeftButton from './LeftButton.vue'
import RightMember from './RightMember.vue'
import RightSubNodesQuantity from './RightSubNodesQuantity.vue'
import RightSeedNodesInfo from './RightSeedNodesInfo.vue'
import RightMaker from './RightMaker.vue'
import RightTreasury from './RightTreasury.vue'
import RightIncentivePlan from './RightIncentivePlan/index.vue'

import { ref, watch, onMounted } from 'vue'
const tab = ref(0)
watch(
  () => tab.value,
  (value) => {
    console.log(value, 'valuevaluevaluevalue')
  }
)
import { togetherDaoToken } from '@/api/daos'
import { useRoute } from 'vue-router'
const route = useRoute()
const isLoading = ref(true)
const dataObj = ref() as any
const getData = async () => {
  isLoading.value = true
  const query = {
    daoId: route.query.id,
  }
  const res = await togetherDaoToken(query)
  dataObj.value = res.data
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped>
.dc-body {
  flex: 1;
  display: flex;
  padding: 0 40px;
  height: 100%;
  padding-top: 46px;
}
.dc-left {
  width: 240px;
  margin-right: 24px;
  :deep(.v-card) {
    width: 240px;
  }
  :deep(.v-container) {
    padding: 0;
    margin: 0;
  }
  :deep(.v-col-12) {
    padding: 0;
  }
  :deep(.v-col) {
    padding: 0;
  }
  :deep(.v-row) {
    padding: 0;
    margin: 0;
    margin-bottom: 24px;
  }
}
.mybg {
  background: #282f41 !important;
  border: 1px solid #282f41;
  box-sizing: border-box;
}
.sc-box {
  padding: 12px;
  box-sizing: border-box;
  h3 {
    color: #9e9e9e;
    font-size: 16px;
  }
  p {
    font-size: 14px;
    color: #9e9e9e;
    span {
      color: #fff;
    }
  }
  i {
    font-size: 32px;
  }
}
.dc-right {
  flex: 1;
}
</style>
