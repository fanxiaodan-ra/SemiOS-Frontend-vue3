<template>
  <v-table height="576" fixed-header>
    <thead>
      <tr>
        <th class="table-title"></th>
        <th class="table-title">Txn Hash</th>
        <th class="table-title">In Token Amount</th>
        <th class="table-title">Out Token Amount</th>
        <th class="table-title">Swapped Rate</th>
        <th class="table-title">Account</th>
        <th class="table-title">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in (props.list as any)" :key="item.name">
        <td class="co9e">
          {{ item.tradeTypeDesc }}
        </td>
        <td>
          <a class="token-icon" :href="aPush(item, 'tx')" target="_blank">
            <v-btn class="text-none" variant="text">
              <v-tooltip activator="parent" location="top" max-width="300">
                {{ item.transactionHash }}
              </v-tooltip>
              {{ ellipsis(item.transactionHash) }}
            </v-btn>
          </a>
        </td>
        <td class="co9e">
          {{ bigNumFormat(item.inTokenAmount, 5, 0.00001) }}
          {{ item.inTokenUnit }}
        </td>
        <td class="co9e">
          {{ bigNumFormat(item.outTokenAmount, 5, 0.00001) }}
          {{ item.outTokenUnit }}
        </td>
        <td class="co9e">
          {{ bigNumFormat(item.swappedRate, 5, 0.00001) }}
          {{ item.swappedRateUnit }}
        </td>
        <td>
          <a class="token-icon" :href="aPush(item)" target="_blank">
            <v-btn class="text-none" variant="text">
              <v-tooltip activator="parent" location="top" max-width="300">
                {{ item.account }}
              </v-tooltip>
              {{ ellipsis(item.account) }}
            </v-btn>
          </a>
        </td>
        <td class="co9e">
          {{ timeFormatting(item.tradeTime, 0, 1) }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { ellipsis, timeFormatting, bigNumFormat } from '@/utils'
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

import { APP_OPEN_URL } from '@/config'
const aPush = (item: any, type = 'address') => {
  return `${APP_OPEN_URL}/${type}/${item.userAddress}`
}
</script>

<style scoped lang="scss">
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
.co9e {
  color: #9e9e9e;
}
.text-none {
  color: #b3b5f2;
}
</style>
