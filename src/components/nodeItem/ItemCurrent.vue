<template>
  <h4 v-if="props.title" class="font-h4">Current Block Window Information</h4>
  <div class="current-top">
    <v-row align="start" no-gutters class="current-num">
      <v-col cols="4">
        {{ bigNumFormat(props.dataObj.minters, 5, 0.000001) }}
      </v-col>
      <v-col class="my-flexaj" cols="4">
        {{ bigNumFormat(props.dataObj.mintFee, 5, 0.000001) }}
        <TokenIcon
          mgl="6px"
          :payCurrencyType="props.dataObj.payCurrencyType"
          :inputTokenAddress="props.dataObj.inputTokenAddress"
        />
      </v-col>
      <v-col cols="4">
        {{ bigNumFormat(props.dataObj.mintedWorks, 5, 0.000001) }}
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
        {{ bigNumFormat(props.dataObj.blockRewardToken, 5, 0.000001) }}
        <TokenIcon
          mgl="6px"
          :daoToken="true"
          :daoSymbol="props.dataObj.daoSymbol"
          :daoErc20Address="props.dataObj.daoErc20Address"
        />
        <span v-if="!props.topupMode" class="my-flexaj">
          + {{ bigNumFormat(props.dataObj.blockRewardEth, 5, 0.000001) }}
          <TokenIcon
            mgl="6px"
            :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress"
          />
        </span>
      </v-col>
      <v-col class="my-flexaj" cols="4">
        {{ bigNumFormat(props.dataObj.internalRewardToken, 5, 0.000001) }}
        <TokenIcon
          mgl="6px"
          :daoToken="true"
          :daoSymbol="props.dataObj.daoSymbol"
          :daoErc20Address="props.dataObj.daoErc20Address"
        />
        <span v-if="!props.topupMode" class="my-flexaj">
          +
          {{ bigNumFormat(props.dataObj.internalRewardEth, 5, 0.000001) }}
          <TokenIcon
            mgl="6px"
            :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress"
          />
        </span>
      </v-col>
      <v-col class="my-flexaj" cols="4" v-if="props.dataObj.workStatus === 0">
        {{ bigNumFormat(props.dataObj.mintersMaxRewardToken, 5, 0.000001) }}
        <TokenIcon
          mgl="6px"
          :daoToken="true"
          :daoSymbol="props.dataObj.daoSymbol"
          :daoErc20Address="props.dataObj.daoErc20Address"
        />
        <span v-if="!props.topupMode" class="my-flexaj">
          +
          {{ bigNumFormat(props.dataObj.mintersMaxRewardEth, 5, 0.000001) }}
          <TokenIcon
            mgl="6px"
            :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress"
          />
        </span>
      </v-col>
    </v-row>
    <v-row align="start" no-gutters class="current-name">
      <v-col cols="4"> {{ $t('NodeDetail.blockRewardLabel') }} </v-col>
      <v-col cols="4"> {{ $t('NodeDetail.internalIncentivesLabel') }} </v-col>
      <v-col cols="4" v-if="props.dataObj.workStatus === 0"
        >Minter’s Max Reward by minting this work
      </v-col>
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
  topupMode: {
    type: Boolean,
    default: false,
  },
  title: {
    type: Boolean,
    default: false,
  },
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
