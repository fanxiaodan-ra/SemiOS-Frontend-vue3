<template>
  <div class="maker flex items-center">
    <div v-for="item in makerInfo" :key="item.key" class="flex items-center mr-2">
      <HintIcon :title="item.hint" :icon="item.icon" classes="!text-2xl text-primary-3 mr-1"/>
      <span class="text-sm font-bold">{{ item.value }}</span>
      <template v-if="item.key === 'noSpendEthAmount'">
        <TokenIcon
          size="14px"
          :payCurrencyType="item.payCurrencyType"
          :inputTokenAddress="item.inputTokenAddress"
        />
      </template>
      <template v-if="item.key === 'noSpendTokenAmount'">
        <TokenIcon
          size="14px"
          :daoToken="true"
          :daoSymbol="item.daoSymbol"
          :daoErc20Address="item.daoErc20Address"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { t } from '@/lang';
import { MAKER_CONFIG } from './config'
import { defineProps, computed, ComputedRef } from 'vue'
import HintIcon from '@/components/HintIcon.vue'
import TokenIcon from '@/components/TokenIcon.vue';
import { formatNumber } from '@/utils';

interface Maker {
  key: string;
  icon: string;
  hint: string;
  value: string;
  payCurrencyType?: string;
  daoSymbol?: string;
  daoErc20Address?: string;
  inputTokenAddress?: string;
}
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})

const makerInfo: ComputedRef<Maker[]> = computed(() => {
  return MAKER_CONFIG.map((item) => {
    const result = {
      ...item,
      hint: t(item.hint),
      value: formatNumber(props.dataObj.togetherDaoMakerVo[item.key]),
    }
    item.key === 'noSpendEthAmount' && Object.assign(result, {
      payCurrencyType: props.dataObj.payCurrencyType,
      inputTokenAddress: props.dataObj.inputTokenAddress,
    })
    item.key === 'noSpendTokenAmount' && Object.assign(result, {
      daoSymbol: props.dataObj.daoSymbol,
      // this parameter is needed to be unified with the TokenIcon component
      // subNode data has daoErc20Address, but seedNode data has erc20Address
      daoErc20Address: props.dataObj.daoErc20Address || props.dataObj.erc20Address,
    })
    return result
  })
})


</script>