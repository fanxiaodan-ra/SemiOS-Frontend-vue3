<template>
  <v-card class="pa-5 w-full mt-6" color="#1A1F2E">
    <v-card-title class="text-white text-lg px-0">Transactions</v-card-title>
    <v-data-table-server
      class="min-h-[400px] mt-6 text-grey-1 bg-card-2 text-xs"
      v-model:items-per-page="itemsPerPage"
      :headers="headers as any"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      item-value="name"
      @update:options="loadItems"
    >
      <template v-slot:['no-data']>
        <div class="mt-[8%]">
          <ChartNoData title="No events have occurred yet" text="Check again later." />
        </div>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader height="100%" type="table-tbody"></v-skeleton-loader>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2" v-show="pageCount > 0">
          <v-pagination
            v-model="curPage"
            :length="pageCount"
            active-color="#8C91FF"
            size="small"
            @update:model-value="pageChange"
          ></v-pagination>
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue'
import ChartNoData from '@/components/ChartNoData.vue';
import useDexStore from '@/store/dex';
import { bigNumFormat, ellipsis, timeFormatting, } from '@/utils';
import { computed } from 'vue';
import { watch } from 'vue';

const itemsPerPage = ref(10)
const headers = ref([
  {
    title: '',
    align: 'start',
    value: 'tradeTypeDesc',
    width: '200px'
  },
  {
    title: 'Txn Hash',
    align: 'end',
    value: 'transactionHash',
    width: '100px',
  },
  { title: 'In Token Amount', value: 'inTokenAmount', align: 'end', },
  { title: 'Out Token Amount', value: 'outTokenAmount', align: 'end' },
  { title: 'Swapped Rate', value: 'swappedRate', align: 'end' },
  { title: 'Amount', value: 'amount', align: 'end' },
  { title: 'Time', value: 'tradeTime', align: 'end' }
])
const totalItems = ref(0)
const loading:Ref = ref(false)
const curPage = ref(1)
const pageCount = ref(0)
const dexStore = useDexStore()

watch(() => dexStore.transactionListPageInfo, (val) => {
  curPage.value = val.pageNo
  pageCount.value = Math.ceil(val.count / itemsPerPage.value)
  itemsPerPage.value = val.pageSize
  totalItems.value = val.count
})

const serverItems = computed(() => {
  return dexStore.transactionList.map((item: {
    tradeTypeDesc: string,
    transactionHash: string,
    inTokenAmount: number,
    inTokenUnit: string,
    outTokenAmount: number,
    outTokenUnit: string,
    swappedRate: number,
    swappedRateUnit: string,
    account: string,
    tradeTime: number,
  }, index: number) => {
    return {
      tradeTypeDesc: item.tradeTypeDesc,
      transactionHash: ellipsis(item.transactionHash),
      inTokenAmount: `${bigNumFormat(item.inTokenAmount, 4, 0.0001)}${item.inTokenUnit}`,
      outTokenAmount: `${bigNumFormat(item.outTokenAmount, 4, 0.0001)}${item.outTokenUnit}`,
      swappedRate: `${bigNumFormat(item.swappedRate, 6, 0.0001)}${item.swappedRateUnit}`,
      amount: ellipsis(item.account),
      tradeTime: timeFormatting(item.tradeTime * 1000, 0, 1),
      code: index + 1,
    }
  })
})

const loadItems = async (options: {page: number, itemsPerPage: number}) => {
  try {
    const { page } = options
    loading.value = true
    const query = {
      tradeType: [5],
      pageNo: page,
      erc20Address: dexStore.ercToken.erc20Address,
    };
    await dexStore.getTransactions(query)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const pageChange = (val: number) => {
  loadItems({ page: val, itemsPerPage: itemsPerPage.value })
}

</script>
<style scoped>
.v-data-table::v-deep th {
  @apply text-grey-1 text-xs !font-bold;
}
.v-data-table::v-deep v-data-table-rows-loading td {
  padding: 0 !important;
}
</style>