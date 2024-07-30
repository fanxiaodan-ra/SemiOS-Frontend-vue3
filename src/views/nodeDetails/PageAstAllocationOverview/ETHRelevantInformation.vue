<template>
  <v-card class="node-card">
    <div class="card-title">
      <h3>Price range of NFTs</h3>
    </div>
    <div v-if="props.isLoading" class="card-loading">
      <v-skeleton-loader
        elevation="12"
        height="100%"
        type="chip,button,text"
      ></v-skeleton-loader>
    </div>
    <div v-else>
      <div class="card-box">
        <v-form ref="formRef">
          <v-text-field
            label="Please"
            variant="outlined"
            density="compact"
            v-model="formData.amount"
            type="number"
            @update:modelValue="
              setInput(formData.amount, 'amount', 4, 0, 1000000000)
            "
            :rules="valueRules"
          >
          </v-text-field>
        </v-form>
        <v-btn block class="btnz text-none" type="submit" @click="pay"
          >Pay</v-btn
        >
      </div>
      <div class="card-text">
        Current ERC-20 Tokens on SubNodes asset pool :
        {{ bigNumFormat(props.initData.currentDaoEth, 4) }}
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
import { bigNumFormat } from '@/utils'
import { transactionEth, transactionERC20 } from '@/common/web3service'
import useAccount from '@/hooks/useAccount';
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
const { getTrading } = useAccount()
const formData = ref({}) as any
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
  formData[type] = inputNum as never
}

import { BigNumber } from 'bignumber.js'
const formRef = ref()
const isDialogLoading = ref(false)
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
const pay = async () => {
  const isTrad = await getTrading()
  if (!isTrad) return
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  isDialogLoading.value = true
  BigNumber.config({ EXPONENTIAL_AT: 38 })
  try {
    let tx = null
    if (props.initData.payCurrencyType === 'ETH') {
      tx = await transactionEth(
        props.initData.subDaoAssetPool,
        formData.value.amount
      )
    } else {
      const amount = new BigNumber(formData.value.amount)
        .times(`1e${props.initData.inputTokenDecimals}`)
        .toString()
      tx = await transactionERC20(
        props.initData.inputTokenAddress,
        props.initData.subDaoAssetPool,
        amount
      )
    }
    await tx.wait()
    notifySuc(
      "Your contribution to the DAO's asset pool has been received and recorded.",
      true
    )
    isDialogLoading.value = false
  } catch (error) {
    const err = JSON.stringify(error)
    notifyErr(err)
    isDialogLoading.value = false
  }
}
</script>

<style scoped lang="scss">
.node-card {
  background-color: #1A1F2E !important;
  padding: 0 !important;
  margin: 8px;
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
  display: flex;
  padding: 0 24px;
  :deep(.v-btn--block) {
    min-width: auto;
    margin-left: 24px;
    height: 40px;
  }
}
.card-text {
  color: #9e9e9e;
  font-size: 14px;
  padding: 0 24px;
  line-height: 44px;
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
