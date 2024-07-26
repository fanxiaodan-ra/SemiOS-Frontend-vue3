<template>
  <div class="noList" v-if="props.isAll && props.list.length > 0">
    <div class="xian"></div>
    <div>All Contents Loaded</div>
    <div class="xian"></div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  list: <any>{
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isAll: {
    type: Boolean,
    default: false,
  },
})
</script>
<style scoped lang="scss">
.noList {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbbaba;
  font-size: 18px;
  margin: 42px 0;

  .xian {
    height: 1px;
    width: 45px;
    background-color: #d9d9d9;
    margin: 0 15px;
  }
}
</style>
