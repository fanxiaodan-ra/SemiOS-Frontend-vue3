<template>
  <div class="wallet-box items-center">
    <div class="pos_fix min-w-[1225px]">
      <h2>Wallet</h2>
      <v-divider class="border-purple"></v-divider>
    </div>

    <Loading v-if="isLoading" style="margin-top: 86px" />
    <div v-else class="w-full posbox flex flex-1 flex-col !justify-center">
      <v-card class="my-pd24 my-mgt24 my-mgb24 bg-card-1 min-w-[1080px] max-w-[1200px] mx-auto" elevation="12">
        <v-row align="start" no-gutters class="lin38">
          <v-col class="my-flexaj fc9" :cols="4">
            <v-icon class="ft18 my-mgr12">mdi-wallet-outline</v-icon>
            Wallet</v-col>
          <v-col :cols="8" class="tea fc9">
            {{ props.userInfo.address }}
            <CopyInformation :address="props.userInfo.address" />
          </v-col>
        </v-row>
        <v-row align="start" no-gutters class="lin38">
          <v-col class="my-flexaj fc9">
            <v-icon class="ft18 my-mgr12">mdi-ethereum</v-icon>
            ETH</v-col>
          <v-col class="tea fc9"> {{ bigNumFormat(balance, 4) }} </v-col>
        </v-row>
      </v-card>
      <WalletTable />
    </div>
  </div>
</template>

<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import WalletTable from './WalletTable.vue'
import CopyInformation from '@/components/CopyInformation.vue'
import { getBalance } from '@/common/web3service'
import { bigNumFormat } from '@/utils'
import { ref, onMounted } from 'vue'

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {},
  },
})

const isLoading = ref(false)
const balance = ref(0)

const getData = async () => {
  isLoading.value = true
  try {
    balance.value = await getBalance()
  } catch(e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
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
</style>
