<template>
  <div class="tnode-card">
    <v-layout>
      <v-main>
        <div class="box-top">
          <div class="box-top-right">
            <v-select
              v-model="qvalue"
              label="Select"
              density="compact"
              variant="solo"
              :items="options"
              item-title="label"
              item-value="value"
            ></v-select>
          </div>
        </div>
        <div class="node-card-box">
          <div class="top-btn" v-show="!loading">
            <v-btn
              block
              class="text-none xbtn"
              size="x-large"
              type="submit"
              @click="goSetup"
            >
              <div class="icon-md"><v-icon>mdi-plus</v-icon></div>
              <div>
                Click here to Launch Sub Nodes for this series of Nodes, Only
                Seed Nodes Starter can set ERC- 20 Tokens Allocation.
              </div>
            </v-btn>
          </div>
          <node-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="loading"
            :is-favorited="true"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { protodaoRelated } from '@/api/daos'
import NodeItemCard from '@/components/nodeItem/NodeItemCard.vue'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'

const options = [
  {
    value: 0,
    label: 'Recently Listed',
  },
  {
    value: 1,
    label: 'Most Favorited',
  },
]
const qvalue = ref(0)

watch(
  () => qvalue.value,
  (cur) => {
    if (cur) {
      list.value = []
      pageNo.value = 1
      loading.value = true
      isAll.value = false
      getData()
    }
  }
)
const pageSize = ref(10)
const pageNo = ref(1)
const count = ref(0)
const list = ref<any>([])
const isAll = ref(false)
const loading = ref(false)
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const goSetup = () => {
  router.push({
    path: '/setupNodes',
    query: {
      id: route.query.id,
    },
  })
}
const getData = async () => {
  loading.value = true
  const query = {
    daoId: route.query.id,
    sortCondition: qvalue.value,
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }
  const data: any = await protodaoRelated(query)
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
.tnode-card {
  flex: 1;
  height: 100%;

  :deep(.v-input__control) {
    width: 240px;
    margin-left: auto;
  }
}

.box-top {
  height: 96px;
  display: flex;
  align-items: center;
  margin-left: auto;
  display: flex;
  width: 100%;
  z-index: 4;
  background: #1b2233;
  padding: 0 48px;

  :deep(.v-input) {
    flex: none;
  }

  :deep(.v-input__details) {
    display: none;
  }
}

:deep(.v-layout) {
  height: 100%;
}

.nav-box {
  background-color: #1b2233;

  h4 {
    padding: 0 16px;
    color: #bbbaba;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 22px;
  }
}

.nav-top {
  height: 86px;

  i {
    cursor: pointer;
  }
}

.node-card-box {
  height: 100%;
}

.box-top-right {
  width: 100%;
  justify-content: flex-end;
}
.top-btn {
  padding: 0 48px;
}
.xbtn {
  height: 90px;
  background-color: #252b3a !important;
  margin-bottom: 24px;
  :deep(.v-btn__content) {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: #9e9e9e;
  }
}
.icon-md {
  font-size: 28px;
  color: #b3b5f2;
}
</style>
