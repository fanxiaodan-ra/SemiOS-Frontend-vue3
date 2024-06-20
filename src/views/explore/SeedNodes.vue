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
          <SeedNodeItemCard
            :list="list"
            :isAll="isAll"
            :isLoading="loading"
            :isFavorited="false"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { seedNodesCollections } from '@/api/daos'
import SeedNodeItemCard from '@/components/nodeItem/seedNode/Index.vue'
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
const getData = async () => {
  loading.value = true
  const query = {
    sortCondition: qvalue.value,
    minPrice: '',
    maxPrice: '',
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }
  const data: any = await seedNodesCollections(query)
  // const data = {
  //   resultCode: 100,
  //   resultDesc: 'success',
  //   dataList: [
  //     {
  //       allocationEthToOtherDao: [],
  //       allocationTokenToOtherDao: [],
  //       basicInformationVo: {
  //         mintCap: 0,
  //         mintWindowCap: 0,
  //         mintWindowDuration: 1,
  //         remainingMintWindow: 50,
  //         subDaoAssetPoolDaoToken: '4000000',
  //         subDaoAssetPoolEth: '0',
  //         totalMintCap: 10000,
  //         totalMintWindowCap: 10000,
  //       },
  //       daoDescription: '',
  //       daoId: 88,
  //       daoLogoUrl: 'https://image-test.protodao.io/dao/dao_default_logo.png',
  //       daoManitesto: '',
  //       daoName: 'zmain DistopEpassDisunifiDislt20240319161712',
  //       daoNumber: 172,
  //       erc20Name: 'zmain DistopEpassDisunifiDislt20240319161712',
  //       favoriteAmount: 0,
  //       favorited: false,
  //       mintWindowInfoVo: {
  //         blockRewardEth: '0',
  //         blockRewardToken: '80000',
  //         internalRewardEth: '0',
  //         internalRewardToken: '80000',
  //         mintFee: '0',
  //         mintedWorks: 0,
  //         minters: 0,
  //       },
  //       modeStatusVo: {
  //         daoToken: false,
  //         erc20PaymentMode: false,
  //         infiniteMode: false,
  //         lotteryDuration: 0,
  //         lotteryMode: false,
  //         speicialStrategy: false,
  //         topupMode: false,
  //         unifiedPrice: null,
  //         unifiedPriceMode: false,
  //       },
  //       projectId:
  //         '0x91bddaff9fe17b873060ef392abf6d9813dfa7676e749fc780a2c3207c5da0ab',
  //       receivedEthFromOther: [],
  //       receivedTokenFromOther: [],
  //     },
  //   ],
  //   page: {
  //     count: 1,
  //     size: 10,
  //   },
  // }
  // const objDataList = data.dataList.map((item: any) => {
  //   return {
  //     ...item,
  //     activeName: 'currentMintWindowInformation',
  //   }
  // })
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
  margin-top: 24px;
  display: flex;
  position: fixed;
  width: 100%;
  margin-top: 49px;
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
  margin-top: 144px;
  height: 100%;
}

.box-top-right {
  width: 100%;
  justify-content: flex-end;
}
</style>
