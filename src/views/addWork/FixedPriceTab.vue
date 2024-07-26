<template>
  <div class="tab-box">
    <h5>{{ t('fixedPriceTab.title') }}</h5>
    <v-row no-gutters>
      <v-col cols="6" class="text-font">{{ t('common.curPrice') }}</v-col>
      <v-col cols="6" class="font-felx flexend">
        <v-text-field
          :label="t('common.setPriceLabel')"
          variant="outlined"
          density="compact"
          v-model="fixedPrice"
          :rules="[
            (v:any) => !!v || t('common.required'),
            (v:any) => v >= 0.0001 || t('common.greaterThanZeroOne'),
          ]"
          type="number"
          @update:modelValue="
            setInput(fixedPrice, 4, 0.0001, 1000000000)
          "
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font">{{ t('common.floorPrice') }}</v-col>
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
      <v-col cols="6" class="text-font">{{ t('common.subNodesFee') }}</v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.fixedDaoReserveRatio.daoMintFee }}%
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font">{{ t('common.builderFee') }}</v-col>
      <v-col cols="6" class="text-font flexend">
        {{ props.dataObj.fixedDaoReserveRatio.canvasMintFee }}%
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" class="text-font">
        {{t('common.semiosFee')}}
      </v-col>
      <v-col cols="6" class="text-font flexend">
        <span class="old-fee">2.5 </span>
        {{ props.dataObj.fixedDaoReserveRatio.d4aMintFee }}%
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import TokenIcon from '@/components/TokenIcon.vue'
import { t } from '@/lang'
import { watch, ref } from 'vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const fixedPrice = ref(0)

import { oninputNum } from '@/utils'

const setInput = (
  val: string | number,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  fixedPrice.value = inputNum as number
}

const emit = defineEmits(['setFixedPrice'])
watch(
  () => fixedPrice.value,
  (val) => {
    emit('setFixedPrice', Number(val))
  },
  { immediate: true }
)

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
}
</style>
