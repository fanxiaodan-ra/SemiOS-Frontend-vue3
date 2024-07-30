<template>
  <div class="card-box">
    <div v-if="!isLoading" class="flex flex-col justify-center">
      <v-card
        class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24 bg-card-1 min-w-[1080px] max-w-[1200px]"
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
              <v-btn block class="btnz text-none" @click="updataBalance(item)">
                Updata Balance
              </v-btn>
            </div>
          </div>
        </div>
        <div class="card-cen">
          <v-row align="start" no-gutters class="cen-num">
            <v-col class="flexcen">
              {{ bigNumFormat(item.ethBalance, 5, 0.00001) }}
              <TokenIcon
                :payCurrencyType="item.payCurrencyType"
                :inputTokenAddress="item.inputTokenAddress"
              />
            </v-col>
            <v-col class="flexcen">
              {{ bigNumFormat(item.tokenBalance, 5, 0.00001) }}
              <TokenIcon
                :daoToken="true"
                :daoSymbol="item.daoSymbol"
                :daoErc20Address="item.daoErc20Address"
              />
            </v-col>
          </v-row>
          <v-row align="start" no-gutters class="cen-name">
            <v-col>Total ETH Balance (Off-Chain)</v-col>
            <v-col> Total Locked ERC-20 Tokens (Off-Chain) </v-col>
          </v-row>
          <v-row align="start" no-gutters class="cen-num">
            <v-col class="flexcen">
              {{ bigNumFormat(item.onChainEthBalance, 5, 0.00001) }}
              <TokenIcon
                :payCurrencyType="item.payCurrencyType"
                :inputTokenAddress="item.inputTokenAddress"
              />
            </v-col>
            <v-col class="flexcen">
              {{ bigNumFormat(item.onChainTokenBalance, 5, 0.00001) }}
              <TokenIcon
                :daoToken="true"
                :daoSymbol="item.daoSymbol"
                :daoErc20Address="item.daoErc20Address"
              />
            </v-col>
          </v-row>
          <v-row align="start" no-gutters class="cen-name">
            <v-col>Total ETH Balance (On-Chain)</v-col>
            <v-col> Total Locked ERC-20 Tokens (On-Chain) </v-col>
          </v-row>
        </div>
        <div class="waring-text">
          <!-- <i class="el-icon-warning-outline"></i> -->
          <v-icon>mdi-alert-circle-outline</v-icon>
          {{
            item.isUpdateBalance
              ? `Your On-chain and off-chain record are not synchronize, please update your balance to smart contract.`
              : `Your on-chain and off-chain record are now synchronized.`
          }}
        </div>
        <div class="card-bom">
          <v-table max-height="212px" fixed-header>
            <thead>
              <tr>
                <th class="table-title">NFT</th>
                <th class="table-title">ETH Balance</th>
                <th class="table-title">Locked ERC-20 Tokens</th>
              </tr>
            </thead>
            <Loading v-if="item.isLoading" />
            <tbody v-else>
              <tr
                v-for="tableItem in (item.topUpBalanceList as any)"
                :key="tableItem.name"
              >
                <td>
                  <router-link
                    :to="`/workDetails?id=${tableItem.workId}`"
                    class="a-style"
                  >
                    <v-btn
                      class="text-none title-name"
                      variant="text"
                      size="small"
                    >
                      <v-tooltip activator="parent" location="top">
                        {{ tableItem.workName }}
                        <span>{{ tableItem.daoName }}</span
                        >.{{ tableItem.workNumber }} </v-tooltip
                      >{{ truncateString(tableItem.workName) }}
                      <span>{{ tableItem.daoName }}</span
                      >.{{ tableItem.workNumber }}
                      <span v-if="tableItem.workLockStatus === 1">
                        <i class="iconfont fcb ft14 icon-lock"></i>
                      </span>
                    </v-btn>
                  </router-link>
                </td>
                <td>
                  <div class="flexcen">
                    {{ bigNumFormat(tableItem.ethBalance, 5, 0.00001) }}
                    <TokenIcon
                      size="14px"
                      :payCurrencyType="item.payCurrencyType"
                      :inputTokenAddress="item.inputTokenAddress"
                    />
                  </div>
                </td>
                <td class="flexcen">
                  {{ bigNumFormat(tableItem.tokenBalance, 5, 0.000001) }}
                  <TokenIcon
                    size="14px"
                    :daoToken="true"
                    :daoSymbol="tableItem.daoSymbol"
                    :daoErc20Address="tableItem.daoErc20Address"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </v-card>
    </div>
    <table-loading :is-loading="isLoading" :list="list" :isAll="true" />
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
import { userTopupBalance, userTopupBalanceDetails, topupNft } from '@/api/user'
import { updateMultiTopUpAccount } from '@/common/web3service'
import { bigNumFormat, truncateString } from '@/utils'
const isLoading = ref(true)
const list = ref<any>([])
const getItemDetail = async (item: any) => {
  const res = (await userTopupBalanceDetails({
    daoId: item.daoId,
  })) as any
  item.topUpBalanceList = res.dataList
  item.isLoading = false
}
const getData = async () => {
  try {
    const res = (await userTopupBalance()) as any
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
    console.error(error)
  }
}
const isDialogLoading = ref(false)
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
const updataBalance = async (item: any) => {
  if (!item.isUpdateBalance)
    return notifyErr(
      'Your on-chain and off-chain record are synchronized.',
      true
    )
  isDialogLoading.value = true
  try {
    const nfts = (await topupNft({ projectId: item.projectId })) as any
    const nftIdentifierfts = nfts.dataList.map((item: any) => {
      return {
        erc721Address: item.erc721Token,
        tokenId: item.workNumber,
      }
    })
    const tx = await updateMultiTopUpAccount({
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
    console.error(error, 'error')
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
.card-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  :deep(.v-card) {
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
  background-color: #1a1f2e;
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
.card-cen {
  margin-bottom: 24px;
  .cen-num {
    color: #fff;
    font-size: 16px;
  }
  .cen-name {
    color: #9e9e9e;
    font-size: 14px;
    margin-bottom: 12px;
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
.waring-text {
  background-color: rgba(140, 145, 255, 0.1);
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #9e9e9e;
  border: 1px solid #3e4072;
  margin-bottom: 24px;
  i {
    color: #8c91ff;
    font-size: 14px;
    margin: 0 12px;
  }
}
.pos_fix {
  margin-top: 64px;
}
</style>
