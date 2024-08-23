<template>
  <h4 v-if="props.title" class="font-h4">Current Block Window Information</h4>
  <template v-if="loading">
    <div class="flex">
      <v-skeleton-loader class="bg-transparent w-full" type="list-item-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="w-full bg-transparent" type="list-item-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="w-full bg-transparent" type="list-item-two-line"></v-skeleton-loader>
    </div>
    <div class="flex">
      <v-skeleton-loader class="bg-transparent w-full" type="list-item-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="w-full bg-transparent" type="list-item-two-line"></v-skeleton-loader>
      <v-skeleton-loader class="w-full bg-transparent" type="list-item-two-line"></v-skeleton-loader>
    </div>
  </template>
  <template v-else-if="props.dataObj.daoStatus === 3">
    <div class="h-[114px] text-grey-1 text-xs text-center leading-[114px]">
      This DAO is no longer in progress, so the mint window information is not available.
    </div>
  </template>
  <template v-else>
    <div class="current-top">
      <v-row align="start" no-gutters class="current-num">
        <v-col cols="4">
          {{ bigNumFormat(info?.minters, 5, 0.000001) }}
        </v-col>
        <v-col class="my-flexaj" cols="4">
          {{ bigNumFormat(info?.mintFee, 5, 0.000001) }}
          <TokenIcon mgl="6px" :daoToken="info?.daoToken" :daoSymbol="dataObj.daoSymbol"
            :daoErc20Address="dataObj.daoErc20Address" :payCurrencyType="dataObj.payCurrencyType"
            :inputTokenAddress="dataObj.inputTokenAddress" />
        </v-col>
        <v-col cols="4">
          {{ bigNumFormat(info?.mintedWorks, 5, 0.000001) }}
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="current-name">
        <v-col cols="4"> {{ $t('NodeDetail.mintersLabel') }} </v-col>
        <v-col cols="4"> {{ $t('NodeDetail.mintFeeLabel') }} </v-col>
        <v-col cols="4"> {{ $t('NodeDetail.mintedWorksLabel') }} </v-col>
      </v-row>
    </div>
    <div>
      <v-row align="start" no-gutters class="current-num">
        <v-col class="my-flexaj" cols="4">
          {{ bigNumFormat(info?.blockRewardToken, 5, 0.000001) }}
          <TokenIcon mgl="6px" :daoToken="true" :daoSymbol="dataObj.daoSymbol"
            :daoErc20Address="dataObj.daoErc20Address" />
          <span v-if="!info?.topupMode" class="my-flexaj">
            + {{ bigNumFormat(info?.blockRewardEth, 5, 0.000001) }}
            <TokenIcon mgl="6px" :payCurrencyType="dataObj.payCurrencyType"
              :inputTokenAddress="dataObj.inputTokenAddress" />
          </span>
        </v-col>
        <v-col class="my-flexaj" cols="4">
          {{ bigNumFormat(info?.internalRewardToken, 5, 0.000001) }}
          <TokenIcon
            mgl="6px"
            :daoToken="true"
            :daoSymbol="dataObj.daoSymbol"
            :daoErc20Address="dataObj.daoErc20Address" />
          <span v-if="!info?.topupMode" class="my-flexaj">
            +
            {{ bigNumFormat(info?.internalRewardEth, 5, 0.000001) }}
            <TokenIcon mgl="6px" :payCurrencyType="dataObj.payCurrencyType"
              :inputTokenAddress="dataObj.inputTokenAddress" />
          </span>
        </v-col>
        <v-col class="my-flexaj" cols="4" v-if="dataObj?.workStatus === 0">
          {{ bigNumFormat(dataObj.mintersMaxRewardToken, 5, 0.000001) }}
          <TokenIcon mgl="6px" :daoToken="true" :daoSymbol="dataObj.daoSymbol"
            :daoErc20Address="dataObj.daoErc20Address" />
          <span v-if="!props.topupMode" class="my-flexaj">
            +
            {{ bigNumFormat(dataObj.mintersMaxRewardEth, 5, 0.000001) }}
            <TokenIcon
              mgl="6px"
              :payCurrencyType="dataObj.payCurrencyType"
              :inputTokenAddress="dataObj.inputTokenAddress"
            />
          </span>
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="current-name">
        <v-col cols="4"> {{ $t('NodeDetail.blockRewardLabel') }} </v-col>
        <v-col cols="4"> {{ $t('NodeDetail.internalIncentivesLabel') }} </v-col>
        <v-col cols="4" v-if="dataObj?.workStatus === 0">Minter’s Max Reward by minting this work
        </v-col>
      </v-row>
    </div>
  </template>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref, computed } from 'vue'
import { bigNumFormat } from '@/utils'
import useCollectionDaoStore from '@/store/collectionDao'
import TokenIcon from '@/components/TokenIcon.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  topupMode: {
    type: Boolean,
    default: false,
  },
  title: {
    type: Boolean,
    default: false,
  },
})
const dataObj = computed(() => props.dataObj)
const info = ref({
  blockRewardEth: 0,
  blockRewardToken: 0,
  internalRewardEth: 0,
  internalRewardToken: 0,
  mintFee: 0,
  mintedWorks: 0,
  minters: 0,
  workStatus: 0,
  daoToken: false,
  topupMode: false,
});
const loading = ref(false)
const collectionDaoStore = useCollectionDaoStore()
const init = async () => {
  try {
    loading.value = true
    const daoId = props.dataObj.daoId
    const data = await collectionDaoStore.getDaoCollectionCurWin({
      daoId
    })
    info.value = data
  } catch (error) {
    console.error('error', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  init()
})


</script>

<style scoped lang="scss">
.current-top {
  margin-bottom: 16px;
}
.current-num {
  color: #fff;
  font-size: 16px;
}
.current-name {
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 400;
}
</style>
