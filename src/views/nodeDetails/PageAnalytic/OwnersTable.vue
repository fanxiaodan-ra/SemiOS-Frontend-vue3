<template>
  <v-table height="809" fixed-header>
    <thead>
      <tr>
        <th class="table-title"></th>
        <th class="table-title">Name</th>
        <th class="table-title">Wallet</th>
        <th class="table-title">Owned</th>
        <th class="table-title">%Owned</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in (props.list as any)" :key="item.name">
        <td>
          {{ item.code }}
        </td>
        <td>
          <a class="token-icon" :href="aPush(item)" target="_blank">
            <div style="width: 200px">
              <v-avatar :image="item.headImg" size="36"></v-avatar>
              <v-btn class="text-none" variant="text">
                <v-tooltip activator="parent" location="top" max-width="300">
                  {{ item.name }}
                </v-tooltip>
                {{ truncateString(item.name, 12) }}
              </v-btn>
            </div>
          </a>
        </td>
        <td>
          <div class="flexcen">
            {{ ellipsis(item.address) }}
          </div>
        </td>
        <td>
          <div class="flexcen">
            {{ item.amount }}
          </div>
        </td>
        <td>
          <div class="flexcen">{{ item.ratio }}%</div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import { ellipsis, truncateString } from '@/utils'
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
})

import { APP_OPEN_URL } from '@/config'
const aPush = (item: any) => {
  return `${APP_OPEN_URL}/address/${item.address}`
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
.flexcen {
  color: #9e9e9e;
}
</style>
