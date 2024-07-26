<template>
  <h4 v-if="props.title" class="font-h4">Basic Information</h4>
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
  <template v-else>
    <div class="basic-top">
      <v-row align="start" no-gutters class="basic-num">
        <v-col>
          {{ bigNumFormat(info.mintCap, 5, 0.000001) }}
          /
          {{ bigNumFormat(info.totalMintCap, 5, 0.000001) }}
        </v-col>
        <v-col>
          {{ bigNumFormat(info.mintWindowCap, 5, 0.000001) }}
          /
          {{ bigNumFormat(info.totalMintWindowCap, 5, 0.000001) }}
        </v-col>
        <v-col class="my-flexaj">
          {{ bigNumFormat(info.subDaoAssetPoolEth, 5, 0.000001) }}
          <TokenIcon :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress" />
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="basic-name">
        <v-col> {{ $t('NodeDetail.totalNftCastingLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.blockMintedWorkByBlockMintCapLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.subNodesAssetPoolETHLabel') }} </v-col>
      </v-row>
    </div>
    <div>
      <v-row align="start" no-gutters class="basic-num">
        <v-col>
          {{ bigNumFormat(info.mintWindowDuration, 5, 0.000001) }}
        </v-col>
        <v-col>
          {{ bigNumFormat(info.remainingMintWindow, 5, 0.000001) }}
        </v-col>
        <v-col class="my-flexaj">{{ bigNumFormat(info.subDaoAssetPoolDaoToken, 5, 0.000001) }}
          <TokenIcon :daoToken="true" :daoSymbol="props.dataObj.daoSymbol"
            :daoErc20Address="props.dataObj.daoErc20Address" />
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="basic-name">
        <v-col> {{ $t('NodeDetail.blockWindowDurationLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.remainingBlockWindowsLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.subNodesAssetPoolERC20TokensLabel') }} </v-col>
      </v-row>
    </div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { bigNumFormat } from '@/utils'
import useCollectionDaoStore from '@/store/collectionDao';
import TokenIcon from '@/components/TokenIcon.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => { },
  },
  title: {
    type: Boolean,
    default: false,
  },
})

const store = useCollectionDaoStore()
const loading = ref(false)
const info = ref({
  mintCap: 0,
  totalMintCap: 0,
  mintWindowCap: 0,
  totalMintWindowCap: 0,
  mintWindowDuration: 0,
  remainingMintWindow: 0,
  subDaoAssetPoolEth: 0,
  subDaoAssetPoolDaoToken: 0,
})
const init = async () => {
  loading.value = true
  try {
    const data = await store.getDaoCollectionBasicInfo({
      daoId: props.dataObj.daoId,
    })
    info.value = data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }

}

onMounted(() => {
  init()
})

</script>

<style scoped lang="scss">
.basic-top {
  margin-bottom: 16px;
}

.basic-num {
  color: #fff;
  font-size: 16px;
}

.basic-name {
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 400;
}
</style>
