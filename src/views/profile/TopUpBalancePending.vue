<template>
  <div class="card-box">
    <div v-if="!isLoading" class="flex flex-col justify-center pl-[104px] xl:pl-[60px]">
      <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24 bg-card-1 min-w-[1080px] max-w-[1200px]"
        v-for="(item, idx) in list" :key="item.daoName + idx">
        <div class="card-top">
          <div class="t-img"><img :src="item.daoLogoUrl" alt="" /></div>
          <div class="t-box">
            <h4>
              {{ item.daoName }}
            </h4>
          </div>
        </div>
        <div class="card-bom">
          <v-table max-height="212px" fixed-header>
            <thead>
              <tr>
                <th class="table-title">Minted NFT</th>
                <th class="table-title">Voucher NFT</th>
                <th class="table-title">Operation Time</th>
                <th class="table-title">Mint Fee</th>
                <th class="table-title">Block Countdown</th>
              </tr>
            </thead>
            <Loading v-if="item.isLoading" />
            <tbody v-else>
              <tr v-for="tableItem in (item.topUpBalanceList as any)" :key="tableItem.name">
                <td>
                  <router-link :to="`/workDetails?id=${tableItem.mintedWorkId}`" class="a-style">
                    <v-btn class="text-none title-name" variant="text" size="small">
                      {{ tableItem.mintedDaoName }}.{{
                      tableItem.mintedWorkNumber
                      }}
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/workDetails?id=${tableItem.voucherWorkId}`" class="a-style">
                    <v-btn class="text-none title-name" variant="text" size="small">
                      {{ tableItem.voucherDaoName }}.{{
                      tableItem.voucherWorkNumber
                      }}
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  {{ timeFormatting(tableItem.operationTime, 0, 1) }}
                </td>
                <td class="flexcen">
                  {{ bigNumFormat(tableItem.mintFee, 5, 0.000001) }}
                  <TokenIcon size="14px" :payCurrencyType="tableItem.mintedDaoPayCurrencyType"
                    :inputTokenAddress="tableItem.mintedDaoInputTokenAddress" />
                </td>
                <td>
                  {{ claimTime(tableItem.endBlockTime, 0) }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-card>
    </div>
    <table-loading :is-loading="isLoading" :list="list" :isAll="true" />
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import TokenIcon from '@/components/TokenIcon.vue'
import TableLoading from '@/components/TableLoading.vue'
import { ref, onMounted } from 'vue'
import { topupBalancePending, topupBalancePendingDetail } from '@/api/user'
import { bigNumFormat, timeFormatting, claimTime } from '@/utils'
const isLoading = ref(true)
const list = ref<any>([])
const getItemDetail = async (item: any) => {
  const res = (await topupBalancePendingDetail({
    projectId: item.projectId,
  })) as any
  item.topUpBalanceList = res.dataList
  item.isLoading = false
}
const getData = async () => {
  try {
    const res = (await topupBalancePending()) as any
    list.value = res.dataList.map((item: any) => {
      return {
        ...item,
        isLoading: true,
        topUpBalanceList: [],
      }
    })
    isLoading.value = false
    for (let i = 0; i < list.value.length; i++) {
      await getItemDetail(list.value[i])
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.card-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  :deep(.v-card) {
    background-color: #1A1F2E !important;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 24px;
    width: 100%;
  }
}
.card-top {
  display: flex;
  height: 68px;
  margin-bottom: 24px;
}
.t-img {
  width: 68px;
  height: 68px;
  background-color: #1A1F2E;
  margin-right: 24px;
  flex: 0 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.t-box {
  display: flex;
  h4 {
    color: #bbbaba;
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 4px;
    flex: 1;
    height: 32px;
    display: flex;
    align-items: flex-end;
  }
}
.card-bom {
  :deep(.v-table) {
    height: 212px;
  }
  .title-name {
    color: #b3b5f2;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  .table-title {
    font-size: 16px;
    color: #9e9e9e;
  }
  .flexbox {
    height: 152px;
    position: absolute;
    left: 0;
    right: 0;
  }
}
</style>
