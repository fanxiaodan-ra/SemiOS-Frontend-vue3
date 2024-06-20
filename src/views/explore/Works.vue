<template>
  <div class="tnode-card">
    <v-layout>
      <card-left-filter ref="RefChild" @getConditions="getConditions" />
      <v-main>
        <div class="box-top">
          <div class="top-icon">
            <v-btn @click="callChildMethod" size="40">
              <i class="iconfont icon-tianjia ft24" />
            </v-btn>
          </div>
          <div class="box-icons">
            <v-btn-toggle v-model="workType" divided mandatory>
              <v-btn size="40">
                <i
                  class="iconfont icon-qiehuanliebiao2 ft18"
                  :class="{ fcb: workType === 0 }"
                />
              </v-btn>
              <v-btn size="40">
                <i
                  class="iconfont icon-qiehuanliebiao1 ft18"
                  :class="{ fcb: workType === 1 }"
                />
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-select
            v-model="query.sortCondition"
            label="Select"
            density="compact"
            variant="solo"
            :items="options"
            item-title="label"
            item-value="value"
            @update:modelValue="getConditions(query)"
          ></v-select>
        </div>
        <div class="work-card-box">
          <work-item-box
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            v-if="workType === 0"
          />
          <work-item-card
            :list="list"
            :isAll="isAll"
            :isLoading="isLoading"
            v-if="workType === 1"
          />
        </div>
      </v-main>
    </v-layout>
  </div>
