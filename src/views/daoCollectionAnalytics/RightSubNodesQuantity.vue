<template>
  <div class="tnode-card">
    <div class="node-card-box">
      <node-item-card
        :list="list"
        :isAll="isAll"
        :isLoading="loading"
        :is-favorited="true"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { togetherDaoList } from '@/api/daos'
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import { ref, onMounted } from 'vue'
const list = ref<any>([])
const isAll = ref(false)
const loading = ref(false)
import { useRoute } from 'vue-router'
const route = useRoute()
const getData = async () => {
  loading.value = true
  const query = {
    daoId: route.query.id,
  }
  const data: any = await togetherDaoList(query)
  list.value = list.value.concat(data.dataList)
  isAll.value = true
  loading.value = false
}

onMounted(() => {
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

.node-card-box {
  height: 100%;
}
</style>
