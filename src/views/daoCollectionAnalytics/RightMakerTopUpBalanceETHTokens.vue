<template>
  <v-card class="node-card">
    <div class="maker-title">
      <h3>
        {{ t('daoCollectionAnalytics.rightMakerTopupBalanceETHTokens.title') }}
        <i class="iconfont icon-info ft18">
          <v-tooltip activator="parent" location="top" max-width="300">
            {{ t('daoCollectionAnalytics.rightMakerTopupBalanceETHTokens.desc') }}
          </v-tooltip>
        </i>
      </h3>
    </div>
    <div v-if="isLoading" class="card-body">
      <v-skeleton-loader elevation="12" height="100%" width="100%"
        type="list-item,list-item,list-item,list-item,list-item"></v-skeleton-loader>
    </div>
    <div class="card-body" v-else>
      <div class="maker-box">
        <v-row no-gutters class="rowlin" v-for="(item, idx) in formData.ethTransTokenList" :key="item.daoName">
          <v-col cols="4" :class="idx === 0 ? 'onename' : ''">
            <span v-if="idx === 0" style="line-height: 48px; display: block">{{
              item.daoName
              }}</span>
            <router-link v-else :to="`/nodeDetails?type=2&id=${item.daoId}`" class="token-icon">
              <v-btn class="text-none w-m-[130px] overflow-ellipsis" variant="text">
                <v-tooltip activator="parent" location="top" max-width="300">
                  {{ item.daoName }}
                </v-tooltip>
                {{ item.daoName }}
              </v-btn>
            </router-link>
          </v-col>
          <v-col cols="4" class="e6name">
            <v-text-field label="Wallet" density="comfortable" append-inner-icon="mdi-percent-outline"
              type="number"
              v-model="item.walletRatio"
              @update:modelValue="
                setInput(item, 'walletRatio', 'treasuryOrPoolRatio')
              ">
            </v-text-field></v-col>
          <v-col cols="4" class="e6name">
            <v-text-field label="Treasury" density="comfortable" append-inner-icon="mdi-percent-outline"
              type="number"
              v-model="item.treasuryOrPoolRatio" @update:modelValue="
                setInput(item, 'treasuryOrPoolRatio', 'walletRatio')
              ">
            </v-text-field></v-col>
        </v-row>
      </div>
      <div>
        <v-btn block class="btnz text-none" type="submit" @click="submitFormEth">Submit</v-btn>
      </div>
    </div>
  </v-card>
  <DialogLoading title="Loading" :isLoading="isDialogLoading"
    :text="t('daoCollectionAnalytics.rightMakerTopupBalanceETHTokens.tooltip')" />
</template>

<script setup lang="ts">
import { togetherDaoMakerList } from '@/api/daos'
import { ref, onMounted } from 'vue'
import DialogLoading from '@/components/DialogLoading.vue'
import { t } from '@/lang'
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
import { BigNumber } from 'bignumber.js'
import { setTopUpOutputSplitRatio } from '@/common/web3service'
import useAccount from '@/hooks/useAccount'
const props = defineProps({
  userPermission: {
    type: Object,
    default: () => { },
  }
})
const { getTrading } = useAccount()

const ownerAddress = ref('')
const isDialogLoading = ref(false)
const submitFormEth = async () => {
  const isTrad = await getTrading()
  if (!isTrad) return
  if (
    !props.userPermission.isPermission
  )
    return notifyErr('You don’t have permission to edit this parameter.', true)
  isDialogLoading.value = true
  try {
    const defaulData = formData.value.ethTransTokenList[0]
    const subDaoIds = formData.value.ethTransTokenList
      .filter((item: any) => item.daoId !== null)
      .map((item: any) => item.projectId)
    const erc20Ratios = formData.value.ethTransTokenList
      .filter((item: any) => item.daoId !== null)
      .map((item: any) =>
        new BigNumber(item.treasuryOrPoolRatio).times(100).toString()
      )
    const req = {
      daoId: defaulData.projectId,
      defaultOutputRatio: new BigNumber(defaulData.treasuryOrPoolRatio)
        .times(100)
        .toString(),
      subDaoIds: subDaoIds,
      outputRatios: erc20Ratios,
    }
    console.log(req, 'req')
    const tx = await setTopUpOutputSplitRatio(req)
    const res = await tx.wait()
    isDialogLoading.value = false
    notifySuc(res)
  } catch (error) {
    const err = JSON.stringify(error)
    isDialogLoading.value = false
    notifyErr(err)
  }
}
const formData = ref({
  tokenTransEthList: [],
}) as any
import { oninputNum, minusOthers } from '@/utils'
const setInput = (item: any, type: string, oldType: string) => {
  item[type] = oninputNum(item[type], 2, 0, 100)
  item[oldType] = minusOthers(100, item[type])
}
import { useRoute } from 'vue-router'
const route = useRoute()

const isLoading = ref(true)
const getData = async () => {
  try {
    const query = {
      daoId: route.query.id,
    }
    const res = await togetherDaoMakerList(query)
    ownerAddress.value = res.data.ownerAddress
    formData.value.ethTransTokenList = [
      {
        daoName: 'Default Ratio',
        daoId: null,
        walletRatio: res.data.ethTransTokenWalletRatioDefault,
        treasuryOrPoolRatio: res.data.ethTransTokenTreasuryRatioDefault,
        projectId: res.data.projectId,
      },
      ...res.data.ethTransTokenList,
    ]
  } catch (error) {
    console.log(error, 'error')
  }
  isLoading.value = false
}

onMounted(() => {
  getData()
})
</script>

<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
  padding: 0 !important;
  margin: 0px;
  margin-bottom: 24px;
}
.maker-title {
  display: flex;
  margin-top: 24px;
  padding-left: 24px;

  h3 {
    color: #bbbaba;
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  :deep(.v-input__details) {
    display: none;
  }
  :deep(.v-checkbox .v-selection-control) {
    min-height: auto;
    display: flex;
    justify-content: end;
  }
  :deep(.v-selection-control__wrapper) {
    height: 28px;
  }
}

.loading-box {
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-body {
  width: 100%;
  height: 364px;
  display: flex;
  flex-direction: column;
  padding: 24px;
  .maker-box {
    width: 100%;
    height: 280px;
    overflow-y: auto;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
  }
  :deep(.v-skeleton-loader__image) {
    height: 300px;
    margin: 0 16px;
  }
}

:deep(.v-skeleton-loader) {
  background-color: transparent;
  box-shadow: none !important;
}
.rowlin {
  // line-height: 36px;
  :deep(.v-input) {
    width: 80%;
  }
  :deep(.v-btn) {
    height: 48px !important;
  }
}
.onename {
  color: #fff;
  padding: 0 16px !important;
}
.e6name {
  color: #9e9e9e;
}
</style>
