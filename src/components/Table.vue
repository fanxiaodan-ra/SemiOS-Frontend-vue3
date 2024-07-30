<template>
  <v-data-table-server
    :class="`min-h-[400px] text-grey-1 bg-card-2 text-xs ${props.className}`"
    v-model:items-per-page="props.pageInfo.itemsPerPage"
    :headers="props.headers"
    :items="props.serverItems"
    :items-length="props.pageInfo.totalItems"
    :loading="props.loading"
    item-value="name"
    @update:options="props.loadItems">
    <template
      v-for="(_, slotKey, slotIndex) in ($slots as {})"
      :key="slotIndex"
      #[slotKey]="slotData"
    >
      <slot :name="slotKey" v-bind="slotData" />
    </template>
    <template v-slot:['no-data']>
      <div class="mt-[8%]">
        <ChartNoData :title="props.emptyText" text="Check again later." />
      </div>
    </template>
    <template v-slot:loading>
      <div class="my-2 pb-8">
        <div v-for="(_) in new Array(props.skeletonNum).fill('')">
          <v-skeleton-loader height="100%" type="text,divider" ></v-skeleton-loader>
        </div>
      </div>
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2" v-show="pageInfo.totalItems > 0">
        <v-pagination
          v-model="pageInfo.curPage"
          :length="Math.ceil(pageInfo.totalItems / pageInfo.itemsPerPage)"
          active-color="#8C91FF"
          size="small"
          @update:model-value="pageChange"
        ></v-pagination>
      </div>
    </template>
  </v-data-table-server>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import ChartNoData from './ChartNoData.vue';

const props = defineProps({
  headers: {
    type: Array as () => any,
    required: true,
    default: () => []
  },
  serverItems: {
    type: Array,
    required: true,
    default: () => []
  },
  loadItems: {
    type: Function,
    required: true
  },
  loading: {
    type: Boolean,
    required: true,
    default: false
  },
  pageInfo: {
    type: Object,
    required: true,
    default: () => ({
      itemsPerPage: 10,
      totalItems: 0,
      curPage: 1,
    })
  },
  className: {
    type: String,
    required: false,
    default: ''
  },
  emptyText: {
    type: String,
    required: false,
    default: 'No events have occurred yet'
  },
  skeletonNum: {
    type: Number,
    required: false,
    default: 5
  }
})


const pageChange = (val: number) => {
  props.loadItems({ page: val, itemsPerPage: props.pageInfo.itemsPerPage })
}

</script>
<style scoped>
.v-data-table::v-deep th {
  @apply text-grey-1 text-xs !font-bold;
}

.v-data-table::v-deep v-data-table-rows-loading td {
  padding: 0 !important;
}
</style>