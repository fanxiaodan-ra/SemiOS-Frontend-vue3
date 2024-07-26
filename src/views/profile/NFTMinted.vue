<template>
  <div class="div-box">
    <div class="pos_fix !w-[calc(100%-55px)] min-w-[1225px]">
      <h2>NFT Minted</h2>
      <v-divider class="border-purple"></v-divider>
      <div class="box-top w-[1200px]">
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
      </div>
    </div>

    <div class="work-card-box w-full">
      <work-item-box
        :list="list"
        :isAll="isAll"
        :isLoading="isLoading"
        v-if="workType === 0"
        @loadMore="continueLoadData"
      />
      <work-item-card
        :list="list"
        :isAll="isAll"
        :isLoading="isLoading"
        v-if="workType === 1"
        @loadMore="continueLoadData"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import WorkItemCard from '@/components/workItem/WorkItemCard.vue'
import WorkItemBox from '@/components/workItem/WorkItemBox.vue'
import useNftsStore from '@/store/nfts'
import { cancelAllRequests } from '@/api/request'
import { ref, watch, computed, onBeforeUnmount } from 'vue'

const nftStore = useNftsStore()

const list = computed(() => nftStore.nftMinted)
const isAll = computed(() => nftStore.nftMintedPageInfo?.isAll || false)
const pageSize = computed(() => workType.value === 0 ? 5 : 10)

const isLoading = ref(false)
const workType = ref(0)

const getData = async (loadFunc: Function = () => { }, done: Function = () => { }) => {
  isLoading.value = true
  try {
    await loadFunc(workType.value)
    done('ok')
  } catch (error) {
    done('error')
  } finally {
    isLoading.value = false
  }
}

const init = () => {
  window.scrollTo(0, 0)
  if (nftStore.nftMinted.length > pageSize.value) {
    nftStore.nftMinted = [
      ...nftStore.nftMinted.slice(0, pageSize.value),
    ]
    nftStore.nftMintedPageInfo.isAll = false
    nftStore.nftMintedPageQuery.pageNo = 1
  } else {
    nftStore.nftMintedPageQuery.pageNo = 0
    nftStore.nftMintedPageInfo = {
      isAll: false,
      count: 0,
    }
    nftStore.nftMinted = []
  }
}

const continueLoadData = async ({
  done,
}: {
  done: (val: string) => void
}) => {
  nftStore.nftMintedPageQuery.pageNo += 1
  getData(nftStore.getNftMintedLazyLoad, done)
}

onBeforeUnmount(() => {
  nftStore.nftMinted = []
  nftStore.nftMintedPageQuery.pageNo = 0
  nftStore.nftMintedPageInfo = {
    isAll: false,
    count: 0,
  }
})


watch(
  () => workType.value,
  () => {
    cancelAllRequests()
    init()
  },
  { deep: true }
)
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
.work-card-box {
  margin: 0 auto;
  padding-top: 24px;
  margin-top: 150px;
}
.t-card {
  padding: 0;
}
.box-top {
  :deep(.v-btn-group--density-default.v-btn-group) {
    height: 40px;
  }
  margin: 24px auto;
  .box-icons {
    text-align: end;
  }
}
</style>
