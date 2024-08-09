<template>
  <v-card class="title-card">
    <div class="card-left">
      <viewer :images="[props.dataObj.imageUrl]" class="img-container">
        <img :src="props.dataObj.imageUrl" />
      </viewer>
    </div>
    <div class="card-right">
      <v-row no-gutters class="row-name">
        <v-col cols="10">
          <span class="item-text" v-if="props.dataObj.workStatus === 1">
            <router-link
              :to="`/nodeDetails?id=${props.dataObj.daoId}`"
              class="fc8"
              >{{ props.dataObj.daoName }}</router-link
            ><span style="color: #9e9e9e">.{{ props.dataObj.workNumber }}</span>
          </span>
          <span v-else>
            <span class="item-text" v-if="props.dataObj.generate === 1">
              <router-link
                :to="`/nodeDetails?id=${props.dataObj.daoId}`"
                class="fc8"
                >{{ props.dataObj.daoName }}</router-link
              ><span style="color: #fff">#</span
              ><a
                class="a-style"
                :href="openUrl(props.dataObj.creatorAddress)"
                target="_blank"
                ><span style="color: #b3b5f2">Pass</span></a
              ><span style="color: #9e9e9e">/Unminted</span>
            </span>
            <span class="item-text" v-else>
              <router-link
                :to="`/nodeDetails?id=${props.dataObj.daoId}`"
                class="fc8"
                >{{ props.dataObj.daoName }}</router-link
              ><span style="color: #fff">#</span>
              <a
                class="a-style"
                :href="openUrl(props.dataObj.creatorAddress)"
                target="_blank"
                ><span style="color: #b3b5f2">{{
                  splitAddress(props.dataObj.creatorAddress)
                }}</span></a
              ><span style="color: #9e9e9e">/Unminted</span>
            </span>
          </span>
        </v-col>
        <v-col cols="2" class="favo-box-col">
          <div class="favo-box">
            <v-btn
              size="32"
              class="text-none"
              variant="text"
              v-if="props.dataObj.ownerAddress === store.UserInfo.address"
              @click="goEditWork"
            >
              <i class="iconfont icon-font icon-bianji fc7"></i>
            </v-btn>
            <v-btn
              size="32"
              class="text-none"
              variant="text"
              v-if="
                props.dataObj.workStatus === 1 &&
                props.dataObj.ownerAddress === store.UserInfo.address
              "
              @click="setIsLock"
            >
              <v-tooltip :text="t('nftDetail.lockedTip')" :disabled="dataObj.workLockStatus === 0">
                <template v-slot:activator="{ props }">
                  <i
                    :class="
                      dataObj.workLockStatus === 0
                        ? 'icon-lock'
                        : 'icon-lock1'
                    "
                    class="iconfont fc7"
                    v-bind="props"
                  ></i>
                </template>
              </v-tooltip>
            </v-btn>
            <v-btn
              size="32"
              class="text-none"
              variant="text"
              @click.stop.prevent="setFavoriteData"
            >
              <i
                class="iconfont"
                :class="
                  props.dataObj.favorited ? 'icon-icon3' : 'icon-shoucang'
                "
                :style="{ color: props.dataObj.favorited ? '#ffa2a2' : '' }"
                style="font-size: 20px"
              ></i>
            </v-btn>
            <span class="t-num"> {{ props.dataObj.favoritesAmount }}</span>
          </div>
        </v-col>
      </v-row>
      <div class="det-box">
        <v-row no-gutters class="row-det">
          <v-col cols="6" class="flex-fd">
            <div class="box-left">
              <p class="l-price">{{ priceType[props.dataObj.priceType] }}</p>
              <p style="display: flex">
                <span
                  class="newPrice"
                  v-if="
                    props.dataObj.royaltyTokenPrice !== null &&
                    props.dataObj.royaltyTokenPrice !== ''
                  "
                  >{{ props.dataObj.royaltyTokenPrice }}
                </span>
                <span class="newPrice" v-else>{{ props.dataObj.price }} </span>
                <TokenIcon
                  size="32px"
                  btnsize="x-large"
                  :daoToken="props.dataObj.erc20PaymentMode"
                  :daoSymbol="props.dataObj.daoSymbol"
                  :daoErc20Address="props.dataObj.daoErc20Address"
                  :payCurrencyType="props.dataObj.payCurrencyType"
                  :inputTokenAddress="props.dataObj.inputTokenAddress"
                />
                <span
                  class="oldPrice"
                  v-if="
                    props.dataObj.royaltyTokenPrice !== null &&
                    props.dataObj.royaltyTokenPrice !== ''
                  "
                >
                  {{ props.dataObj.price }}
                </span>
                <TokenIcon
                  v-if="
                    props.dataObj.royaltyTokenPrice !== null &&
                    props.dataObj.royaltyTokenPrice !== ''
                  "
                  size="16px"
                  :daoToken="props.dataObj.erc20PaymentMode"
                  :daoSymbol="props.dataObj.daoSymbol"
                  :daoErc20Address="props.dataObj.daoErc20Address"
                  :payCurrencyType="props.dataObj.payCurrencyType"
                  :inputTokenAddress="props.dataObj.inputTokenAddress"
                />
              </p>
            </div>
            <div
              class="box-left box-passes"
              v-if="props.dataObj.unifiedPriceModeOff"
            >
              <p class="l-price">Minted Passes/Total Mintable Passes</p>
              <p class="newPriceTwo">
                {{ props.dataObj.havePassesQuantity }}/{{
                  props.dataObj.passesTotalQuantity
                }}
              </p>
            </div>
          </v-col>
          <v-col cols="6" class="right-box">
            <div class="icons">
              <IconsTab :dataObj="props.dataObj" :isName="false" />
            </div>
            <div class="det-btns">
              <v-btn
                block
                class="btnz text-none my-mgrl8"
                v-if="props.dataObj.workStatus === 0"
                @click="checkLogin"
                :disabled="props.countdownData.isCountdown"
              >
                {{
                  props.dataObj.inputTokenAddress === '' &&
                  !props.dataObj.erc20PaymentMode
                    ? 'Mint NFT'
                    : 'Approve & Mint'
                }}
              </v-btn>
              <v-btn
                block
                class="btnb fc7 text-none my-mgrl8"
                type="submit"
                v-if="props.dataObj.workStatus === 0"
                @click="setMintAndTransferNFTDialog"
                :disabled="props.countdownData.isCountdown"
                >Mint & Transfer</v-btn
              >

              <v-btn
                block
                class="btnz text-none my-mgrl8"
                type="submit"
                v-if="props.dataObj.workStatus === 1"
                @click="openNftUrl(props.dataObj.tradeNft)"
                >Trade NFT</v-btn
              >
              <v-btn
                block
                class="btnb fc7 text-none my-mgrl8"
                type="submit"
                v-if="
                  props.dataObj.workStatus === 1 &&
                  props.dataObj.ownerAddress === store.UserInfo.address
                "
                @click="isTransferNFTDialog = true"
                >Transfer NFT</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
  <DialogLoading
    :title="'Loading'"
    :isLoading="isDialogLoading"
    :text="loadingText"
  />
  <SelectBalanceTab
    :isDialog="isSelectBalance"
    :unTopUpMintList="unTopUpMintList"
    @cancelDialog="isSelectBalance = false"
    @setNftIdentifier="setNftIdentifier"
  />
  <BindingBalanceTab
    :isDialog="isBindingBalance"
    :topUpMintList="topUpMintList"
    :dataObj="props.dataObj"
    @cancelDialog="isBindingBalance = false"
    @setNftIdentifier="setNftIdentifier"
  />
  <TransferNFTDialog
    :is-dialog="isTransferNFTDialog"
    :dataObj="props.dataObj"
    :isMintAndTransfer="isMintAndTransfer"
    @transferNft="transferNft"
    @mintTransferNft="mintTransferNft"
    @cancelDialog="cancelDialog"
  />
  <LockDialog
    :is-dialog="isLockDialog"
    @cancelDialog="isLockDialog = false"
    @lockNft="lockNft"
  />
