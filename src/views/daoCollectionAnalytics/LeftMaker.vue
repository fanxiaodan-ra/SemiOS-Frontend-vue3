<template>
  <div v-if="isLoading" class="card-loading mypage">
    <v-skeleton-loader elevation="12" height="100%" type="list-item,list-item,list-item"></v-skeleton-loader>
  </div>
  <v-row class="mypage" v-else>
    <v-col>
      <v-item v-slot="{ toggle }">
        <v-card :color="props.tab === 3 ? 'primary' : ''" class="d-flex align-center mybg" :style="{
            'background-color': props.tab === 3 ? '#364159 !important' : '',
            'border-color': props.tab === 3 ? '#2F305B  !important' : '',
          }" dark @click="toggle">
          <v-scroll-y-transition>
            <div class="sc-box">
              <p class="!text-base">
                {{ t('daoCollectionAnalytics.maker') }} :
                <span>{{
                  bigNumFormat(daoMaker.makerTotalAmount, 5, 0.000001)
                  }}</span>
              </p>
              <p>
                {{ t('daoCollectionAnalytics.totalUnspentETH') }} :
                <span>{{
                  bigNumFormat(daoMaker.noSpendEthAmount, 5, 0.000001)
                  }}</span>
              </p>
              <p>
                {{ t('daoCollectionAnalytics.totalLockedERC20') }} :
                <span>{{
                  bigNumFormat(daoMaker.noSpendTokenAmount, 5, 0.000001)
                  }}</span>
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
import { togetherDaoMaker } from '@/api/daos'
import { ref, onMounted } from 'vue'
import { t } from '@/lang'
const props = defineProps({
  tab: {
    type: Number,
    default: 0,
  },
})
import { useRoute } from 'vue-router'
const route = useRoute()
const isLoading = ref(true)
const daoMaker = ref() as any
const getData = async () => {
  isLoading.value = true
  const query = {
    daoId: route.query.id,
  }
  const daoMakerRes = await togetherDaoMaker(query)
  daoMaker.value = daoMakerRes.data
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
.card-loading {
  height: 89px;
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
