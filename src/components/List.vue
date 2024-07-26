<template>
  <div class="t-card flex flex-col justify-center">
    <v-infinite-scroll :items="props.list" :onLoad="handleLoadMore" class="overflow-hidden">
      <template v-slot:default>
        <v-card v-for="(item) in props.list" :key="item" class="msg-grow max-w-[1200px] min-w-[1080px] mx-auto"
          v-if="props.type !== 'waterfall'">
          <slot name="work-item-title" :data-obj="item" />
          <slot></slot>
        </v-card>
        <template v-else>
          <slot></slot>
        </template>
        <div v-if="isAll && props.list.length === 0" class="noList">
          {{ t('common.noItems') }}
        </div>
        <all-contents-loaded :isLoading="props.isLoading" :list="props.list" :isAll="isAll" />
      </template>
      <template v-slot:error>
        <div class="noList">
          {{ t('common.error') }}
        </div>
      </template>
      <template v-slot:loading>
        <loading v-if="!isAll" />
      </template>
    </v-infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import AllContentsLoaded from './AllContentsLoaded.vue'
import Loading from './Loading.vue'
import { t } from '@/lang'

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
  type: {
    type: String,
    default: 'card',
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

.msg-grow {
  padding: 0 48px;
}
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
