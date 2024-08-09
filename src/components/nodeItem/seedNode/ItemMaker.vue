<template>
  <div class="card-box">
    <Loading v-if="isLoading" />
    <div class="box-body" v-else>
      <div class="current-top">
        <v-row align="start" no-gutters class="current-num">
          <v-col cols="4">
            {{ bigNumFormat(infoData.makerTotalAmount, 5, 0.000001) }}
          </v-col>
          <v-col class="my-flexaj" cols="4">
            {{ bigNumFormat(infoData.noSpendEthAmount, 5, 0.000001) }}
            <TokenIcon
              size="16px"
              class="ml-2"
              :payCurrencyType="dataObj.payCurrencyType"
              :inputTokenAddress="dataObj.inputTokenAddress"
            />
          </v-col>
          <v-col cols="4" class="flex items-center">
            {{ bigNumFormat(infoData.noSpendTokenAmount, 5, 0.000001) }}
            <TokenIcon
              size="16px"
              class="ml-2"
              :daoToken="true"
              :daoSymbol="dataObj.daoSymbol"
              :daoErc20Address="dataObj.daoErc20Address"
            />
          </v-col>
        </v-row>
        <v-row align="start" no-gutters class="current-name">
          <v-col cols="4">{{ t('makerInfo.makers') }}</v-col>
          <v-col cols="4">{{  t('makerInfo.totalUnspentInputTokens') }}</v-col>
          <v-col cols="4">{{ t('makerInfo.totalLockedOutputTokens') }}</v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import { togetherDaoMaker } from '@/api/daos'
import { bigNumFormat } from '@/utils'
import { ref, onMounted } from 'vue'
import { t } from '@/lang'
import TokenIcon from '@/components/TokenIcon.vue'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})

const isLoading = ref(true)
const infoData = ref({}) as any
const getData = async () => {
  isLoading.value = true
  const res = await togetherDaoMaker({
    daoId: props.dataObj.daoId,
  })
  infoData.value = res.data
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.flexbox {
  height: 116px;
}
.box-body {
  flex: 1;
}
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
