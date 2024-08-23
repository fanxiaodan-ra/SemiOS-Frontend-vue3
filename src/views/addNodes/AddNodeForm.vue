<template>
  <div class="from-box">
    <div class="w-full max-w-[1200px] self-center flex flex-col mx-auto" v-if="route.query.id">
      <ImportForkedParam className="self-end mt-6" />
    </div>
    <NodesHeader v-if="store.addNodeType > 0" />
    <AddFormAssetType
      @setFormData="setFormData"
      v-show="(store.addNodeType === 1 || store.addNodeType === 6) && !route.query.id"
      :formDataProp="formData"
      :initData="props.initData"
      ref="AddFormAssetTypeRef"
    />
    <AddFormBlock
      @setFormData="setFormData" v-show="store.addNodeType === 2 || store.addNodeType === 6"
      :formDataProp="formData"
      :initData="props.initData"
    />
    <AddFormWork
      @setFormData="setFormData" v-show="store.addNodeType === 3 || store.addNodeType === 6"
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
      <v-btn block class="btnz text-none" type="submit" @click="submit">
        {{
        t('common.submit')
        }}
      </v-btn>
    </div>

    <DialogLoading title="Setup Nodes" :isLoading="isDialogLoading" />
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
import ImportForkedParam from './components/ImportForkedParam.vue'
import useUserStore from '@/store'
import { useRoute } from 'vue-router'
import { t } from '@/lang'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { ethers } from 'ethers'
import useAddNodes from '@/hooks/useAddNodes'
import useAccount from '@/hooks/useAccount'
import useForkedParams from './hooks/useForkedParams'
import type { Erc721MintIdCaps, WhiteListedERC721Id, ReserveRatio, ethReserveRatio, MintingAddress, ERCNftAddress, NodeList } from '@/types/SetupDao'

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
  mintingNftWithMaxlistAddress: [] as Erc721MintIdCaps,
  mintingNftWithUnlimitedlistAddress: [] as WhiteListedERC721Id,
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
  ERCOtherNodeslist: [] as NodeList[],
  ETHOtherNodesList: [] as NodeList[],
  ETHOtherNodes: 0,
  nodesReservesRatioERC20: 100,
  nodesReservesRatioETH: 0,
  selfRewardRatioERC20: 0,
  selfRewardRatioETH: 0,
  redeemPoolRatioETH: 100,
  daoPriceReserveRatio: {
    builder: 0,
    mainDao: 97.5,
    pDao: 0,
    subDao: 2.5,
  } as ReserveRatio,
  fixedPriceReserveRatio: {
    builder: 0,
    mainDao: 97.5,
    pDao: 0,
    subDao: 2.5,
  } as ReserveRatio,
  royalty: {
    pDao: 0,
    subDao: 50,
    builder: 25,
    minter: 25,
  } as ethReserveRatio,
  eth: {
    pDao: 0,
    subDao: 50,
    builder: 25,
    minter: 25
  } as ethReserveRatio,

  workBlacklistAddress: [] as Array<{ address: string }>,
  workWhitelistAddress: [] as Array<{ address: string }>,
  workErclistAddress: [] as Array<{ address: string }>,
  workNftlistAddress: [] as WhiteListedERC721Id,
  mintingBlacklistAddress: [] as Array<{ address: string }>,
  mintingWithMaxlistAddress: [] as MintingAddress,
  mintingWithUnlimitedlistAddress: [] as Array<{ address: string }>,
  mintingErcWithMaxlistAddress: [] as ERCNftAddress,
  mintingErcWithUnlimitedlistAddress: [] as Array<{ address: string }>,
  mintingCapForDaolistAmount: [] as Array<{ amount: number }>,

  tokenAllocation: 0,
  type: 1,
  existDaoId: props.initData.existDaoId
    ? props.initData.existDaoId
    : ethers.constants.HashZero,
  isAncestorDao: props.initData.existDaoId ? false : true,
  initData: {} as any,
})

const {
  nodeBlockParam,
  nodeWorksParam,
  nodesTokenStructure,
  nodesStrategies,
  setForkedParams,
  resetParams,
} = useForkedParams()

watch(
  () => [
    nodeBlockParam.value,
    nodeWorksParam.value,
    nodesTokenStructure.value,
    nodesStrategies.value
  ],
  () => {
    formData.value = {
      ...formData.value,
      ...nodeBlockParam.value,
      ...nodeWorksParam.value,
      ...nodesTokenStructure.value,
      ...nodesStrategies.value,
    }
}, { deep: true })

const valid = ref(false)
const formsValid = ref([true, true, true, true])
const showSucDialog = ref(false)


const setFormData = (params: any) => {
  const { formVal, validVal = null } = params
  if (formVal?.value) {
    formData.value = { ...formData.value, ...formVal.value }
  }
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
      resetParams()
    }
  } catch (error) {
    isDialogLoading.value = false
  }
}

onMounted(() => {
  if (route.query.forkId) {
    setForkedParams(route.query.id as string)
  }

  formData.value.thirdParty = props.initData.thirdParty
    ? props.initData.thirdParty
    : false
  formData.value.daoName = props.daoName
  formData.value.inputToken = !route.query.id ? '0x0000000000000000000000000000000000000000' : props.initData.payCurrencyType === 'ETH' ? '0x0000000000000000000000000000000000000000' : props.initData.inputTokenAddress
})

onBeforeUnmount(() => {
  resetParams()
})

watch(
  () => props.initData,
  (data: any) => {
    if (data) {
      formData.value = {
        ...formData.value,
        existDaoId: data.existDaoId
          ? data.existDaoId
          : ethers.constants.HashZero,
        isAncestorDao: data.existDaoId ? false : true,
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
