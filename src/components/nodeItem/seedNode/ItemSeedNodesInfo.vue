<template>
  <div class="card-box">
    <Loading v-if="isLoading" />
    <div class="box-body" v-else>
      <div class="current-top">
        <v-row align="start" no-gutters class="current-num">
          <v-col cols="4">
            {{ bigNumFormat(infoData.totalSupply, 5, 0.000001) }}
          </v-col>
          <v-col class="my-flexaj" cols="4">
            {{ bigNumFormat(infoData.daoTokenBalance, 5, 0.000001) }}
          </v-col>
          <v-col cols="4">
            {{ bigNumFormat(infoData.redeemAssetPoolEth, 5, 0.000001) }}
          </v-col>
        </v-row>
        <v-row align="start" no-gutters class="current-name">
          <v-col cols="4">Total supply</v-col>
          <v-col cols="4">Circulating ERC-20</v-col>
          <v-col cols="4">ETH In Redeem Pool</v-col>
        </v-row>
      </div>
      <div>
        <v-row align="start" no-gutters class="current-num">
          <v-col class="my-flexaj" cols="4">
            {{ bigNumFormat(infoData.redeemedErc20Amont, 5, 0.000001) }}
          </v-col>
        </v-row>
        <v-row align="start" no-gutters class="current-name">
          <v-col cols="4">Redeemed</v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import { togetherDaoToken } from '@/api/daos'
import { bigNumFormat } from '@/utils'
import { ref, onMounted } from 'vue'
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
  const res = await togetherDaoToken({
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
