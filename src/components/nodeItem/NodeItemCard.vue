<template>
  <List 
    :list="props.list" 
    :isLoading="props.isLoading"
    :isAll="isAll" 
    @loadMore="handleLoadMore"
  >
    <template v-slot:work-item-title="{ dataObj }">
      <a class="a-style" @click="toDetail(dataObj)">
        <node-item-title :data-obj="dataObj" :isFavorited="props.isFavorited" />
      </a>
      <node-item-details :data-obj="dataObj" />
    </template>
  </List>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import List from '../List.vue'
import NodeItemTitle from './NodeItemTitle.vue'
import NodeItemDetails from './NodeItemDetails.vue'
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

const router = useRouter()

const toDetail = (item: any) => {
  router.push({
    path: '/nodeDetails',
    query: {
      id: item.daoId,
      type: 2,
    },
  })
}
const emits = defineEmits(['loadMore'])

const handleLoadMore = ({ done }: {
  done: (status: InfiniteScrollStatus) => void
}) => {
  if (props.isAll) return
  emits('loadMore', { done })
}
</script>
