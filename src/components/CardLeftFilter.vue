<template>
  <v-navigation-drawer v-model="drawer" temporary class="nav-box">
    <div class="n-top" :style="{ height: props.noTopHeight }"></div>
    <v-list-item class="nav-top">
      <div class="flex justify-between items-center">
        <p class="text-base font-bold text-white">Filter criteria</p>
        <i class="iconfont icon-guanbi !text-xs" @click="setDrawer"></i>
      </div>
    </v-list-item>
    <v-divider class="border-purple"></v-divider>
    <h4>{{ $t('CardLeftFilter.priceRangeLabel') }}</h4>
    <v-list-item class="nav-price">
      <v-text-field
        type="number"
        label="Min"
        width="224"
        density="comfortable"
        v-model="formData.minPrice"
        @update:modelValue="
          setInput(formData.minPrice, 'minPrice', 5, 0, 999999999)
        ">
      </v-text-field>
    </v-list-item>
    <v-list-item class="nav-price">
      <v-text-field
        type="number"
        label="Max"
        density="comfortable"
        v-model="formData.maxPrice"
        @update:modelValue="
          setInput(
            formData.maxPrice,
            'maxPrice',
            5,
            0,
            999999999
          )
        ">
      </v-text-field>
    </v-list-item>
    <p v-show="rangeError" class="text-error text-xs px-4 -mt-4">
      {{ $t('CardLeftFilter.priceError') }}
    </p>
    <h4>{{ $t('CardLeftFilter.typeSaleLabel') }}</h4>
    <v-list-item class="nav-type">
      <v-radio-group v-model="formData.fixedPrice" inline>
        <v-radio v-for="item in fixedPriceList" :key="item.label" :label="item.label" :value="item.value"
          color="#8C91FF">
        </v-radio>
      </v-radio-group>
    </v-list-item>
    <v-list-item>
      <v-btn block class="btnz text-none my-mgt16" type="submit" @click="apply">{{ $t('CardLeftFilter.applyBtn')
        }}</v-btn>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
const props = defineProps({
  noTopHeight: {
    type: String,
    default: '164px',
  },
})
const fixedPriceList = [
  {
    label: 'All',
    value: 2,
  },
  {
    label: 'Floating Price',
    value: 0,
  },
  {
    label: 'Fixed Price',
    value: 1,
  },
]
const formData = reactive({
  maxPrice: 9999,
  minPrice: 0,
  fixedPrice: 2,
})
import { oninputNum } from '@/utils'

const rangeError = computed(() => {
  const minPrice = Number(formData.minPrice)
  const maxPrice = Number(formData.maxPrice)
  return minPrice >= maxPrice
})

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

const emit = defineEmits(['getConditions'])
const apply = () => {
  if (formData.minPrice >= formData.maxPrice) {
    return
  }
  emit('getConditions', formData)
}
const drawer = ref(false)
const setDrawer = () => {
  drawer.value = !drawer.value
}

defineExpose({
  setDrawer,
})
</script>
<style lang="scss" scoped>
.nav-box {
  background-color: #151925;

  h4 {
    padding: 0 16px;
    color: #bbbaba;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 22px;
  }
}

.nav-top {
  i {
    cursor: pointer;
  }
}

.icon-body {
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b3b5f2;
  width: 63px;
  height: 40px;
  // background-color: #151925;
}

.v-navigation-drawer {
  position: fixed !important;
  z-index: 2;
  background: #151925;
}

.v-layout {
  z-index: 2 !important;
}
</style>
