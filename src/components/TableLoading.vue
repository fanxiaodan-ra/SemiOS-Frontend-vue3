<template>
  <Loading v-if="props.isLoading" />
  <div
    v-if="props.list.length === 0 && !props.isLoading"
    class="noList"
    style="height: 240px; margin: 0"
  >
    {{
      props.isSearch ? 'No items found for this search' : 'No items to display'
    }}
  </div>
  <div
    v-if="props.list.length === 0 && props.isSearch && !props.isLoading"
    class="btn-w"
  >
    <v-btn block class="btnz text-none my-mgt16" type="submit" @click="goPage()"
      >Back to all items</v-btn
    >
  </div>
  <div
    class="noList"
    v-if="props.isAll && props.list.length > 0 && !props.isLoading"
  >
    <div class="xian"></div>
    <div>All Contents Loaded</div>
    <div class="xian"></div>
  </div>
</template>

<script setup lang="ts">
import Loading from './Loading.vue'
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
  isSearch: {
    type: Boolean,
    default: false,
  },
  searchType: {
    type: Number,
    default: 0,
  },
})
import { useRouter } from 'vue-router'
const router = useRouter()
const goPage = () => {
  if (props.searchType === 0) return
  router.push({
    path: '/explore',
    query: {
      type: props.searchType,
    },
  })
}
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
.btn-w {
  width: 180px;
  margin: 0 auto;
}
</style>
