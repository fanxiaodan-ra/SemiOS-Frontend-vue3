<template>
  <v-row no-gutters>
    <v-col cols="6" class="text-font">{{ t('common.floorPrice') }}</v-col>
    <v-col cols="6" class="text-font justify-end">
      {{ props.dataObj.daoFloorPrice }}
      <TokenIcon
        size="14px"
        mgl="6px"
        :daoToken="props.dataObj.erc20PaymentMode"
        :daoSymbol="props.dataObj.daoSymbol"
        :daoErc20Address="props.dataObj.daoErc20Address"
        :payCurrencyType="props.dataObj.payCurrencyType"
        :inputTokenAddress="props.dataObj.inputTokenAddress"
      />
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import TokenIcon from '@/components/TokenIcon.vue'
import { t } from '@/lang'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>
<style lang="scss" scoped>
  .text-font {
    font-weight: 400;
    font-size: 14px;
    color: #9e9e9e;
    display: flex;
    align-items: center;
  }
</style>