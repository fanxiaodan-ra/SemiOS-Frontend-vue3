<template>
  <div v-if="isLoading" class="card-loading mypage">
    <v-skeleton-loader elevation="12" height="100%" type="list-item,list-item,list-item,list-item"></v-skeleton-loader>
  </div>

  <v-row class="mypage" v-else>
    <v-col>
      <v-item v-slot="{ toggle }">
        <v-card :color="props.tab === 5 ? 'primary' : ''" class="d-flex align-center mybg" :style="{
            'background-color': props.tab === 5 ? '#364159 !important' : '',
            'border-color': props.tab === 5 ? '#2F305B  !important' : '',
          }" dark @click="toggle">
          <v-scroll-y-transition>
            <div class="sc-box">
              <p class="!text-base">
                {{ t('daoCollectionAnalytics.incentivePlan') }} :
                <span>{{ planTotal }}</span>
              </p>
              <p>
                {{ t('daoCollectionAnalytics.inProgress') }} :
                <span>{{ planOngoing }}</span>
              </p>
              <p>
                {{ t('daoCollectionAnalytics.closed') }} :
                <span>{{ planEnd }}</span>
              </p>
              <p>
                {{ t('daoCollectionAnalytics.upComing') }} :
                <span>{{ planNotStarted }}</span>
              </p>
            </div>
          </v-scroll-y-transition>
        </v-card>
      </v-item>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { bigNumFormat } from '@/utils'
import { ref, onMounted, computed } from 'vue'
import useDaoColAnsStore from '@/store/daoColAns'

const props = defineProps({
  tab: {
    type: Number,
    default: 0,
  },
})
import { useRoute } from 'vue-router'
import { t } from '@/lang';
const route = useRoute()
const isLoading = ref(true)
const store = useDaoColAnsStore()

const daoPlan = computed(() => store.togetherPlan)

const planTotal = computed(() => {
  return bigNumFormat(daoPlan.value.planTotal, 5, 0.000001)
})
const planOngoing = computed(() => {
  return bigNumFormat(daoPlan.value.planOngoing, 5, 0.000001)
})

const planEnd = computed(() => {
  return bigNumFormat(daoPlan.value.planEnd, 5, 0.000001)
})

const planNotStarted = computed(() => {
  return bigNumFormat(daoPlan.value.planNotStarted, 5, 0.000001)
})
const getData = async () => {
  isLoading.value = true
  const query = {
    daoId: route.query.id as string,
  }
  try {
    await store.getTogetherPlan(query)
  } finally {
    isLoading.value = false
  }
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.mybg {
  background: #282f41 !important;
  border: 1px solid #282f41;
  box-sizing: border-box;
}
.mypage {
  margin-bottom: 24px;
}
.card-loading {
  height: 110px;
  :deep(.v-skeleton-loader__list-item) {
    margin: 0 12px;
  }
}

.sc-box {
  padding: 12px;
  box-sizing: border-box;
  h3 {
    color: #9e9e9e;
    font-size: 16px;
  }
  p {
    font-size: 14px;
    color: #9e9e9e;
    span {
      color: #fff;
    }
  }
  i {
    font-size: 32px;
  }
}
</style>
