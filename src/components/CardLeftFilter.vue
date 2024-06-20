<template>
  <v-navigation-drawer v-model="drawer" temporary class="nav-box">
    <div class="n-top" :style="{ height: props.noTopHeight }"></div>
    <v-list-item class="nav-top">
      <div class="icon-body">
        <v-btn @click="setDrawer" size="40">
          <i class="iconfont icon-tianjia ft24" @click.stop="setDrawer" />
        </v-btn>
      </div>
    </v-list-item>
    <v-divider></v-divider>
    <h4>{{ $t('CardLeftFilter.priceRangeLabel') }}</h4>
    <v-list-item class="nav-price">
      <v-text-field
        label="Min"
        density="comfortable"
        v-model="formData.minPrice"
        @update:modelValue="
          setInput(formData.minPrice, 'minPrice', 5, 0, 999999999)
        "
      >
      </v-text-field>
    </v-list-item>
    <v-list-item class="nav-price">
      <v-text-field
        label="Max"
        density="comfortable"
        v-model="formData.maxPrice"
        @update:modelValue="
          setInput(
            formData.maxPrice,
            'maxPrice',
            5,
            formData.minPrice,
            999999999
          )
        "
      >
      </v-text-field>
    </v-list-item>
    <v-divider></v-divider>
    <h4>{{ $t('CardLeftFilter.typeSaleLabel') }}</h4>
    <v-list-item class="nav-type">
      <v-radio-group v-model="formData.sortCondition" inline>
        <v-radio
          v-for="item in sortConditionList"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          color="#745cd4"
        >
        </v-radio>
      </v-radio-group>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-btn
        block
        class="btnz text-none my-mgt16"
        type="submit"
        @click="apply"
        >{{ $t('CardLeftFilter.applyBtn') }}</v-btn
      >
    </v-list-item>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const props = defineProps({
  noTopHeight: {
    type: String,
    default: '114px',
  },
})
const sortConditionList = [
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
  sortCondition: 2,
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

const emit = defineEmits(['getConditions'])
const apply = () => {
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
  background-color: #1b2233;

  h4 {
    padding: 0 16px;
    color: #bbbaba;
    font-size: 14px;
    margin-top: 24px;
    margin-bottom: 22px;
  }
}

.nav-top {
  height: 96px;

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
  // background-color: #1b2233;
}

.v-navigation-drawer {
  position: fixed !important;
  z-index: 2;
  background: #1b2233;
}

.v-layout {
  z-index: 2 !important;
}
</style>
