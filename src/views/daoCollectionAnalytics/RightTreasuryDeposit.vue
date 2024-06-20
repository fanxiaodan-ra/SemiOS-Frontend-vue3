<template>
  <v-card class="node-card">
    <div class="card-title">
      <h3>Treasury Deposit</h3>
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
          <FormRow input-name="Amount" leftWidth="160px" :isIcon="false">
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
</template>

<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import FormRow from '@/components/FormRow.vue'
import {
  decimals,
  getAllowanceTreasury,
  approveAmount,
  grantTreasury,
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
const pay = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  isDialogLoading.value = true
  BigNumber.config({ EXPONENTIAL_AT: 38 })
  try {
    const decimalsNum = await decimals(props.initData.erc20Address)
    const amount = new BigNumber(formData.value.amount)
      .times(`1e${decimalsNum}`)
      .toNumber()
    const allowance = await getAllowanceTreasury(
      props.initData.erc20Address,
      store.UserInfo.address
    )
    if (new BigNumber(amount).gt(allowance)) {
      setApprove(amount)
      return
    }
    const req = {
      daoId: props.initData.projectId,
      amount: amount,
      tokenUri: 'grant treasury nft',
      address: props.initData.erc20Address,
    }
    const tx = await grantTreasury(req)
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
    margin: 0 auto;
    height: 40px;
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
</style>
