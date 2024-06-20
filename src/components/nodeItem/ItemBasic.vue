<template>
  <h4 v-if="props.title" class="font-h4">Basic Information</h4>
  <div class="basic-top">
    <v-row align="start" no-gutters class="basic-num">
      <v-col>
        {{ bigNumFormat(props.dataObj.mintCap, 5, 0.000001) }}
        /
        {{ bigNumFormat(props.dataObj.totalMintCap, 5, 0.000001) }}
      </v-col>
      <v-col>
        {{ bigNumFormat(props.dataObj.mintWindowCap, 5, 0.000001) }}
        /
        {{ bigNumFormat(props.dataObj.totalMintWindowCap, 5, 0.000001) }}
      </v-col>
      <v-col class="my-flexaj">
        {{ bigNumFormat(props.dataObj.subDaoAssetPoolEth, 5, 0.000001) }}
        <TokenIcon
          :payCurrencyType="props.dataObj.payCurrencyType"
          :inputTokenAddress="props.dataObj.inputTokenAddress"
        />
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
        {{ bigNumFormat(props.dataObj.mintWindowDuration, 5, 0.000001) }}
      </v-col>
      <v-col>
        {{ bigNumFormat(props.dataObj.remainingMintWindow, 5, 0.000001) }}
      </v-col>
      <v-col class="my-flexaj"
        >{{ bigNumFormat(props.dataObj.subDaoAssetPoolDaoToken, 5, 0.000001) }}
        <TokenIcon
          :daoToken="true"
          :daoSymbol="props.dataObj.daoSymbol"
          :daoErc20Address="props.dataObj.daoErc20Address"
        />
      </v-col>
    </v-row>
    <v-row align="start" no-gutters class="basic-name">
      <v-col> {{ $t('NodeDetail.blockWindowDurationLabel') }} </v-col>
      <v-col> {{ $t('NodeDetail.remainingBlockWindowsLabel') }} </v-col>
      <v-col> {{ $t('NodeDetail.subNodesAssetPoolERC20TokensLabel') }} </v-col>
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
