<template>
  <v-card class="mb-6 p-4" :width="920">
    <div class="flex justify-between">
      <div class="flex">
        <v-img :height="68" :width="68" :max-width="68" aspect-ratio="1/1" cover :src="props.data.planLogoUrl" />
        <div class="flex flex-col text-xl font-medium ml-3">
          <p class="text-grey-1">
            {{ props.data.daoName }}
            {{ t('IncentivePlan.planType') }}
            #{{ props.data.planNumber }}
          </p>
          <p>
            {{ t('IncentivePlan.planAPRLabel') }}:
            {{ props.data.rewardType !== 3 ? props.data.planAPR + '%' : 'Not Available' }}
          </p>
        </div>
      </div>
      <AddTokenToPlan :data="data" />
    </div>
    <div class="tab-hedar">
      <v-tabs v-model="tab" fixed-tabs color="deep-purple-accent-4" @click.stop.prevent>
        <v-tab selected-class="custom-tabs" :value="1" class="text-none">{{
          $t('IncentivePlan.curBlockInfoTab')
          }}</v-tab>
        <v-tab selected-class="custom-tabs" :value="2" class="text-none">{{
          $t('IncentivePlan.basicTab')
          }}</v-tab>
      </v-tabs>
    </div>
    <BasicInfo v-if="tab === 2" :data="data" />
    <CurBlockInfo v-else :data="data" />
  </v-card>
</template>
<script setup lang="ts">
import { ref, defineProps } from 'vue'
import { t } from '@/lang'
import BasicInfo from './BasicInfo.vue'
import CurBlockInfo from './CurBlockInfo.vue'
import AddTokenToPlan from './AddTokenToPlan.vue'
const tab = ref(1)
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
})

</script>
<style scoped lang="scss">
.tab-hedar {
  margin: 16px 0;

  :deep(.v-tabs) {
    height: 32px !important;

    .v-btn {
      height: 32px !important;
      font-size: 14px;
      color: #bbbaba;
      font-weight: 400 !important;
    }
  }
}

.det-box {
  :deep(.v-container) {
    padding: 0 !important;
  }
}

.text-none {
  margin: 0 !important;
}
</style>