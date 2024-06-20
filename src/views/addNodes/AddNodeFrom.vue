<template>
  <div class="from-box">
    <NodesHeader v-if="store.addNodeType > 0" />
    <AddFormAssetType
      @setFormData="setFormData"
      v-show="
        (store.addNodeType === 1 || store.addNodeType === 6) &&
        !route.query.id
      "
      :formDataProp="formData"
      :initData="props.initData"
    />
    <AddFormBlock
      @setFormData="setFormData"
      v-show="store.addNodeType === 2 || store.addNodeType === 6"
      :formDataProp="formData"
      :initData="props.initData"
    />
    <AddFormWork
      @setFormData="setFormData"
      v-show="store.addNodeType === 3 || store.addNodeType === 6"
      :formDataProp="formData"
    />
    <AddFormTokenomicsStructure
      @setFormData="setFormData"
      v-show="store.addNodeType === 4 || store.addNodeType === 6"
      :formDataProp="formData"
    />
    <AddFormNodesStrategies
      @setFormData="setFormData"
      v-show="store.addNodeType === 5 || store.addNodeType === 6"
      :formDataProp="formData"
    />

    <div
      class="dflex flex-jc my-mgb24 my-mgt24"
      v-if="store.addNodeType === 6"
    >
      <v-btn block class="btnz text-none" type="submit" @click="submit"
        >Submit</v-btn
      >
    </div>

    <DialogLoading :title="'Setup Nodes'" :isLoading="isDialogLoading" />
  </div>
</template>
<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import AddFormAssetType from './AddFormAssetType.vue'
import AddFormBlock from './AddFormBlock.vue'
import AddFormWork from './AddFormWork.vue'
import AddFormTokenomicsStructure from './addFormTokenomicsStructure/Index.vue'
import AddFormNodesStrategies from './addFormNodesStrategies/Index.vue'
import NodesHeader from './NodesHeader.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import useUserStore from '@/store'
const store = useUserStore()
const props = defineProps({
  initData: {
    type: Object,
    default: () => ({}),
  },
  daoName: {
    type: String,
    default: '',
  },
})

import { ref, onMounted } from 'vue'

import { ethers } from 'ethers'

const formData = ref({
  daoName: '',

  //1.7
  inputToken: '0x0000000000000000000000000000000000000000',
  inputTokenErc20ContractAddress: '',
  thirdParty: false,
  erc20ContractAddress: '',
  mintingNftWithMaxlistAddress: [],
  mintingNftWithUnlimitedlistAddress: [],
  workNftlistAddress: [],
  // ------- block

  daoStartDate: '',
  topUpMode: false,
  infiniteMode: false,
  daoMintWindow: 60,
  daoMintWindowDuration: 24,
  totalNftCasting: 2,
  dailyMintCap: 10000,
  // ------- work

  needMintableWork: false,
  passesQuantity: 1000,
  daoTokenMode: false,
  daoFloorPrice: 0.0001,
  unifiedPriceMode: false,
  unifiedPrice: 0.01,
  fluctuationMethod: 0,
  doublingFactor: 2,
  growthFactor: 0.1,

  //----------Nodes Tokenomics Structure
  lotteryMode: false,
  ERC20OtherNodes: 0,
  ERCOtherNodeslist: [],
  ETHOtherNodesList: [],
  ETHOtherNodes: 0,
  nodesReservesRatioERC20: 0,
  nodesReservesRatioETH: 0,
  selfRewardRatioERC20: 0,
  selfRewardRatioETH: 0,
  redeemPoolRatioETH: 0,
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

  workBlacklistAddress: [],
  workWhitelistAddress: [],
  workErclistAddress: [],
  mintingBlacklistAddress: [],
  mintingWithMaxlistAddress: [],
  mintingWithUnlimitedlistAddress: [],
  mintingErcWithMaxlistAddress: [],
  mintingErcWithUnlimitedlistAddress: [],
  mintingCapForDaolistAmount: [],

  tokenAllocation: 0,
  type: 2,
  existDaoId: props.initData.existDaoId
    ? props.initData.existDaoId
    : ethers.constants.HashZero,
  isAncestorDao: props.initData.existDaoId ? false : true,
})

const setFormData = (val: any) => {
  formData.value = { ...formData.value, ...val }
  console.log(formData.value, '接受')
}

const isDialogLoading = ref(false)
import dayjs from 'dayjs'
import useAddNodes from '@/hooks/useAddNodes'
const { addNode } = useAddNodes()
const submit = async () => {
  console.log(formData.value, 'formData.value')
  isDialogLoading.value = true

  const daoStartDate = dayjs(formData.value.daoStartDate).format('YYYY-MM-DD')
  const req = {
    ...formData.value,
    daoStartDate: daoStartDate,
    daoName: props.daoName,
  }
  await addNode(req)
  isDialogLoading.value = false
}

onMounted(() => {
  console.log(props.initData, '首月')
  formData.value.thirdParty = props.initData.thirdParty
    ? props.initData.thirdParty
    : false
  formData.value.daoName = props.daoName
})
</script>
<style lang="scss" scoped>
.from-box {
  width: 100%;
  height: 100%;
  :deep(.v-card) {
    background-color: transparent !important;
  }
}
:deep(.v-form) {
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 24px;
}
:deep(.v-input__control) {
  height: 56px !important;
}
:deep(.v-selection-control-group--inline) {
  height: 56px !important;
}
</style>
