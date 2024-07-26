<template>
  <div v-if="isLoading" class="card-loading mypage">
    <v-skeleton-loader
      elevation="12"
      height="100%"
      type="list-item,list-item,list-item,list-item"
    ></v-skeleton-loader>
  </div>
  <v-row class="mypage" v-else>
    <v-col>
      <v-item>
        <v-card
          class="d-flex align-center mybg"
          min-height="120"
          dark
          @click="goSetupdao"
        >
          <v-scroll-y-transition>
            <div class="sc-box">
              <p style="text-align: center">
                <v-icon>mdi-plus</v-icon>
              </p>
              <p>
                {{ t('daoCollectionAnalytics.leftBtnDesc') }}
              </p>
            </div>
          </v-scroll-y-transition>
        </v-card>
      </v-item>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { togetherDaoAmount } from '@/api/daos'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { t } from '@/lang'
const route = useRoute()
const router = useRouter()
const goSetupdao = () => {
  router.push({
    path: '/setupNodes',
    query: {
      id: daoAmount.value.mainDaoId,
    },
  })
}
const isLoading = ref(true)
const daoAmount = ref() as any
const getData = async () => {
  isLoading.value = true
  const query = {
    daoId: route.query.id,
  }
  const daoAmountRes = await togetherDaoAmount(query)
  daoAmount.value = daoAmountRes.data
  isLoading.value = false
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
.card-loading {
  height: 140px;
  :deep(.v-skeleton-loader__list-item) {
    margin: 0 12px;
  }
}
</style>
