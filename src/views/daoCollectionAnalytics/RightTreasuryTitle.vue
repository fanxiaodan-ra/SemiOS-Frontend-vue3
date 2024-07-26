<template>
  <v-card class="node-card">
    <div v-if="props.isLoading" class="card-loading">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="heading,heading, heading"
      ></v-skeleton-loader>
    </div>
    <div class="card-title" v-else>
      <p class="text-grey-3 text-lg font-medium font-['Inter'] tracking-tight my-6">
        {{ t('treasury.subTitle') }}
        <router-link :to="'/workDetails?id=' + userPermission.workId"
          class="hover:text-primary-2 text-indigo-400 text-lg font-medium font-['Inter'] tracking-tight">
          {{ `${userPermission.daoNameNft}.${userPermission.workNumber}` }}
        </router-link>
      </p>
      <h3 class="flex items-center">
        {{ t('treasury.address') }} :
        <span class="title-text flex items-center">
          <a
            class="token-icon mx-2"
            :href="aPush(props.initData.treasuryAddress)"
            target="_blank"
          >
            <span class="text-none fc8 text-lg hover:text-primary-2" variant="text">
              {{ ellipsis(props.initData.treasuryAddress) }}
              <v-tooltip activator="parent" location="top">
                {{ props.initData.treasuryAddress }}
              </v-tooltip>
            </span>
          </a>
          <CopyInformation
            size="24"
            fontSize="14"
            :address="props.initData.treasuryAddress"
          />
        </span>
      </h3>
      <h3 class="flex">
        {{ t('treasury.erc20ContractAddress') }} :
        <span class="title-text flex items-center">
          <a
            class="token-icon mx-2"
            :href="aPush(props.initData.erc20Address)"
            target="_blank"
          >
            <span class="text-none fc8 text-lg hover:text-primary-2" variant="text">
              {{ ellipsis(props.initData.erc20Address) }}
              <v-tooltip activator="parent" location="top">
                {{ props.initData.erc20Address }}
              </v-tooltip>
            </span>
          </a>
          <CopyInformation
            size="24"
            fontSize="14"
            :address="props.initData.erc20Address"
          />
        </span>
      </h3>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { t } from '@/lang'
import CopyInformation from '@/components/CopyInformation.vue'
import { ellipsis } from '@/utils'
import { APP_OPEN_URL } from '@/config'

const props = defineProps({
  initData: {
    type: Object,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
  userPermission: {
    type: Object,
    default: () => {},
  },
})

const aPush = (address: string) => {
  return `${APP_OPEN_URL}/address/${address}`
}
</script>

<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
  padding: 0 !important;
  margin: 0;
  margin-bottom: 24px;
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
