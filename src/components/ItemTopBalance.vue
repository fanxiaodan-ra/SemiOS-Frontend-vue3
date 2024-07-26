<template>
  <h4 class="font-h4">Top-up balance</h4>
  <v-table max-height="168px" fixed-header>
    <thead>
      <tr>
        <th class="table-title">Seed Nodes</th>
        <th class="table-title">ETH Balance</th>
        <th class="table-title">Locked ERC-20 Tokens</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in (props.dataList as any)" :key="item.name">
        <td>
          <router-link
            :to="`/daoCollectionAnalytics?id=${item.togetherDaoId}`"
            class="a-style"
            v-if="!props.isTop"
            ><span class="title-name">
              {{ item.daoName }}
            </span>
          </router-link>
          <router-link
            :to="`/workDetails?id=${item.workId}`"
            class="a-style"
            v-else
          >
            <span class="title-name">
              {{ item.workName }}
              <span>{{ item.daoName }}</span
              >.{{ item.workNumber }}
              <span v-if="item.workLockStatus === 1">
                <!-- //TODO icon  -->
                <!-- <svg-icon icon-class="lock" /> -->
              </span>
            </span></router-link
          >
        </td>
        <td>
          <div class="flexcen">
            {{ bigNumFormat(item.ethBalance, 5, 0.000001) }}
            <TokenIcon
              size="14px"
              :payCurrencyType="item.payCurrencyType"
              :inputTokenAddress="item.inputTokenAddress"
            />
          </div>
        </td>
        <td>
          <div class="flexcen">
            {{ bigNumFormat(item.tokenBalance, 5, 0.000001) }}
            <TokenIcon
              size="14px"
              :daoToken="true"
              :daoSymbol="item.daoSymbol"
              :daoErc20Address="item.daoErc20Address"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { bigNumFormat } from '@/utils'
import TokenIcon from '@/components/TokenIcon.vue'

const props = defineProps({
  dataList: {
    type: Array,
    default: () => [],
  },
  isTop: {
    type: Boolean,
    default: false,
  },
})
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
</style>
