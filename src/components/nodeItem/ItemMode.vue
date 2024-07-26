<template>
  <h4 v-if="props.title" class="font-h4">Mode status</h4>
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
    <div class="mode-top">
      <v-row align="start" no-gutters class="mode-num">
        <v-col class="mode-item">
          <img src="@/assets/images/success.png" class="iconpng" v-if="info.lotteryMode" />
          <img src="@/assets/images/error.png" class="iconpng" v-else />
        </v-col>
        <v-col>
          <img src="@/assets/images/success.png" class="iconpng" v-if="info.daoToken" />
          <img src="@/assets/images/error.png" class="iconpng" v-else />
        </v-col>
        <v-col class="my-flexaj">
          <img src="@/assets/images/success.png" class="iconpng" v-if="info.topupMode" />
          <img src="@/assets/images/error.png" class="iconpng" v-else />
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="mode-name">
        <v-col>
          {{ $t('NodeDetail.lotteryModeLabel') }}
          <span v-if="info.lotteryMode">
            ({{ $t('NodeDetail.rolloverLabel') }}:
            {{ info.lotteryDuration }})
          </span>
        </v-col>
        <v-col> {{ $t('NodeDetail.erc20TokenModeLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.topupModeLabel') }} </v-col>
      </v-row>
    </div>
    <div>
      <v-row align="start" no-gutters class="mode-num">
        <v-col class="my-flexaj">
          <img src="@/assets/images/success.png" class="iconpng" v-if="info.unifiedPriceMode" />
          <img src="@/assets/images/error.png" class="iconpng" v-else />
          <div class="my-flexaj" v-if="info.unifiedPriceMode">
            {{ bigNumFormat(info.unifiedPrice, 5, 0.000001) }}
            <TokenIcon mgl="6px" size="14px" :payCurrencyType="props.dataObj.payCurrencyType"
              :inputTokenAddress="props.dataObj.inputTokenAddress" />
          </div>
        </v-col>
        <v-col>
          <img src="@/assets/images/success.png" class="iconpng" v-if="info.speicialStrategy" />
          <img src="@/assets/images/error.png" class="iconpng" v-else />
        </v-col>
        <v-col class="my-flexaj">
          <img src="@/assets/images/success.png" class="iconpng" v-if="info.infiniteMode" />
          <img src="@/assets/images/error.png" class="iconpng" v-else />
        </v-col>
      </v-row>
      <v-row align="start" no-gutters class="mode-name">
        <v-col> {{ $t('NodeDetail.unifiedPriceModeLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.specialStartegyLabel') }} </v-col>
        <v-col> {{ $t('NodeDetail.infiniteModeLabel') }} </v-col>
      </v-row>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import { bigNumFormat } from '@/utils'
import useCollectionDaoStore from '@/store/collectionDao'
import TokenIcon from '@/components/TokenIcon.vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  title: {
    type: Boolean,
    default: false,
  },
  topupMode: {
    type: Boolean,
    default: false,
  },
})
const collectionDaoStore = useCollectionDaoStore()
const loading = ref(false)
const info = ref({
  lotteryMode: true,
  lotteryDuration: 0,
  daoToken: true,
  topupMode: true,
  unifiedPriceMode: true,
  unifiedPrice: 0,
  erc20PaymentMode: true,
  speicialStrategy: true,
  infiniteMode: true,
})
const init = async () => {
  try {
    loading.value = true
    const data = await collectionDaoStore.getDaoCollectionModeStatus({
      daoId: props.dataObj.daoId,
    })
    info.value = data
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">
.mode-top {
  margin-bottom: 16px;
}
.mode-num {
  color: #fff;
  font-size: 16px;
  line-height: 28px;
  i {
    font-size: 16px;
  }
}
.mode-name {
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 400;
}
.iconpng {
  margin-left: 0;
}
</style>
