<template>
  <v-card class="page-card node-card !bg-transparent">
    <div class="page-hedar py-4">
      <v-tabs v-model="tab" fixed-tabs color="deep-purple-accent-4">
        <v-tab
          :value="1"
          class="text-none"
          selected-class="custom-tabs"
          v-if="props.dataObj.daoStatus !== 3"
          >{{ $t('NodeDetail.mintableWorksLabel') }}
        </v-tab>
        <v-tab :value="2" class="text-none" selected-class="custom-tabs"
          >{{ $t('NodeDetail.nftsLabel') }}
        </v-tab>
        <v-tab
          :value="3"
          class="text-none"
          selected-class="custom-tabs"
          v-if="props.dataObj.daoStatus !== 3"
          >{{ $t('NodeDetail.drbNFTsLabel') }}
        </v-tab>
        <v-tab :value="4" class="text-none" selected-class="custom-tabs"
          >{{ $t('NodeDetail.relatedNodesLabel') }}
        </v-tab>
        <v-tab :value="5" class="text-none" selected-class="custom-tabs"
          >{{ $t('NodeDetail.analyticsLabel') }}
        </v-tab>
        <v-tab :value="6" class="text-none" selected-class="custom-tabs"
          >{{ $t('NodeDetail.assetAllocationOverviewLabel') }}
        </v-tab>
      </v-tabs>
    </div>

    <v-container fluid class="container-box">
      <component
        ref="childRef"
        :is="currentCopmonent[tab - 1]"
        :dataObj="props.dataObj"
      ></component>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
import { cancelAllRequests } from '@/api/request'
import { ref, onMounted, shallowRef, watch } from 'vue'
import PageWorks from './PageWorks.vue'
import PageNfts from './PageNfts.vue'
import PageDrbNfts from './PageDrbNfts.vue'
import PageRelatedNodes from './PageRelatedNodes.vue'
import PageAnalytics from './PageAnalytic/Index.vue'
import PageAssetAllocationOverview from './PageAstAllocationOverview/Index.vue'

const currentCopmonent = shallowRef([
  PageWorks,
  PageNfts,
  PageDrbNfts,
  PageRelatedNodes,
  PageAnalytics,
  PageAssetAllocationOverview,
])
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const tab = ref(1)

watch(
  () => tab.value,
  () => {
    cancelAllRequests()
  }
)
import { useRoute } from 'vue-router'
const route = useRoute()
onMounted(() => {
  tab.value = Number(route.query.type) ? (Number(route.query.type) as any) : 1
})
</script>
<style lang="scss" scoped>
.page-card {
  flex: 1;
  padding: 0;
}

.page-hedar {
  // border-top: 0.0625rem solid #2F305B !important;
  border-bottom: 0.0625rem solid #2f305b !important;
  font-size: 12px;
  :deep(.v-tabs) {
    height: 40px !important;
    .v-btn {
      height: 40px !important;
      font-size: 14px;
      color: #bbbaba;
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
.container-box {
  min-height: 368px;
}
</style>
