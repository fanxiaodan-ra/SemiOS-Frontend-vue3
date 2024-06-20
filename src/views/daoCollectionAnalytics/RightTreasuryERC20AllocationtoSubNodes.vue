<template>
  <v-card class="node-card">
    <div class="card-title">
      <h3>ERC-20 Allocation to SubNodes</h3>
    </div>
    <div v-if="props.isLoading" class="card-loading">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="chip,button"
      ></v-skeleton-loader>
    </div>
    <div v-else>
      <div class="card-box">
        <v-form ref="formRef">
          <FormRow input-name="Select Nodes" leftWidth="160px" :isIcon="false">
            <v-select
              v-model="formData.projectId"
              label="Select"
              :items="props.treasuryDataList"
              item-title="daoName"
              item-value="projectId"
              :rules="valueRules"
            ></v-select>
          </FormRow>
          <FormRow
            input-name="ERC-20 Allocation"
            leftWidth="160px"
            :isIcon="false"
          >
            <v-text-field
              label="Please"
              variant="outlined"
              density="comfortable"
              v-model="formData.amount"
              @update:modelValue="
                setInput(formData.amount, 'amount', 4, 0, 1000000000)
              "
              :rules="valueRules"
            >
            </v-text-field>
          </FormRow>
        </v-form>

        <v-btn block class="btnz text-none" type="submit" @click="pay"
          >Pay</v-btn
        >
      </div>
    </div>
    <DialogLoading
      title="Loading"
      :isLoading="isDialogLoading"
      text="Your transcation is being processed, it should be cofirmed on the blockchain shortly."
    />
  </v-card>
  <SlotDialog
    title="Source of Allocation"
    :isDialog="isAllocationDialog"
    @cancelDialog="cancelDialog"
  >
    <p class="dip">How do you want to allocate ERC-20 for this Nodes?</p>
    <v-btn
      block
      class="btnz text-none"
      type="submit"
      @click="setUserTreasury(true)"
      >Treasury</v-btn
    >
    <v-btn
      block
      class="btnb text-none my-mgb16 my-mgt16"
      type="submit"
      @click="setUserTreasury(false)"
      >My Wallet</v-btn
    >
  </SlotDialog>
</template>

<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import SlotDialog from '@/components/SlotDialog.vue'
import FormRow from '@/components/FormRow.vue'
import {
  decimals,
  getAllowanceTreasury,
  approveAmount,
  grantDaoAssetPool,
} from '@/common/web3service'
const props = defineProps({
  initData: {
    type: Object,
    default: () => {},
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
  treasuryDataList: {
    type: Array,
    default: () => [],
  },
})
import { ref } from 'vue'
const formData = ref({ amount: null }) as any
const valueRules = [(v: any) => !!v || 'Field is required']
import { oninputNum } from '@/utils'
const setInput = (
  val: string | number,
  type: keyof typeof formData,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  formData.value[type] = inputNum as never
}

import { BigNumber } from 'bignumber.js'
const formRef = ref()
const isDialogLoading = ref(false)
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()

const setApprove = async (amount: number) => {
  try {
    isDialogLoading.value = true
    const app = await approveAmount(props.initData.erc20Address, amount)
    await app.wait()
    notifySuc('Successful transaction', true)
    isDialogLoading.value = false
  } catch (error) {
    notifyErr(JSON.stringify(error))
    isDialogLoading.value = false
  }
}
import useUserStore from '@/store'
const store = useUserStore()
const isAllocationDialog = ref(false)
const cancelDialog = () => {
  isAllocationDialog.value = false
}
const pay = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  if (
    store.UserInfo.address.toLowerCase() ===
    props.initData.ownerAddress.toLowerCase()
  ) {
    isAllocationDialog.value = true
  } else {
    setGrantDaoAssetPool(false)
  }
}
const setUserTreasury = async (type = false) => {
  isAllocationDialog.value = false
  setGrantDaoAssetPool(type)
}
const setGrantDaoAssetPool = async (type = false) => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  isDialogLoading.value = true
  try {
    BigNumber.config({ EXPONENTIAL_AT: 38 })
    const decimalsNum = await decimals(props.initData.erc20Address)
    const amount = new BigNumber(formData.value.amount)
      .times(`1e${decimalsNum}`)
      .toNumber()
    if (!type) {
      const allowance = await getAllowanceTreasury(
        props.initData.erc20Address,
        store.UserInfo.address
      )
      if (new BigNumber(amount).gt(allowance)) {
        setApprove(amount)
        return
      }
    }
    const req = {
      daoId: formData.value.projectId,
      amount: amount,
      useTreasury: type,
      tokenUri: 'grant treasury nft',
      address: props.initData.erc20Address,
    }
    console.log(req, 'req')
    const tx = await grantDaoAssetPool(req)
    await tx.wait()
    notifySuc('Transury')
    isDialogLoading.value = false
  } catch (error) {
    const err = JSON.stringify(error)
    notifyErr(err)
    isDialogLoading.value = false
    console.log(error, 'errorerrorerrorerror')
  }
}
</script>

<style scoped lang="scss">
.node-card {
  background-color: #252b3a !important;
  padding: 0 !important;
  margin: 0px;
  margin-bottom: 24px;
}
.card-title {
  display: flex;
  margin: 24px 0;
  padding-left: 24px;

  h3 {
    color: #bbbaba;
    font-family: Inter;
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
}
.card-box {
  // display: flex;
  padding: 0 24px;
  :deep(.v-btn--block) {
    min-width: auto;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 24px;
  }
}
.card-loading {
  :deep(.v-skeleton-loader__chip) {
    max-width: 80%;
    margin-top: 10px;
    height: 42px;
  }
  :deep(.v-skeleton-loader__text) {
    width: 80%;
    margin: 16px;
  }
  :deep(.v-skeleton-loader__button) {
    margin-top: 10px;
    height: 42px;
  }
  :deep(.v-skeleton-loader) {
    background-color: transparent;
    box-shadow: none !important;
  }
}
.dip {
  margin: 24px 0;
  text-align: center;
}
</style>
