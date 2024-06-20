<template>
  <div class="div-box">
    <div class="pos_fix">
      <h2>Top-up Reward</h2>
      <v-divider class="my-divider"></v-divider>
    </div>

    <div class="card-box">
      <div class="reward-box" v-if="!isLoading">
        <v-card
          class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24"
          v-for="(item, idx) in list"
          :key="item.daoName + idx"
        >
          <div class="card-top">
            <div class="t-img"><img :src="item.daoLogoUrl" alt="" /></div>
            <div class="t-box">
              <h4>
                {{ item.daoName }}
              </h4>
              <div style="margin-left: auto">
                <v-btn block class="btnz text-none" @click="collectItem(item)">
                  Collect
                </v-btn>
              </div>
            </div>
          </div>
          <div class="card-bom">
            <v-table max-height="212px" fixed-header>
              <thead>
                <tr>
                  <th class="table-title">Incentive Plan</th>
                  <th class="table-title">Collected Reward</th>
                  <th class="table-title">Collectable Reward</th>
                </tr>
              </thead>
              <Loading v-if="item.isLoading" />
              <tbody v-else>
                <tr
                  v-for="tableItem in (item.topUpBalanceList as any)"
                  :key="tableItem.name"
                >
                  <td>
                    <v-tooltip activator="parent" location="top">
                      {{ item.daoName }} Top-Up Holders Incentive Plan #{{
                        tableItem.planNumber
                      }} </v-tooltip
                    >{{
                      truncateString(
                        `${item.daoName} Top-Up Holders Incentive Plan #${tableItem.planNumber}`
                      )
                    }}
                  </td>
                  <td>
                    <div class="flexcen">
                      {{ bigNumFormat(tableItem.collectedAmount, 5, 0.00001) }}
                      <TokenIcon
                        size="14px"
                        :payCurrencyType="tableItem.rewardTokenSymbol"
                        :inputTokenAddress="tableItem.rewardToken"
                      />
                    </div>
                  </td>
                  <td class="flexcen">
                    {{ bigNumFormat(tableItem.collectableAmount, 5, 0.00001) }}
                    <TokenIcon
                      size="14px"
                      :payCurrencyType="tableItem.rewardTokenSymbol"
                      :inputTokenAddress="tableItem.rewardToken"
                    />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </v-card>
      </div>
      <table-loading :is-loading="isLoading" :list="list" :isAll="true" />
    </div>
    <DialogLoading
      title="Loading"
      :isLoading="isDialogLoading"
      text="Your transcation is being processed, it should be cofirmed on the blockchain shortly."
    />
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import TokenIcon from '@/components/TokenIcon.vue'
import TableLoading from '@/components/TableLoading.vue'
import DialogLoading from '@/components/DialogLoading.vue'
import { ref, onMounted } from 'vue'
import {
  topupNft,
  topupBalanceReward,
  topupBalanceRewardDetail,
} from '@/api/user'
import { claimDaoPlanRewardForMultiNft } from '@/common/web3service'
import { bigNumFormat, truncateString } from '@/utils'
const isLoading = ref(true)
const list = ref<any>([])
const getItemDetail = async (item: any) => {
  const res = (await topupBalanceRewardDetail({
    projectId: item.projectId,
  })) as any
  item.topUpBalanceList = res.dataList
  item.isLoading = false
}
const getData = async () => {
  try {
    const res = (await topupBalanceReward()) as any
    list.value = res.dataList.map((item: any) => {
      return {
        ...item,
        isLoading: true,
        topUpBalanceList: [],
      }
    })
    isLoading.value = false
    for (let i = 0; i < list.value.length; i++) {
      await getItemDetail(list.value[i])
    }
  } catch (error) {
    console.log(error)
  }
}
const isDialogLoading = ref(false)
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
const collectItem = async (item: any) => {
  console.log(item, 'item')
  if (item.totalCollectable === 0)
    return notifyErr('No Collectable Reward.', true)
  isDialogLoading.value = true
  console.log(item, 'item')
  try {
    const nfts = (await topupNft({ projectId: item.projectId })) as any
    const nftIdentifierfts = nfts.dataList.map((item: any) => {
      return {
        erc721Address: item.erc721Token,
        tokenId: item.workNumber,
      }
    })
    console.log(nftIdentifierfts, 'nftIdentifierfts')
    const tx = await claimDaoPlanRewardForMultiNft({
      projectId: item.projectId,
      nfts: nftIdentifierfts,
    })
    const res = await tx.wait()
    notifySuc('Transury')
    if (res.status || res.logs.length > 0) {
      getData()
    }
    isDialogLoading.value = false
  } catch (error) {
    console.log(error, 'error')
    const err = JSON.stringify(error)
    notifyErr(err)
    isDialogLoading.value = false
  }
}
onMounted(() => {
  getData()
})
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
.card-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;

  margin-top: 84px;
  :deep(.v-card) {
    background-color: #252b3a !important;
    padding: 20px;
    box-sizing: border-box;
    margin-bottom: 24px;
    width: 100%;
  }
}
.card-top {
  display: flex;
  height: 68px;
  margin-bottom: 24px;
}
.t-img {
  width: 68px;
  height: 68px;
  background-color: #252b3a;
  margin-right: 24px;
  flex: 0 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.t-box {
  display: flex;
  flex: 1;
  h4 {
    color: #bbbaba;
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 4px;
    flex: 1;
    height: 32px;
    display: flex;
    align-items: flex-end;
  }
}
.card-bom {
  :deep(.v-table) {
    height: 212px;
  }
  .title-name {
    color: #b3b5f2;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }
  .table-title {
    font-size: 16px;
    color: #9e9e9e;
    width: 33.3%;
  }
  .flexbox {
    height: 152px;
    position: absolute;
    left: 0;
    right: 0;
  }
}
.pos_fix {
  top: 64px;
}
</style>