</template>

<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import TokenIcon from '@/components/TokenIcon.vue'
import IconsTab from '@/components/IconsTab.vue'
import SelectBalanceTab from './SelectBalanceTab.vue'
import BindingBalanceTab from './BindingBalanceTab.vue'
import TransferNFTDialog from './TransferNFTDialog.vue'
import LockDialog from './LockDialog.vue'
import useUserStore from '@/store'
import useAccount from '@/hooks/useAccount'
import { t } from '@/lang'
const store = useUserStore()
const { getTrading } = useAccount()

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  countdownData: {
    type: Object,
    default: () => {},
  },
})
const priceType = ['Price', 'Fixed Price', 'Unified Price']
const openNftUrl = (url: string) => {
  const newUrl = url.slice(0, 4) === 'http' ? url : 'https://' + url
  window.open(newUrl, '_blank')
}
import { APP_OPEN_URL } from '@/config'
const openUrl = (address: string) => {
  return `${APP_OPEN_URL}/address/${address}`
}
import { splitAddress } from '@/utils'
// const truncateString = (val: string) => {
//   return splitAddress(val)
// }

import useMintWork from '@/hooks/useMintWork'
const {
  whetherItTraded,
  getWorkMintTopUp,
  getWorkMintUnTopUp,
  mintNft,
  setTransferNFTs,
  lockTopNFT,
} = useMintWork()
const emit = defineEmits(['getData', 'setFavorite'])
import { ref } from 'vue'
const isDialogLoading = ref(false)
const loadingText = ref('')
const mainnetAddress = ref('')
const isSelectBalance = ref(false)
const topUpMintList = ref<any>([])
const isBindingBalance = ref(false)
const unTopUpMintList = ref<any>([])