</template>
<script setup lang="ts">
import { workExploreUnmitedWorks } from '@/api/works'
import { cancelAllRequests } from '@/api/request'
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import CardLeftFilter from '@/components/CardLeftFilter.vue'
import { ref, onMounted, onBeforeUnmount, reactive, watch } from 'vue'
const options = [
  {
    value: 0,
    label: 'Recently Listed',
  },
  {
    value: 1,
    label: 'Most Favorited',
  },
  {
    value: 2,
    label: 'Price: High to Low',
  },
  {
    value: 3,
    label: 'Price: Low to High',
  },
]
const qvalue = ref(0)
const query = reactive({
  sortCondition: 0,
  fixedPrice: 2,
  minPrice: 0,
  maxPrice: 999999999,
})
const pageSize = ref(10)
const pageNo = ref(1)
const count = ref(0)
const list = ref<any>([])
const isAll = ref(false)
const isLoading = ref(false)
const getData = async () => {
  isLoading.value = true
  const queryObj = {
    sortCondition: query.sortCondition,
    fixedPrice: query.fixedPrice,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    pageSize: pageSize.value,
    pageNo: pageNo.value,
  }
  const data: any = await workExploreUnmitedWorks(queryObj)
  list.value = list.value.concat(data.dataList)
  // list.value = [
  //   {
  //     workId: 28,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/11/1.png',
  //     workDescription: '',
  //     daoNumber: 11,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.1',
  //     favoriteAmount: 0,
  //     bgColor: '#18181A',
  //     height: 366.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'Hayeker Tech Community',
  //     creatorAddress: '0x699859125827b6082398cff2bc63a8d299e503cd',
  //     workStatus: 0,
  //     unifiedPriceSet: true,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '25510.204',
  //     blockRewardEth: '0',
  //     internalRewardToken: '25510.204',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '24999.99992',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: 1000,
  //     havePassesQuantity: 0,
  //     priceType: 2,
  //   },
  //   {
  //     workId: 27,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/10/1.png',
  //     workDescription: '',
  //     daoNumber: 10,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.1',
  //     favoriteAmount: 0,
  //     bgColor: '#0A0A20',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'Hayeker Econ Community',
  //     creatorAddress: '0x699859125827b6082398cff2bc63a8d299e503cd',
  //     workStatus: 0,
  //     unifiedPriceSet: true,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '25510.204',
  //     blockRewardEth: '0',
  //     internalRewardToken: '25510.204',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '24999.99992',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: 1000,
  //     havePassesQuantity: 0,
  //     priceType: 2,
  //   },
  //   {
  //     workId: 26,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/9/1.png',
  //     workDescription: '',
  //     daoNumber: 9,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.1',
  //     favoriteAmount: 0,
  //     bgColor: '#27222F',
  //     height: 309.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'Hayeker Art Community',
  //     creatorAddress: '0x699859125827b6082398cff2bc63a8d299e503cd',
  //     workStatus: 0,
  //     unifiedPriceSet: true,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '25510.204',
  //     blockRewardEth: '0',
  //     internalRewardToken: '25510.204',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '24999.99992',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: 5000,
  //     havePassesQuantity: 0,
  //     priceType: 2,
  //   },
  //   {
  //     workId: 25,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/7/2.png',
  //     workDescription: '',
  //     daoNumber: 7,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.01',
  //     favoriteAmount: 0,
  //     bgColor: '#532FE7',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'erfg',
  //     creatorAddress: '0x96c832194dbe877d10766b384310e2622b10c6a9',
  //     workStatus: 0,
  //     unifiedPriceSet: true,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '0',
  //     blockRewardEth: '0.0001',
  //     internalRewardToken: '0',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '0',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: 1000,
  //     havePassesQuantity: 1,
  //     priceType: 2,
  //   },
  //   {
  //     workId: 24,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/W17121362169217487.png',
  //     workDescription: '',
  //     daoNumber: 8,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.01',
  //     favoriteAmount: 0,
  //     bgColor: '#532FE7',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'ergtereer',
  //     creatorAddress: '0x96c832194dbe877d10766b384310e2622b10c6a9',
  //     workStatus: 0,
  //     unifiedPriceSet: false,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '0',
  //     blockRewardEth: '0',
  //     internalRewardToken: '0',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '0',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: 100,
  //     havePassesQuantity: 0,
  //     priceType: 1,
  //   },
  //   {
  //     workId: 23,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/4/5.png',
  //     workDescription: '',
  //     daoNumber: 4,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.01',
  //     favoriteAmount: 1,
  //     bgColor: '#532FE7',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'ymsubin3 EtopEpassUni001',
  //     creatorAddress: '0xf8baf7268f3daefe4135f7711473ae8b6c3b47d8',
  //     workStatus: 0,
  //     unifiedPriceSet: true,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '5000000',
  //     blockRewardEth: '0',
  //     internalRewardToken: '5000000',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '5000000',
  //     mintersMaxRewardEth: '0',
  //     topupMode: true,
  //     passesTotalQuantity: 20,
  //     havePassesQuantity: 4,
  //     priceType: 2,
  //   },
  //   {
  //     workId: 21,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/1/8.png',
  //     workDescription: '',
  //     daoNumber: 1,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.0001',
  //     favoriteAmount: 0,
  //     bgColor: '#532FE7',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'ym030601 DistopDispay',
  //     creatorAddress: '0xf8baf7268f3daefe4135f7711473ae8b6c3b47d8',
  //     workStatus: 0,
  //     unifiedPriceSet: false,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '1060526.3158',
  //     blockRewardEth: '0.0001',
  //     internalRewardToken: '1060526.3158',
  //     internalRewardEth: '0.0001',
  //     mintersMaxRewardToken: '265131.57895',
  //     mintersMaxRewardEth: '0.000025',
  //     topupMode: false,
  //     passesTotalQuantity: 1000,
  //     havePassesQuantity: 7,
  //     priceType: 1,
  //   },
  //   {
  //     workId: 20,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/5/1.png',
  //     workDescription: '',
  //     daoNumber: 5,
  //     canvasNumber: 1,
  //     workNumber: null,
  //     price: '0.01',
  //     favoriteAmount: 0,
  //     bgColor: '#532FE7',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 1,
  //     daoName: 'efrerfertrg',
  //     creatorAddress: '0x96c832194dbe877d10766b384310e2622b10c6a9',
  //     workStatus: 0,
  //     unifiedPriceSet: true,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '0',
  //     blockRewardEth: '0',
  //     internalRewardToken: '0',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '0',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: 1000,
  //     havePassesQuantity: 0,
  //     priceType: 2,
  //   },
  //   {
  //     workId: 15,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/work/W17096962606888215.png',
  //     workDescription: 'fix222',
  //     daoNumber: 2,
  //     canvasNumber: null,
  //     workNumber: null,
  //     price: '0.0009',
  //     favoriteAmount: 0,
  //     bgColor: '#F3BDBB',
  //     height: 260.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 2,
  //     daoName: 'ymsubin3 EpayEpassDisuni',
  //     creatorAddress: '0xf8baf7268f3daefe4135f7711473ae8b6c3b47d8',
  //     workStatus: 0,
  //     unifiedPriceSet: false,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '4052631.579',
  //     blockRewardEth: '0.0001',
  //     internalRewardToken: '2026315.7895',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '506578.947375',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: null,
  //     havePassesQuantity: null,
  //     priceType: 1,
  //   },
  //   {
  //     workId: 14,
  //     imgUrl:
  //       'https://test-protodao.s3.ap-southeast-1.amazonaws.com/dao/2_0.png',
  //     workDescription: 'fix11',
  //     daoNumber: 2,
  //     canvasNumber: null,
  //     workNumber: null,
  //     price: '0.0008',
  //     favoriteAmount: 0,
  //     bgColor: '#532FE7',
  //     height: 298.0,
  //     favorited: false,
  //     fixedPrice: true,
  //     royaltyTokenPrice: null,
  //     generate: 2,
  //     daoName: 'ymsubin3 EpayEpassDisuni',
  //     creatorAddress: '0xf8baf7268f3daefe4135f7711473ae8b6c3b47d8',
  //     workStatus: 0,
  //     unifiedPriceSet: false,
  //     erc20PaymentMode: false,
  //     minters: 0,
  //     mintFee: '0',
  //     mintedWorks: 0,
  //     blockRewardToken: '4052631.579',
  //     blockRewardEth: '0.0001',
  //     internalRewardToken: '2026315.7895',
  //     internalRewardEth: '0',
  //     mintersMaxRewardToken: '506578.947375',
  //     mintersMaxRewardEth: '0',
  //     topupMode: false,
  //     passesTotalQuantity: null,
  //     havePassesQuantity: null,
  //     priceType: 1,
  //   },
  // ]
  count.value = data.page.count
  isAll.value = pageNo.value * pageSize.value >= count.value
  isLoading.value = false
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
    isLoading.value = true
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
      if (isLoading.value) return
      pageNo.value += 1
      isLoading.value = true
      getData()
    }
  }
}

