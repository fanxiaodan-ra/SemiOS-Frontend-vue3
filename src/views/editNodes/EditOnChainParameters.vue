<template>
  <div class="wh100">
    <h2 class="h2-title">{{ t('editOnchainParam.title') }}</h2>
    <v-divider class="border-purple"></v-divider>
    <loading v-if="isLoading" />
    <div v-else>
      <p class="text-center text-neutral-500 text-lg font-medium font-['Inter'] tracking-tight mb-6 mt-8">
        {{ t('editOnchainParam.subTitle') }}
        <router-link
          :to="'/workDetails?id=' + userPermission.workId"
          class="hover:text-primary-2 text-indigo-400 text-lg font-medium font-['Inter'] tracking-tight"
          >{{ `${userPermission.daoNameNft}.${userPermission.workNumber}` }}</router-link
        >
      </p>
      <EditOnChainNodesBlock
        :initData="initData"
        @setFormData="setFormData"
        ref="nodesBlockRef"
      />
      <EditOnChainNodesWork
        :initData="initData"
        @setFormData="setFormData"
        ref="nodesWorkRef"
      />
      <EditOnChainTokenomics
        v-if="!initData.topupMode"
        :initData="initData"
        @setFormData="setFormData"
        ref="nodesTokenomicsRef"
      />
      <div class="dflex flex-jc my-mgb24 my-mgt24">
        <v-btn
          block
          class="btnb fc7 text-none mr-10"
          type="submit"
          @click="goNode"
          >{{ t('common.back') }}</v-btn
        >
        <v-btn block class="btnz text-none" type="submit" @click="setEditForm"
          >{{ t('common.submit') }}</v-btn
        >
      </div>
    </div>
  </div>
  <DialogLoading
    :title="t('common.edit')"
    :isLoading="isDialogLoading"
    :text="t('common.waiting')"
  />
</template>

<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import EditOnChainNodesBlock from './EditOnChainNodesBlock.vue'
import EditOnChainNodesWork from './EditOnChainNodesWork.vue'
import EditOnChainTokenomics from './EditOnChainTokenomics.vue'
import Loading from '@/components/Loading.vue'
import { t } from '@/lang'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePermission from '@/hooks/useUserPermission'
import { distribute } from '@/api/daos'
import useToastNotify from '@/hooks/useToastNotify'

