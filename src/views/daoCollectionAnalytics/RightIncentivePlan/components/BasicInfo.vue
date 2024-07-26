<template>
  <div>
    <v-skeleton-loader
      v-if="isLoading"
      class="mx-auto flex"
      type="list-item-two-line, list-item-two-line"
    ></v-skeleton-loader>
    <v-container class="!p-0" v-else>
      <v-row align="start" no-gutters>
        <v-col v-for="item in infoList" :key="item.title" :cols="12" :sm="4">
          <v-sheet class="ma-2">
            <div class="text-white text-base font-bold leading-[30px]">
              <template v-if="typeof item.value === 'function'">
                <component :is="item.value"></component>
              </template>
              <template v-else>{{ item.value }}</template>
            </div>
            <div class="text-grey-1 text-xs font-bold">{{ item.title }}</div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref, computed, h } from 'vue';
import { t } from '@/lang';
import useDaoColAnsStore from '@/store/daoColAns';
import TokenIcon from '@/components/TokenIcon.vue';
import { bigNumFormat } from '@/utils';
import dayjs from 'dayjs';
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const info = ref()
const isLoading = ref(false)

const daoColAnsStore = useDaoColAnsStore();

const infoList = computed(() => {
  if (!info.value) return [];
  const result = [
    {
      title: t('IncentivePlan.incentiveType'),
      value: info.value.remainBlock
    },
    {
      title: t('IncentivePlan.blockDuration'),
      value: `${info.value.duration} ${t('IncentivePlan.hours')}`
    },
    {
      title: t('IncentivePlan.totalTokenForPlan'),
      value: () => h('div', { class: 'flex items-center' }, [
          h('span', { class: 'mr-2' }, bigNumFormat(info.value.incentiveAmount, 5)),
          h(TokenIcon, {
            class: 'text-grey-1',
            payCurrencyType: info.value.rewardTokenSymbol,
            inputTokenAddress: info.value.rewardToken,
          })
        ])
    },
    {
      title: t('IncentivePlan.tokenReleasedForPlan'),
      value: () => h('div', { class: 'flex items-center' }, [
        h('span', { class: 'mr-2' }, bigNumFormat(info.value.releasedAmount, 5)),
        h(TokenIcon, {
          class: 'text-grey-1',
          payCurrencyType: info.value.rewardTokenSymbol,
          inputTokenAddress: info.value.rewardToken,
        })
      ])
    },
    {
      title: t('IncentivePlan.startData'),
      value: dayjs(info.value.startDate).format('DD/MM/YYYY')
    }
  ];
  if (info.value.incentiveType === 1) {
    result.unshift({
      title: t('IncentivePlan.tokenType'),
      value: () => h('div', { class: 'flex items-center' }, [
        h('span', {}, t('IncentivePlan.inputToken')),
        h(TokenIcon, { 
          payCurrencyType: info.value.inputTokenSymbol,
          inputTokenAddress: info.value.inputTokenAddress,
         }),
      ]),
    });
  } else {
    result.unshift({
      title: t('IncentivePlan.tokenType'),
      value: () => h('div', { class: 'flex items-center' }, [
        h('span', { class: 'ml-2' }, t('IncentivePlan.outputToken')),
        h(TokenIcon, {
          daoToken: true,
          daoSymbol: info.value.outputTokenSymbol,
          daoErc20Address: info.value.erc20TokenAddress,
        }),
      ]),
    });
  }
  
  return result;
});

const initInfo = () => {
  isLoading.value = true;
  daoColAnsStore.getTogetherPlanBasicInfo({
    planId: props.data.planId,
  }).then((data) => {
    info.value = data;
  }).finally(() => {
    isLoading.value = false;
  })
};

onMounted(() => {
  initInfo()
})
</script>