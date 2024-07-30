<template>
  <AnalyticsTitleLoading v-if="isLoading" />
  <div class="analy-card" v-else>
    <v-row no-gutters>
      <v-col cols="4" v-for="item in listData.slice(0, 3)" :key="item.name">
        <v-sheet class="ma-2 pa-2 my-sheet">
          <div class="an-name">{{ item.name }}</div>
          <div class="an-num">
            {{ item.value }}
            <TokenIcon
              v-if="item.icon > 0"
              size="20px"
              :payCurrencyType="item.payCurrencyType"
              :inputTokenAddress="item.inputTokenAddress"
            />
          </div>
          <div class="an-name" v-if="item.increase !== null">
            <span
              :style="{
                color:
                  item.increase > 0
                    ? '#16C784'
                    : item.increase < 0
                    ? '#DF5D5D'
                    : '',
              }"
            >
              <v-icon v-if="item.increase > 0">mdi-menu-up</v-icon>
              <v-icon v-if="item.increase < 0">mdi-menu-down</v-icon
              >{{
                Math.abs(item.increase) < 1 && Math.abs(item.increase) > 0
                  ? '< 1%'
                  : Math.abs(item.increase) + '%'
              }}
            </span>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="4" v-for="item in listData.slice(3, 6)" :key="item.name">
        <v-sheet class="ma-2 pa-2 my-sheet">
          <div class="an-name">{{ item.name }}</div>
          <div class="an-num">{{ item?.value }}</div>
          <div class="an-name">
            <span
              v-if="item.increase !== null"
              :style="{
                color:
                  item.increase > 0
                    ? '#16C784'
                    : item.increase < 0
                    ? '#DF5D5D'
                    : '',
              }"
            >
              <v-icon v-if="item.increase > 0">mdi-menu-up</v-icon>
              <v-icon v-if="item.increase < 0">mdi-menu-down</v-icon
              >{{
                Math.abs(item.increase) < 1 && Math.abs(item.increase) > 0
                  ? '< 1%'
                  : Math.abs(item.increase) + '%'
              }}
            </span>
            <div class="right-btn" v-if="item.url">
              <a class="token-icon" :href="item.url" target="_blank">
                <v-btn class="text-none" variant="text" size="small">
                  View details
                </v-btn>
              </a>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { analyticsStatistics } from '@/api/daos'
import TokenIcon from '@/components/TokenIcon.vue'
import AnalyticsTitleLoading from './AnalyticsTitleLoading.vue'
import { ref, onMounted, watch } from 'vue'
const props = defineProps({
  dayTime: {
    type: Number,
    default: 90,
  },
})
watch(
  () => props.dayTime,
  () => {
    isLoading.value = true
    getData()
  }
)
import { useRoute } from 'vue-router'
const route = useRoute()
const listData = ref([]) as any
const isLoading = ref(true)
const getData = async () => {
  isLoading.value = true
  const query = { daoId: route.query.id, dayTime: props.dayTime }
  const res = (await analyticsStatistics(query)) as any
  listData.value = res.dataList
  isLoading.value = false
}
onMounted(() => {
  getData()
})
</script>
<style lang="scss" scoped>
.analy-card {
  flex: 1;
  height: 100%;
  :deep(.v-sheet) {
    background-color: #1A1F2E !important;
  }
}
.node-card {
  width: 100%;
  margin: 0;
}
.an-name {
  font-size: 14px;
  color: #9e9e9e;
  display: flex;
  align-items: center;
}
.an-num {
  font-size: 20px;
  color: #bbbaba;
  font-weight: 500;
  line-height: 28px;
  display: flex;
  align-items: center;
  line-height: 32px;
  :deep(.token-icon) {
    display: flex;
  }
}
.my-sheet {
  height: 100px;
}
.right-btn {
  margin-left: auto;
  .text-none {
    color: #b3b5f2;
  }
}
</style>