const checkLogin = async () => {
  const isTrad = await getTrading()
  if (!isTrad) return
  setMintNftEmitIsDialog()
}

const setMintNftEmitIsDialog = async () => {
  loadingText.value =
    'Your transcation is being processed, It should be confirmed on the blockchain shortly.'
  mainnetAddress.value = ''
  isDialogLoading.value = true
  const isTraded = await whetherItTraded(props.dataObj.daoId)
  if (!isTraded) {
    isDialogLoading.value = false
    return
  }
  mintTransfer()
}
const mintTransfer = async () => {
  if (props.dataObj.topupMode) {
    const data = await getWorkMintTopUp(props.dataObj.daoId)
    topUpMintList.value = data.topUpMintList
    isBindingBalance.value = true
    isDialogLoading.value = false
    // bind
  } else {
    const data = (await getWorkMintUnTopUp(props.dataObj)) as any
    if (data.isMint) {
      const nftIdentifier = data.nftIdentifier
      await mintNft(props.dataObj, nftIdentifier, mainnetAddress.value)
      getFatherData()
    } else {
      unTopUpMintList.value = data.unTopUpMintList
      isSelectBalance.value = true
      isDialogLoading.value = false
      // bind
    }
  }
}
const getFatherData = () => {
  setTimeout(() => {
    emit('getData')
    isDialogLoading.value = false
    mainnetAddress.value = ''
  }, 2000)
}
const setNftIdentifier = async (item: any) => {
  isDialogLoading.value = true
  await mintNft(props.dataObj, item, mainnetAddress.value)
  getFatherData()
}

const isTransferNFTDialog = ref(false)

const transferNft = async (address: string) => {
  if (address === '') return
  isTransferNFTDialog.value = false
  isDialogLoading.value = true
  loadingText.value =
    'Your transfer is being processed. It should be confirmed on the blockchain shortly.'
  await setTransferNFTs(props.dataObj, address)
  getFatherData()
}

const isMintAndTransfer = ref(false)
const setMintAndTransferNFTDialog = async () => {
  loadingText.value =
    'Your transcation is being processed, It should be confirmed on the blockchain shortly.'
  const isTraded = await whetherItTraded(props.dataObj.daoId)
  if (!isTraded) {
    return
  }
  isDialogLoading.value = true
  isMintAndTransfer.value = true
  isTransferNFTDialog.value = true
}

const mintTransferNft = async (address: string) => {
  mainnetAddress.value = address
  isMintAndTransfer.value = false
  isTransferNFTDialog.value = false
  isDialogLoading.value = false
  if (address === '') return
  isDialogLoading.value = true
  mintTransfer()
}
const cancelDialog = () => {
  isMintAndTransfer.value = false
  isTransferNFTDialog.value = false
  isDialogLoading.value = false
  mainnetAddress.value = ''
}

