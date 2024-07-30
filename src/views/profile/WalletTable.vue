<template>
  <div class="wallet-box">
      <v-card class="my-pd24  my-mgb24 bg-card-1 min-w-[1080px] max-w-[1200px] mx-auto" elevation="12">
      <v-row align="start" no-gutters class="lin38">
        <v-col class="my-flexaj fc9" :cols="4">
          <v-icon class="ft18 my-mgr12">mdi-wallet-outline</v-icon>
          Income</v-col
        >
        <v-col :cols="8" class="tea fc9 flexbtn">
          <v-btn class="text-none font-bold" variant="text" @click="collectAll"
            >Collect All
          </v-btn>
        </v-col>
      </v-row>

      <Loading v-if="isLoading" style="margin: auto" />
      <div
        v-if="list.length === 0 && !isLoading"
        class="noList"
        style="height: 240px; margin: 0"
      >
        No items to display
      </div>
      <div v-else>
        <v-card v-for="(item, idx) in list" :key="idx" class="wallet-card bg-card-2">
          <v-row align="start" no-gutters>
            <v-col class="my-flexaj fc9 !items-center" :cols="12">
              <span class="my-mgr24 fw6">{{ item.daoName }}</span>
              <span class="text-sm text-grey-1">{{ item.daoSymbol }}</span>
            </v-col>
          </v-row>
          <v-row align="start" no-gutters class="row14 flex items-center">
            <v-col class="my-flexaj fc9" :cols="6">
              Minting Earning (ETH)
            </v-col>
            <v-col :cols="6" class="tea fc9 flex justify-end items-center">
              {{ item.mintReward }}
              <TokenIcon
                size="14px"
                :payCurrencyType="item.payCurrencyType"
                :inputTokenAddress="item.inputTokenAddress"
            /></v-col>
          </v-row>
          <v-row align="start" no-gutters class="row14 flex items-center">
            <v-col class="my-flexaj fc9" :cols="6">
              Minting Earning (DAO Token)
            </v-col>
            <v-col :cols="6" class="tea fc9 flex justify-end items-center">
              {{ item.mintRewardToken }}
              <TokenIcon
                size="14px"
                :daoToken="true"
                :daoSymbol="item.daoSymbol"
                :daoErc20Address="item.daoErc20Address"
              />
            </v-col>
          </v-row>
          <v-row align="start" no-gutters class="row14 flex items-center">
            <v-col class="my-flexaj fc9" :cols="6"> ERC20 Collectable </v-col>
            <v-col :cols="6" class="tea fc9 flex justify-end items-center">
              {{ item.erc20Collectable }}
            </v-col>
          </v-row>
          <v-row align="start" no-gutters class="row14 flex items-center">
            <v-col class="my-flexaj fc9" :cols="6"> ETH Collectable </v-col>
            <v-col :cols="6" class="tea fc9 flex justify-end items-center">
              {{ item.ethCollectable }}
              <TokenIcon
                size="14px"
                :payCurrencyType="item.payCurrencyType"
                :inputTokenAddress="item.inputTokenAddress"
            /></v-col>
          </v-row>
          <v-row align="start" no-gutters class="row14 flex items-center">
            <v-col class="my-flexaj fc9" :cols="6"> ERC20 Collected </v-col>
            <v-col :cols="6" class="tea fc9 flex justify-end items-center"> {{ item.erc20Collected }} </v-col>
          </v-row>
          <v-row align="start" no-gutters class="row14 flex items-center">
            <v-col class="my-flexaj fc9" :cols="6"> ETH Collected </v-col>
            <v-col :cols="6" class="tea fc9 flex justify-end items-center">
              {{ item.ethCollected }}
              <TokenIcon
                size="14px"
                :payCurrencyType="item.payCurrencyType"
                :inputTokenAddress="item.inputTokenAddress"
            /></v-col>
          </v-row>
        </v-card>
      </div>
    </v-card>
    <DialogLoading
      title="Collect All"
      :isLoading="isDialogLoading"
      text="Please continue in the wallet..."
    />
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import TokenIcon from '@/components/TokenIcon.vue'
import DialogLoading from '@/components/DialogLoading.vue'
import { claimMultiReward } from '@/common/web3service'
import { ref, onMounted } from 'vue'
import { walletDao } from '@/api/user'
import useUserStore from '@/store'
const store = useUserStore()
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
const isDialogLoading = ref(false)
const collectAll = async () => {
  let struct = []
  if (
    daoCollect.value.canvasId2List.length > 0 ||
    daoCollect.value.projectId2List.length > 0
  ) {
    struct.push({
      protocol: store.PactAbi.protocol_contract,
      canvasIds: daoCollect.value.canvasId2List,
      daoIds: daoCollect.value.projectId2List,
    })
  }
  if (struct.length > 0) {
    if (struct[0].canvasIds.length > 0 || struct[0].daoIds.length > 0) {
      isDialogLoading.value = true
      try {
        const tx = await claimMultiReward(struct)
        const res = await tx.wait()
        notifySuc('collect')
        if (res.status || res.logs.length > 0) {
          getData()
        }
        isDialogLoading.value = false
      } catch (error) {
        const err = JSON.stringify(error)
        notifyErr(err)
        isDialogLoading.value = false
      }
    }
  } else {
    isDialogLoading.value = false
    notifyErr('No collectable ERC20', true)
  }
}
const isLoading = ref(true)
const list = ref<any>([])
const daoCollect = ref()
const getData = async () => {
  const res = await walletDao()
  list.value = res.data.daoIncomeVos
  daoCollect.value = res.data
  isLoading.value = false
}

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.wallet-box {
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
.v-card {
  width: 100%;
}
.noList {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbbaba;
  font-size: 18px;
  margin: 42px 0;
}
.wallet-card {
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 24px;
}
.flexbtn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #745cd4;
}
</style>
