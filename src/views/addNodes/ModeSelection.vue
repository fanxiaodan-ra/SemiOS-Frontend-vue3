<template>
  <v-dialog v-model="props.isModeSelection" :persistent="true" :no-click-animation="true" width="420">
    <v-card>
      <div class="mode-title fw4 fti">
        {{ $t('ModeSelection.dialogTitle') }}
        <v-btn class="cancel-btn" variant="text" @click="cloceMode">
          <i class="iconfont icon-guanbi ft12"></i>
        </v-btn>
      </div>
      <v-card-actions>
        <v-btn border class="text-none btnmo btnb my-mgb12 ftr" prepend-icon="mdi-plus" variant="text" block
          size="large" @click="basicMode">
          {{ $t('ModeSelection.btnText', 0) }}
        </v-btn>
        <v-btn border class="text-none btnmo btnb my-mgb12 ftr" prepend-icon="mdi-plus" variant="text" block
          size="large" @click="instructionMode">
          {{ $t('ModeSelection.btnText', 1) }}
        </v-btn>
        <v-btn border class="text-none btnmo btnb my-mgb12 ftr" prepend-icon="mdi-plus" variant="text" block
          size="large" @click="professionalMode">
          {{ $t('ModeSelection.btnText', 2) }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import useAddNodes from '@/hooks/useAddNodes'

import dayjs from 'dayjs'

const { addNode, getDaoTime } = useAddNodes()
const emit = defineEmits(['cancelDialog', 'setLoading', 'setAddType', 'showSucDialog'])
const props = defineProps({
  isModeSelection: {
    type: Boolean,
    default: false,
  },
  daoName: {
    type: String,
    default: '',
  },
  initData: {
    type: Object,
    default: () => { },
  },
})

const cloceMode = () => {
  emit('cancelDialog', false)
}
import { ethers } from 'ethers'

import { useRoute } from 'vue-router'
const route = useRoute()
const basicMode = async () => {
  emit('setLoading', true)
  emit('cancelDialog', false)
  const tiem = await getDaoTime()
  const formData = {
    daoName: props.daoName,
    daoStartDate: dayjs(new Date(tiem)).format('YYYY-MM-DD'),
    lotteryMode: true,
    infiniteMode: false,
    thirdParty: false,
    erc20ContractAddress: '',
    tokenAllocation: 0,
    daoMintWindow: 60,
    daoMintWindowDuration: 24,
    totalNftCasting: 2,
    dailyMintCap: 10000,
    needMintableWork: true,
    passesQuantity: '1000',
    daoTokenMode: false,
    unifiedPriceMode: true,
    unifiedPrice: '0.01',
    daoFloorPrice: 0.0001,
    fluctuationMethod: 0,
    doublingFactor: 2,
    growthFactor: 0.1,
    topUpMode: false,
    daoPriceReserveRatio: {
      builder: 0,
      mainDAO: 97.5,
      pDao: 0,
      subDAO: 2.5,
    },
    fixedPriceReserveRatio: {
      builder: 0,
      mainDAO: 97.5,
      pDao: 0,
      subDAO: 2.5,
    },
    royalty: {
      pDao: 0,
      subDao: 50,
      builder: 25,
      minter: 25,
    },
    eth: { pDao: 0, subDao: 50, builder: 25, minter: 25 },
    mintingBlacklistAddress: [],
    workBlacklistAddress: [],
    mintingErcWithUnlimitedlistAddress: [],
    mintingWithMaxlistAddress: [],
    type: 2,
    mintingWithUnlimitedlistAddress: [],
    workErclistAddress: [],
    workWhitelistAddress: [],
    mintingErcWithMaxlistAddress: [],
    mintingCapForDaolistAmount: [],
    ETHOtherNodesList: [],
    ERCOtherNodeslist: [],
    existDaoId: props.initData.existDaoId
      ? props.initData.existDaoId
      : ethers.constants.HashZero,
    isAncestorDao: props.initData.existDaoId ? false : true,
    selfRewardRatioERC20: 100,
    redeemPoolRatioETH: 100,
    selfRewardRatioETH: 0,
    //1.7
    inputToken: !route.query.id ? '0x0000000000000000000000000000000000000000' : props.initData.payCurrencyType === 'ETH' ? '0x0000000000000000000000000000000000000000' : props.initData.inputTokenAddress,
    workNftlistAddress: [],
    mintingNftWithUnlimitedlistAddress: [],
    mintingNftWithMaxlistAddress: [],
    initData: { ...props.initData },
  }
  const result = await addNode(formData)
  emit('setLoading', false)

  if (result) {
    emit('showSucDialog', true)
  }
}
// import useToastNotify from '@/hooks/useToastNotify'
// const { notifyErr, notifyInfo, notifySuc } = useToastNotify()
const instructionMode = () => {
  emit('cancelDialog', false)
  const type = route.query.id ? 2 : 1
  emit('setAddType', type)
  // setTimeout(() => {
  //   emit("setAddType", 1);
  // }, 500);
  // notifyErr("");
}
const professionalMode = () => {
  emit('cancelDialog', false)
  emit('setAddType', 6)
  // setTimeout(() => {
  //   emit("setAddType", 2);
  // }, 500);
  // notifyInfo()
  // notifySuc('')
  // notifyErr('')
}
</script>

<style lang="scss" scoped>
:deep(.v-card-actions) {
  // margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

:deep(.v-btn) {
  padding: 0;
  margin-inline-start: 0 !important;
}
</style>
