<template>
  <List 
    :list="props.list" 
    :isLoading="props.isLoading"
    :isAll="isAll" 
    @loadMore="handleLoadMore"
  >
    <template v-slot:work-item-title="{ dataObj }">
      <router-link
        :to="`/daoCollectionAnalytics?id=${dataObj.daoId}`"
        class="a-style"
      >
        <node-item-title :data-obj="dataObj" :isFavorited="props.isFavorited" />
      </router-link>
      <SeedNodeItemDetails :data-obj="dataObj" />
    </template>
  </List>
</template>

<script setup lang="ts">
import List from '../../List.vue'
import NodeItemTitle from '../NodeItemTitle.vue'
import SeedNodeItemDetails from './SeedNodeItemDetails.vue'
type InfiniteScrollStatus = 'ok' | 'empty' | 'loading' | 'error';

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
  isFavorited: {
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
const emits = defineEmits(['loadMore'])

const handleLoadMore = ({ done }: {
  done: (status: InfiniteScrollStatus) => void
}) => {
  if (props.isAll) return
  emits('loadMore', { done })
}

</script>

<style scoped lang="scss">
.t-card {
  padding: 0 48px;
  :deep(.v-card) {
    background-color: #1A1F2E !important;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 24px;
  }
  .card-title {
    display: flex;
    .t-img {
      width: 68px;
      height: 68px;
      background-color: #1A1F2E;
      margin-right: 24px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .t-name {
    flex: 1;
    h4 {
      color: #bbbaba;
      font-size: 20px;
      font-weight: 500;
      margin: 0;
      margin-bottom: 4px;
    }
    span {
      color: #9e9e9e;
      font-family: Inter;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .t-collect {
    width: 200px;
    margin-left: auto;
    text-align: end;
    i {
      font-size: 18px;
    }
    i:hover {
      font-size: 22px;
    }
    .t-num {
      margin-left: 12px;
    }
  }
}
</style>
