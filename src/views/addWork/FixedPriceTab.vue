<template>
  <div class="tab-box">
    <h5>Work is listed for sale at the price you set.</h5>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Current Price </v-col>
      <v-col cols="6" class="font-felx flexend">
        <v-text-field
          label="Please set a price"
          variant="outlined"
          density="compact"
          v-model="formData.fixedPrice"
          @update:modelValue="
            setInput(formData.fixedPrice, 'fixedPrice', 4, 0, 1000000000)
          "
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Floor Price </v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.daoFloorPrice }}
        <TokenIcon
          size="14px"
          mgl="6px"
          :daoToken="props.dataObj.erc20PaymentMode"
          :daoSymbol="props.dataObj.daoSymbol"
          :daoErc20Address="props.dataObj.daoErc20Address"
          :payCurrencyType="props.dataObj.payCurrencyType"
          :inputTokenAddress="props.dataObj.inputTokenAddress"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Sub Nodes Fee </v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.fixedDaoReserveRatio.daoMintFee }}%
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Builder Fee </v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.fixedDaoReserveRatio.canvasMintFee }}%
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font"> Semios Fee </v-col>
      <v-col cols="6" class="text-font flexend">
        <span class="old-fee">2.5 </span>
        {{ props.dataObj.fixedDaoReserveRatio.d4aMintFee }}%
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import TokenIcon from '@/components/TokenIcon.vue'
import { reactive, onMounted, watch } from 'vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const formData = reactive({
  fixedPrice: 0,
})
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

const emit = defineEmits(['setFixedPrice'])
watch(
  () => formData.fixedPrice,
  (val) => {
    // isLoading.value = cur;
    emit('setFixedPrice', val)
  },
  { immediate: true }
)
onMounted(() => {
  // emit('setFixedPrice', formData.fixedPrice)
})
</script>

<style lang="scss" scoped>
.tab-box {
  padding: 16px;
  height: 240px;
  display: flex;
  flex-direction: column;
  h5 {
    font-weight: 400;
    font-size: 14px;
    color: #9e9e9e;
    line-height: 32px;
    margin-bottom: 16px;
  }
  .text-font {
    font-weight: 400;
    font-size: 14px;
    color: #9e9e9e;
    display: flex;
    align-items: center;
  }
  .font-felx {
    display: flex;
    align-items: center;
  }
  .flexend {
    justify-content: flex-end;
  }
  :deep(.v-input__details) {
    display: none;
  }
}
</style>
