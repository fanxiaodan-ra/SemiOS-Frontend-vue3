<template>
  <v-btn
    class="text-none"
    variant="text"
    :size="props.size"
    @click="copyAddress(props.address)"
    v-if="!isCopy"
    :style="{
      color: props.color,
    }"
  >
    <i
      class="iconfont icon-copy"
      :style="{ 'font-size': props.fontSize + 'px' }"
    ></i>
  </v-btn>
  <v-btn
    class="text-none"
    variant="text"
    :size="props.size"
    @mouseout="handleMouseOut"
    :style="{
      color: props.color,
    }"
    v-else
  >
    <i
      class="iconfont icon-dui"
      :style="{ 'font-size': props.fontSize + 'px' }"
    >
    </i>
    <v-tooltip activator="parent" location="top" max-width="300">
      Copied!
    </v-tooltip>
  </v-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const props = defineProps({
  address: {
    type: String,
    default: '',
  },
  size: {
    type: String,
    default: '32',
  },
  color: {
    type: String,
    default: '#fff',
  },
  fontSize: {
    type: String,
    default: '16',
  },
})
const isCopy = ref(false)
import { copyToClipboard } from '@/utils'
const copyAddress = (val: string) => {
  copyToClipboard(val)
  isCopy.value = true
  // setTimeout(() => {
  //   isCopy.value = false
  // }, 3000)
}
const handleMouseOut = () => {
  setTimeout(() => {
    isCopy.value = false
  }, 500)
  // isCopy.value = false
}
</script>

<style lang="scss" scoped></style>