const { notifyErr } = useToastNotify()
const route = useRoute()
const { userPermission, getPermission } = usePermission()
const formData = ref({
  lotteryMode: false,
  selfRewardRatioERC20: 0,
  nodesReservesRatioERC20: 0,
  ERC20OtherNodes: 0,
  redeemPoolRatioETH: 0,
  selfRewardRatioETH: 0,
  nodesReservesRatioETH: 0,
  ETHOtherNodes: 0,
  ERCOtherNodeslist: [],
  ETHOtherNodesList: [],
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
}) as any
import { BigNumber } from 'bignumber.js'
const initData = ref()
const isLoading = ref(true)
const getData = async () => {
  const res = await distribute({ daoId: route.query.id })
  const decimalsNum = res.data.daoTokenMode
    ? `1e${res.data.erc20TokenDecimals}`
    : `1e${res.data.inputTokenDecimals}`
  initData.value = {
    ...res.data,
    decimalsNum: decimalsNum,
    thirdParty: res.data.isThirdpartyToken,
  }
  if (initData.value.topupMode) {
    formData.value.redeemPoolRatioETH = initData.value.ethAllocation[0]
    formData.value.selfRewardRatioETH = initData.value.ethAllocation[1]
    formData.value.nodesReservesRatioETH = initData.value.ethAllocation[2]
    formData.value.ETHOtherNodes =
      100 -
      formData.value.redeemPoolRatioETH -
      formData.value.selfRewardRatioETH -
      formData.value.nodesReservesRatioETH
    formData.value.selfRewardRatioERC20 = initData.value.daoAllocation[0]
    formData.value.nodesReservesRatioERC20 = initData.value.daoAllocation[1]
    formData.value.ERC20OtherNodes =
      100 -
      formData.value.selfRewardRatioERC20 -
      formData.value.nodesReservesRatioERC20

    formData.value.ETHOtherNodesList = initData.value.daoEthAllocationVos.map(
      (item: any) => {
        return {
          projectId: item.projectId,
          value: item.royaltyProportion,
          daoName: item.daoName,
        }
      }
    )
    formData.value.ETHOtherNodes = formData.value.ETHOtherNodesList.reduce(
      (a: number, item: any) => new BigNumber(a).plus(item.value).toNumber(),
      0
    )
    formData.value.ERCOtherNodeslist = initData.value.daoTokenAllocationVos.map(
      (item: any) => {
        return {
          projectId: item.projectId,
          value: item.royaltyProportion,
          daoName: item.daoName,
        }
      }
    )
    formData.value.ERC20OtherNodes = formData.value.ERCOtherNodeslist.reduce(
      (a: number, item: any) => new BigNumber(a).plus(item.value).toNumber(),
      0
    )
    formData.value.daoPriceReserveRatio.builder =
      initData.value.unFixedReserveRatio.canvasMintFee
    formData.value.daoPriceReserveRatio.mainDAO =
      initData.value.unFixedReserveRatio.redeemPoolMintFee
    formData.value.daoPriceReserveRatio.pDao =
      initData.value.unFixedReserveRatio.d4aMintFee
    formData.value.daoPriceReserveRatio.subDAO =
      initData.value.unFixedReserveRatio.daoMintFee
    formData.value.fixedPriceReserveRatio.builder =
      initData.value.fixedReserveRatio.canvasMintFee
    formData.value.fixedPriceReserveRatio.mainDAO =
      initData.value.fixedReserveRatio.redeemPoolMintFee
    formData.value.fixedPriceReserveRatio.pDao =
      initData.value.fixedReserveRatio.d4aMintFee
    formData.value.fixedPriceReserveRatio.subDAO =
      initData.value.fixedReserveRatio.daoMintFee

    formData.value.royalty = {
      pDao: initData.value.daoRoyaltyToken.d4aReward,
      subDao: initData.value.daoRoyaltyToken.daoReward,
      builder: initData.value.daoRoyaltyToken.canvasReward,
      minter: initData.value.daoRoyaltyToken.minterReward,
    }

    formData.value.eth = {
      pDao: initData.value.daoEthRoyaltyToken.d4aReward,
      subDao: initData.value.daoEthRoyaltyToken.daoCreatorETHReward,
      builder: initData.value.daoEthRoyaltyToken.canvasCreatorETHReward,
      minter: initData.value.daoEthRoyaltyToken.minterETHReward,
    }
  }
  // formData.value = data.data
  isLoading.value = false
}
const nodesBlockRef = ref()
const nodesWorkRef = ref()
const nodesTokenomicsRef = ref()
const isDialogLoading = ref(false)
import useAddNodes from '@/hooks/useAddNodes'
const { editNodeChain } = useAddNodes()
const setEditForm = async () => {
  if (!userPermission.value.isPermission) {
    notifyErr(t('common.noPermissionTip'), true)
    return
  }
  const isBlock = await nodesBlockRef.value.setFormBlock()
  if (!isBlock) return
  const isWork = await nodesWorkRef.value.setFormWork()
  if (!isWork) return
  const isToken = nodesTokenomicsRef.value
    ? await nodesTokenomicsRef.value.setTokenomicsData()
    : true
  if (!isToken) return
  isDialogLoading.value = true
  const req = {
    ...formData.value,
    daoId: initData.value.projectId,
    decimalsNum: initData.value.decimalsNum,
  }
  const changeInfiniteMode =
    initData.value.infiniteMode === formData.value.infiniteMode ? false : true
  const isTx = await editNodeChain(req, changeInfiniteMode)
  isDialogLoading.value = false
  if (!isTx) return
  goNode()
}
const setFormData = (data: any) => {
  formData.value = { ...formData.value, ...data }
}
const router = useRouter()
const goNode = () => {
  router.push({
    path: '/nodeDetails',
    query: {
      id: route.query.id,
    },
  })
}


onMounted(() => {
  getData()
  getPermission({
    daoId: route.query.id as string,
    permissionType: 2
  })
})
</script>

<style lang="scss" scoped>
.edit-box {
  height: 100%;
  width: 100%;
}
</style>
