<template>
    <List 
      :list="props.list" 
      :isLoading="props.isLoading"
      :isAll="isAll" 
      @loadMore="handleLoadMore"
    >
      <template v-slot:work-item-title="{ dataObj }">
        <WorkItemTitle :data-obj="dataObj" />
        <WorkItemDetails :data-obj="dataObj" />
      </template>
    </List>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import List from '../List.vue'
import WorkItemTitle from './WorkItemTitle.vue'
import WorkItemDetails from './WorkItemDetails.vue'
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
