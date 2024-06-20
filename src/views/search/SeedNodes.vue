<template>
  <div class="tnode-card">
    <v-layout>
      <v-main>
        <div class="node-card-box">
          <node-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="loading"
            :isSearch="true"
            :searchType="4"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { searchSeedNodes } from '@/api/daos'
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  amountObj: {
    type: Object,
    default: () => {},
  },
})

const list = ref<any>([])
const isAll = ref(true)
const loading = ref(false)
import { useRoute } from 'vue-router'
const route = useRoute()
const getData = async () => {
  loading.value = true
  const data: any = await searchSeedNodes(route.query.query)
  list.value = list.value.concat(data.dataList)
  loading.value = false
}

onMounted(() => {
  if (props.amountObj.seedNodesAmount === 0) return
  getData()
})
</script>
<style lang="scss" scoped>
.tnode-card {
  flex: 1;
  height: 100%;

  :deep(.v-input__control) {
    width: 240px;
    margin-left: auto;
  }
}

:deep(.v-layout) {
  height: 100%;
}

.node-card-box {
  margin-top: 144px;
  height: 100%;
  padding-top: 6px;
}
</style>