const isLockDialog = ref(false)
const lockNft = async (val: string | number) => {
  loadingText.value =
    'Your operation is being processed. It should be confirmed on the blockchain shortly.'
  isDialogLoading.value = true
  isLockDialog.value = false
  await lockTopNFT(val, props.dataObj)
  getFatherData()
}

const setIsLock = () => {
  if (props.dataObj.workLockStatus !== 0) return
  isLockDialog.value = true
}

import useFavorite from '@/hooks/useFavorite'
const { favoriteData } = useFavorite()
const setFavoriteData = async () => {
  const favData = await favoriteData(
    props.dataObj.workId,
    2,
    props.dataObj.favorited
  )
  if (favData) {
    props.dataObj.favorited = favData.favorited
    props.dataObj.favoritesAmount += favData.favoriteAmount
  }
}
import { useRouter } from 'vue-router'
const router = useRouter()
const goEditWork = () => {
  router.push({
    path: '/editWork',
    query: {
      id: props.dataObj.workId,
    },
  })
}
</script>

<style scoped lang="scss">
.title-card {
  // height: 280px;
  margin: 24px 48px;
  background-color: #1A1F2E !important;
  display: flex;
  padding: 24px;
  box-sizing: border-box;
  .card-left {
    width: 232px;
    height: 232px;
    flex: 0 0 auto;
    margin-right: 24px;
    background-color: #2e3547;
    .img-container {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      border-radius: 6px;
      cursor: pointer;
    }
  }
  .card-right {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}
.item-text {
  font-family: Inter;
  font-size: 24px;
  font-weight: 500;
}
.favo-box-col {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  line-height: 36px;
}
.favo-box {
  text-align: end;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont {
    cursor: pointer;
    font-size: 18px;
    color: #9e9e9e;
    // margin-right: 12px;
  }
  .t-num {
    font-size: 18px;
    color: #9e9e9e;
  }
  .fc7 {
    color: #8c91ff !important;
    // font-size: 16px !important;
  }
}
.det-box {
  padding-top: 24px;
  flex: 1;
  // h5 {
  //   margin-top: 12px;
  //   font-size: 18px;
  //   font-weight: 400;
  //   i {
  //     margin-right: 6px;
  //     font-size: 18px;
  //     color: #b3b5f2;
  //   }
  // }
  // .v-row {
  //   font-size: 14px;
  // }
}
.box-passes {
  margin-top: auto;
}
.l-price {
  font-size: 16px;
  color: #9e9e9e;
  font-family: Roboto;
}
.newPrice {
  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 600;
}

.oldPrice {
  font-size: 16px;
  color: #757575;
  text-decoration: line-through;
  margin-left: 12px;
}
.newPriceTwo {
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  // margin-top: 6px;
  line-height: 48px;
}
.det-btns {
  height: 48px;
  line-height: 48px;
  display: flex;
  margin-top: auto;
  align-items: center;
  :deep(.v-btn--block) {
    min-width: auto;
  }
}
.right-box {
  display: flex;
  // align-items: flex-end;
  flex-direction: column;
}
.time-box {
  display: flex;
  flex: 1;
  margin-top: auto;
}
.time-item {
  // height: 48px;
  // line-height: 48px;
  display: flex;
  // background-color: #2e3547;
  .num-span {
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    display: block;
    width: 30%;
  }
  .type-span {
    font-size: 14px;
    font-weight: 400;
    color: #9e9e9e;
    display: block;
    width: 70%;
    text-align: center;
  }
}
.v-sheet {
  background-color: #2e3547;
  border-radius: 6px;
}
// .time-cen {
//   margin-left: 5%;
//   margin-right: 5%;
// }
.icons {
  // line-height: 28px !important;
  display: flex;
  // justify-content: center;
  justify-content: flex-end;
  // .icons-box {
  //   // background-color: #2e3547;
  //   border-radius: 6px;
  //   display: flex;
  //   margin-right: 6px;
  // }
  // i {
  //   font-size: 24px !important;
  //   color: #9e9e9e !important;
  //   margin: 6px;
  //   // margin-right: 12px;
  // }
  // .isClick {
  //   color: #8c91ff !important;
  //   cursor: pointer;
  // }
}
.row-name {
  flex: none;
}
.row-det {
  height: 100%;
}
.btnb {
  :deep(.v-btn__overlay) {
    border-radius: 3px;
  }
}
</style>
