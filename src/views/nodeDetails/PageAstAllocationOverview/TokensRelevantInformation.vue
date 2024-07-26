<template>
  <v-card class="node-card">
    <div class="card-title">
      <h3>ERC-20 Tokens Relevant Information</h3>
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
        {{ bigNumFormat(props.initData.currentDaoToken, 4) }}
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
import { transferPay, decimals } from '@/common/web3service'
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
  dataObj: {
    type: Object,
    default: () => {},
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
    const decimalsNum = await decimals(props.dataObj.erc20Address)
    const tx = await transferPay({
      to: props.initData.subDaoAssetPool,
      amount: new BigNumber(formData.value.amount)
        .times(`1e${decimalsNum}`)
        .toString(),
      contract: props.initData.subDaoErc20,
    })
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
    console.log(error, 'errorerrorerrorerror')
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
  margin: 0;
  height: 68px;
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
