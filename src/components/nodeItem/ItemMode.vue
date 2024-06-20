<template>
  <h4 v-if="props.title" class="font-h4">Mode status</h4>
  <div class="mode-top">
    <v-row align="start" no-gutters class="mode-num">
      <v-col class="mode-item">
        <img
          src="@/assets/images/success.png"
          class="iconpng"
          v-if="props.dataObj.lotteryMode"
        />
        <img src="@/assets/images/error.png" class="iconpng" v-else />
      </v-col>
      <v-col>
        <img
          src="@/assets/images/success.png"
          class="iconpng"
          v-if="props.dataObj.daoToken"
        />
        <img src="@/assets/images/error.png" class="iconpng" v-else />
      </v-col>
      <v-col class="my-flexaj">
        <img
          src="@/assets/images/success.png"
          class="iconpng"
          v-if="props.topupMode"
        />
        <img src="@/assets/images/error.png" class="iconpng" v-else />
      </v-col>
    </v-row>
    <v-row align="start" no-gutters class="mode-name">
      <v-col>
        {{ $t('NodeDetail.lotteryModeLabel') }}
        <span v-if="props.dataObj.lotteryMode">
          ({{ $t('NodeDetail.rolloverLabel') }}:
          {{ props.dataObj.lotteryDuration }})
        </span>
      </v-col>
      <v-col> {{ $t('NodeDetail.erc20TokenModeLabel') }} </v-col>
      <v-col> {{ $t('NodeDetail.topupModeLabel') }} </v-col>
    </v-row>
  </div>
  <div>
    <v-row align="start" no-gutters class="mode-num">
      <v-col class="my-flexaj">
        <img
          src="@/assets/images/success.png"
          class="iconpng"
          v-if="props.dataObj.unifiedPriceMode"
        />
        <img src="@/assets/images/error.png" class="iconpng" v-else />
        <div class="my-flexaj" v-if="props.dataObj.unifiedPriceMode">
          {{ bigNumFormat(props.dataObj.unifiedPrice, 5, 0.000001) }}
          <TokenIcon
            mgl="6px"
            size="14px"
            :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress"
          />
        </div>
      </v-col>
      <v-col>
        <img
          src="@/assets/images/success.png"
          class="iconpng"
          v-if="props.dataObj.speicialStrategy"
        />
        <img src="@/assets/images/error.png" class="iconpng" v-else />
      </v-col>
      <v-col class="my-flexaj">
        <img
          src="@/assets/images/success.png"
          class="iconpng"
          v-if="props.dataObj.infiniteMode"
        />
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

<script setup lang="ts">
import { bigNumFormat } from '@/utils'
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