const getConditions = (val: any) => {
  cancelAllRequests()
  qvalue.value = 3
  query.maxPrice = val.maxPrice
  query.minPrice = val.minPrice
  query.fixedPrice = val.fixedPrice
  pageNo.value = 1
  list.value = []
  isAll.value = false
  getData()
}

const RefChild = ref()
const callChildMethod = () => {
  if (RefChild.value) {
    RefChild.value.setDrawer()
  }
}

const workType = ref(0)
watch(
  () => workType,
  () => {
    cancelAllRequests()
    list.value = []
    pageNo.value = 1
    isAll.value = false
    getData()
  },
  { deep: true }
)
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
  // padding: 0 48px;
  z-index: 4;
  background: #1b2233;
  padding: 0 48px;

  .top-icon {
    height: 40px;
    line-height: 40px;

    :deep(.v-btn.v-btn--density-default) {
      height: 40px;
    }

    i {
      cursor: pointer;
    }
  }

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

.icon-body {
  width: 34px;
  height: 34px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b5f2;
  // background-color: #1b2233;
}

.box-icons {
  flex: 1;
  height: 40px;
  display: flex;
  align-items: center;

  :deep(.v-btn-group--density-default.v-btn-group) {
    height: 40px;
    margin-left: auto;
    margin-right: 16px;
  }
}

.cen-icons {
  height: 40px;
  display: flex;
  margin-left: auto;
  background-color: #282f41;
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-right: 16px;
  padding: 0 16px;
}

.icon-item {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-card-box {
  margin-top: 144px;
  padding-top: 6px;
}
</style>
