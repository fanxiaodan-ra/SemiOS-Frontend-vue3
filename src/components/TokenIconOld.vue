<template>
  <span>
    <!-- Token -->
    <a class="token-icon" :href="aPush()" target="_blank" v-if="props.daoToken">
      <span
        :style="{
          'font-size': props.size,
          color: props.color,
          'margin-left': props.mgl,
        }"
      >
        <v-tooltip activator="parent" location="top" max-width="300">
          {{ props.daoSymbol }}
        </v-tooltip>
        {{ truncateStringCenter(props.daoSymbol) }}
      </span>
    </a>
    <!-- ETH -->
    <a class="token-icon" :href="aPush()" target="_blank" v-else>
      <span
        :style="{
          'font-size': props.size,
          color: props.color,
          'margin-left': props.mgl,
        }"
      >
        <v-tooltip activator="parent" location="top" max-width="300">
          {{ props.payCurrencyType }}
        </v-tooltip>
        {{ truncateStringCenter(props.payCurrencyType) }}
      </span>
    </a>
  </span>
</template>

<script lang="ts" setup>
const props = defineProps({
  daoToken: {
    type: Boolean,
    default: false,
  },
  daoSymbol: {
    type: String,
    default: '',
  },
  daoErc20Address: {
    type: String,
    default: '',
  },
  payCurrencyType: {
    type: String,
    default: '',
  },
  inputTokenAddress: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#b3b5f2',
  },
  size: {
    type: String,
    default: '16px',
  },
  mgl: {
    type: String,
    default: '0px',
  },
})

import { truncateStringCenter } from '@/utils'
import { APP_OPEN_URL } from '@/config'
const aPush = () => {
  if (props.daoToken) {
    return `${APP_OPEN_URL}/address/${props.daoErc20Address}`
  } else {
    return props.inputTokenAddress
      ? `${APP_OPEN_URL}/address/${props.inputTokenAddress}`
      : `${APP_OPEN_URL}/chart/etherprice`
  }
}
</script>

<style lang="scss" scoped>
.token-icon {
  text-decoration: none;
}
</style>
