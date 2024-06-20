<template>
  <v-card class="node-card">
    <div v-if="props.isLoading" class="card-loading">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="table-heading,table-heading"
      ></v-skeleton-loader>
    </div>
    <div class="card-title" v-else>
      <h3>
        SubNodes Asset Pool Address :
        <span class="title-text">
          <a class="token-icon" :href="aPush()" target="_blank">
            <v-btn class="text-none fc8" variant="text">
              {{ ellipsis(props.initData.subDaoAssetPool) }}
              <v-tooltip activator="parent" location="top">
                {{ props.initData.subDaoAssetPool }}
              </v-tooltip>
            </v-btn>
          </a>
          <CopyInformation
            size="24"
            fontSize="14"
            :address="props.initData.subDaoAssetPool"
          />
        </span>
      </h3>
      <h3>
        Erc-20 Contract :
        <span class="title-text">
          <a class="token-icon" :href="aPush()" target="_blank">
            <v-btn class="text-none fc8" variant="text">
              {{ ellipsis(props.initData.subDaoErc20) }}
              <v-tooltip activator="parent" location="top">
                {{ props.initData.subDaoErc20 }}
              </v-tooltip>
            </v-btn>
          </a>
          <CopyInformation
            size="24"
            fontSize="14"
            :address="props.initData.subDaoErc20"
          />
        </span>
      </h3>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import CopyInformation from '@/components/CopyInformation.vue'
import { ellipsis } from '@/utils'
const props = defineProps({
  initData: {
    type: Object,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
})
import { APP_OPEN_URL } from '@/config'
const aPush = () => {
  return `${APP_OPEN_URL}/address/${props.initData.subDaoAssetPool}`
}
</script>

<style scoped lang="scss">
.node-card {
  background-color: #252b3a !important;
  padding: 0 !important;
  margin: 8px;
  // :deep(.v-skeleton-loader__chip) {
  //   margin: 8px;
  //   height: 16px;
  // }
}
.card-title {
  display: flex;
  line-height: 64px;
  padding: 0 24px;
  flex-direction: column;

  h3 {
    color: #bbbaba;
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
}
.card-loading {
  display: flex;
  flex-direction: column;
  :deep(.v-skeleton-loader__chip) {
    max-width: 40%;
  }
}
:deep(.v-skeleton-loader) {
  background-color: transparent;
  box-shadow: none !important;
}
</style>
