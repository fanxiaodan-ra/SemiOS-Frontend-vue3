<template>
  <div class="from-box">
    <NodesHeader v-if="store.addNodeType > 0" />
    <AddFormAssetType @setFormData="setFormData" v-show="(store.addNodeType === 1 || store.addNodeType === 6) && !route.query.id
      " :formDataProp="formData" :initData="props.initData" ref="AddFormAssetTypeRef" />
    <AddFormBlock @setFormData="setFormData" v-show="store.addNodeType === 2 || store.addNodeType === 6"
      :formDataProp="formData" :initData="props.initData" />
    <AddFormWork @setFormData="setFormData" v-show="store.addNodeType === 3 || store.addNodeType === 6"
      :formDataProp="formData" />
    <AddFormTokenomicsStructure @setFormData="setFormData" v-show="store.addNodeType === 4 || store.addNodeType === 6"
      :formDataProp="formData" />
    <AddFormNodesStrategies @setFormData="setFormData" v-show="store.addNodeType === 5 || store.addNodeType === 6"
      :formDataProp="formData" />

    <div class="dflex flex-jc my-mgb24 my-mgt24" v-if="store.addNodeType === 6">
      <v-btn block class="btnz text-none" type="submit" @click="submit">
        {{
          t('common.submit')
        }}
      </v-btn>
    </div>

    <DialogLoading :title="'Setup Nodes'" :isLoading="isDialogLoading" />
    <SucDialog v-model="showSucDialog" />
  </div>
</template>
<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import SucDialog from './components/SucDialog.vue'
import AddFormAssetType from './AddFormAssetType.vue'
import AddFormBlock from './AddFormBlock.vue'
import AddFormWork from './AddFormWork.vue'
import AddFormTokenomicsStructure from './addFormTokenomicsStructure/Index.vue'
import AddFormNodesStrategies from './addFormNodesStrategies/Index.vue'
import NodesHeader from './NodesHeader.vue'
import useUserStore from '@/store'
import { useRoute } from 'vue-router'
import { t } from '@/lang'
import { ref, onMounted, watch } from 'vue'
import { ethers } from 'ethers'
import useAddNodes from '@/hooks/useAddNodes'
import useAccount from '@/hooks/useAccount'

const { getTrading } = useAccount()
const route = useRoute()
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
  type: 1,
  existDaoId: props.initData.existDaoId
    ? props.initData.existDaoId
    : ethers.constants.HashZero,
  isAncestorDao: props.initData.existDaoId ? false : true,
  initData: {},
})
const valid = ref(false)
const formsValid = ref([true, true, true, true])
const showSucDialog = ref(false)


const setFormData = (params: any) => {
  const { formVal, validVal = null } = params
  if (formVal?.value) {
    formData.value = { ...formData.value, ...formVal.value }
  }
  console.log(formData, 'formData.value ', formVal)
  if (validVal) {
    formsValid.value[validVal.position] = validVal.value
    valid.value = formsValid.value.filter((item) => item === false).length === 0
  }
}

const isDialogLoading = ref(false)

const { addNode } = useAddNodes(route.query.id as string)
const AddFormAssetTypeRef = ref(null) as any
const submit = async () => {
  const isTrad = await getTrading()
  if (!isTrad) return
  if (AddFormAssetTypeRef.value) {
    const isAddFormAssetType = await AddFormAssetTypeRef.value.validateNext()
    if (!isAddFormAssetType) return
  }
  console.log(formData, 'formData.value ')
  if (!valid.value) return
  isDialogLoading.value = true

  const req = {
    ...formData.value,
    daoName: props.daoName,
  }
  try {
    const result = await addNode(req)
    isDialogLoading.value = false
    if (result) {
      showSucDialog.value = true
    }
  } catch (error) {
    isDialogLoading.value = false
  }
}

onMounted(() => {
  formData.value.thirdParty = props.initData.thirdParty
    ? props.initData.thirdParty
    : false
  formData.value.daoName = props.daoName
  formData.value.inputToken = !route.query.id ? '0x0000000000000000000000000000000000000000' : props.initData.payCurrencyType === 'ETH' ? '0x0000000000000000000000000000000000000000' : props.initData.inputTokenAddress
})

watch(
  () => props.initData,
  (data: any) => {
    if (data) {
      formData.value = {
        ...formData.value,
        initData: data,
      }
    }
  },
  { deep: true, immediate: true }
)
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
