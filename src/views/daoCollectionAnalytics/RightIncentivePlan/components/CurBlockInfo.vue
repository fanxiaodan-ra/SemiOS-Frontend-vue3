<template>
  <div>
    <div v-if="props.data.incentiveStatus === 2">
      <v-container class="!p-0">
        <v-row align="start" no-gutters>
          <v-col v-for="item in dataList" :key="item.title" :cols="12" :sm="4">
            <v-sheet class="ma-2">
              <div class="text-white text-base font-bold">
                <component :is="item.value" v-if="typeof item.value === 'function'"></component>
                <template v-else>{{ item.value }}</template>
              </div>
              <div class="text-grey-1 text-xs font-bold">{{ item.title }}</div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <div v-else class="h-[120px] leading-[121px] text-center  text-grey-1 text-base font-bold">
      {{ planDesc }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { t } from '@/lang';
import { defineProps, computed, h } from 'vue';
import { bigNumFormat, timeFormatting } from '@/utils';
import TokenIcon from '@/components/TokenIcon.vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const planDesc = computed(() => {
  return props.data.incentiveStatus === 1
    ? 'This plan has not started yet'
    : 'This plan is closed';
});

const dataList = computed(() => {
  return [
    {
      title: t('IncentivePlan.topupHoldersLabel'),
      value: bigNumFormat(props.data.topupHolders),
    },
    {
      title: t('IncentivePlan.topupBalanceLabel'),
      value: () => {
        const params = props.data.incentiveType === 1 
        ? {
          payCurrencyType: props.data.inputTokenSymbol,
          inputTokenAddress: props.data.inputTokenAddress,
        } : {
            daoToken: true,
            daoSymbol: props.data.outputTokenSymbol,
            daoErc20Address: props.data.erc20TokenAddress,
        }
        return h('div', { class: 'flex items-center' }, [
          h('span', { class: 'mr-2' }, bigNumFormat(props.data.topupBalance),),
          h(TokenIcon, {
            class: 'text-grey-1',
            ...params,
          })
        ])
      }
    },
    {
      title: t('IncentivePlan.blockRewardLabel'),
      value: () => {
        return h('div', { class: 'flex items-center' }, [
          h('span', { class: 'mr-2' }, bigNumFormat(props.data.blockReward)),
          h(TokenIcon, {
            class: 'text-grey-1',
            payCurrencyType: props.data.rewardTokenSymbol,
            inputTokenAddress: props.data.rewardToken,
          })
        ])
      }
    },
    {
      title: t('IncentivePlan.blockEndTimeLabel'),
      value: timeFormatting(props.data.blockEndTime),
    },
  ]
})

</script>