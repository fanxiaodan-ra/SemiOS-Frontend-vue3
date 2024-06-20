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
          </v-col>
          <v-col cols="4">
            {{ bigNumFormat(infoData.noSpendTokenAmount, 5, 0.000001) }}
          </v-col>
        </v-row>
        <v-row align="start" no-gutters class="current-name">
          <v-col cols="4">Maker</v-col>
          <v-col cols="4">Total Unspent ETH</v-col>
          <v-col cols="4">Total Locked ERC-20</v-col>
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
