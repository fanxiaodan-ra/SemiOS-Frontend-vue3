<template>
  <v-card class="pa-5 w-full mt-6" color="#1A1F2E">
    <v-card-title class="text-grey-1 text-lg px-0">Transactions</v-card-title>
    <v-data-table-server class="min-h-[400px] mt-6" color="#1A1F2E" v-model:items-per-page="itemsPerPage"
      :headers="headers as any" :items="serverItems" :items-length="totalItems" :loading="loading" item-value="name"
      @update:options="loadItems">
      <template v-slot:item.fromAddress="{ item }">
        <component :is="(item as any).fromAddress"></component>
      </template>
      <template v-slot:item.toAddress="{ item }">
        <component :is="(item as any).toAddress"></component>
      </template>
      <template v-slot:item.transactionHash="{ item }">
        <component :is="(item as any).transactionHash"></component>
      </template>
      <template v-slot:['no-data']>
        <div class="mt-[8%]">
          <ChartNoData title="No events have occurred yet" text="Check again later." />
        </div>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader height="100%" type="table-tbody"></v-skeleton-loader>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination v-model="curPage" :length="pageCount" color="#1A1F2E" size="small"></v-pagination>
        </div>
      </template>
    </v-data-table-server>
  </v-card>
</template>
<script setup lang="ts">
import { ref, Ref } from 'vue'
import ChartNoData from '@/components/ChartNoData.vue';
import { useRoute } from 'vue-router';
import useDaoStore from '@/store/dao';

const route = useRoute()
const daoStore = useDaoStore()
const itemsPerPage = ref(10)
const headers = ref([
  {
    title: 'From',
    align: 'start',
    value: 'fromAddress',
  },
  {
    title: 'To',
    align: 'end',
    value: 'toAddress',
  },
  { title: 'Txn Hash', value: 'transactionHash', align: 'end', },
  { title: 'Token Amount', value: 'amount', align: 'end' },
  { title: 'Time', value: 'createTime', align: 'end' },
  { title: 'Payment method', value: 'isUseTreasury', align: 'end' },
])
const serverItems = ref([])
const totalItems = ref(0)
const loading: Ref = ref(false)
const curPage = ref(1)
const pageCount = ref(0)

const loadItems = async (options: { page: number, itemsPerPage: number }) => {
  const { page } = options
  loading.value = '#C2C5FF'
  const query = {
    daoId: route.query.id,
    pageSize: itemsPerPage.value,
    pageNo: page,
  };
  try {
    const res: any = await daoStore.getTreasuryTransaction(query)
    const {
      dataList,
      total,
      pageNo,
    } = res
    curPage.value = pageNo
    serverItems.value = dataList
    totalItems.value = total
    pageCount.value = Math.ceil(total / itemsPerPage.value)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
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