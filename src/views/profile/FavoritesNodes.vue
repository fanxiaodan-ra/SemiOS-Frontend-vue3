<template>
  <div class="div-box">
    <div class="pos_fix">
      <h2>Favorite Nodes</h2>
      <v-divider class="my-divider"></v-divider>
    </div>
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
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import { favoriteDao } from '@/api/daos'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const pageSize = ref(10)
const pageNo = ref(1)
const count = ref(0)
const list = ref<any>([])
const isAll = ref(false)
const loading = ref(false)
const getData = async () => {
  loading.value = true
  const query = {
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }
  const data: any = await favoriteDao(query)
  list.value = list.value.concat(data.dataList)
  count.value = data.page.count
  isAll.value = pageNo.value * pageSize.value >= count.value
  loading.value = false
  ifScrollHeight()
}

const ifScrollHeight = () => {
  if (
    window.scrollY > 0 &&
    document.body.scrollHeight <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    !isAll.value
  ) {
    pageNo.value += 1
    loading.value = true
    getData()
  }
}
const lazyLoading = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop
  const clientHeight = document.documentElement.clientHeight
  const scrollHeight = document.documentElement.scrollHeight
  if (pageNo.value * pageSize.value < count.value) {
    if (scrollHeight - clientHeight <= scrollTop + 560) {
      if (loading.value) return
      pageNo.value += 1
      loading.value = true
      getData()
    }
  }
}
onMounted(() => {
  window.addEventListener('scroll', lazyLoading, true)
  getData()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', lazyLoading, true)
})
</script>

<style lang="scss" scoped>
.div-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
h2 {
  color: #f3f3f3;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  height: 84px;
  line-height: 84px;
  text-align: center;
}
.node-card-box {
  max-width: 80%;
  margin: 0 auto;
  margin-top: 86px;
  padding-top: 24px;
}
</style>
