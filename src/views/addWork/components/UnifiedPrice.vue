<template>
  <v-row no-gutters>
    <v-col cols="6" class="text-sm text-grey-1 flex items-center">{{ t('common.unifiedPrice') }}</v-col>
    <v-col cols="6" class="text-sm text-grey-1 flex items-center justify-end">
      {{ props.dataObj.canvasCurrentPrice }}
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
import { t } from '@/lang'
import TokenIcon from '@/components/TokenIcon.vue'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>
