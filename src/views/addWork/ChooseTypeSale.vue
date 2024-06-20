<template>
  <FormRow
    input-name="Choose a Type of Sale"
    :left-width="props.leftWidth"
    :importance="false"
    :isIcon="false"
  >
    <div class="type-box">
      <div class="tab-hedar">
        <v-tabs
          v-model="tab"
          color="deep-purple-accent-4"
          @update:modelValue="setTab"
        >
          <v-tab
            selected-class="custom-tabs"
            :value="1"
            class="text-none"
            v-if="props.dataObj.pethodType < 3"
            >Floating Price</v-tab
          >
          <v-tab
            selected-class="custom-tabs"
            :value="2"
            class="text-none"
            v-if="props.dataObj.pethodType < 3"
            >Fixed Price</v-tab
          >
          <v-tab
            selected-class="custom-tabs"
            :value="3"
            class="text-none"
            v-if="props.dataObj.pethodType === 3"
            >Unified Price</v-tab
          >
        </v-tabs>
      </div>

      <v-divider class="my-divider"></v-divider>
      <v-window v-model="tab" class="det-box">
        <v-window-item v-for="n in 3" :key="n" :value="n">
          <v-container fluid>
            <component
              ref="childRef"
              :is="currentCopmonent[tab - 1]"
              :data-obj="props.dataObj"
              @setFixedPrice="setFixedPrice"
            ></component>
          </v-container>
        </v-window-item>
      </v-window>
    </div>
  </FormRow>
</template>
<script lang="ts" setup>
import FormRow from '@/components/FormRow.vue'
import { ref, onMounted, shallowRef, defineAsyncComponent } from 'vue'
const FloatingPriceTab = defineAsyncComponent(
  () => import('./FloatingPriceTab.vue')
)
const FixedPriceTab = defineAsyncComponent(() => import('./FixedPriceTab.vue'))
const UnifiedPriceTab = defineAsyncComponent(
  () => import('./UnifiedPriceTab.vue')
)
const currentCopmonent = shallowRef([
  FloatingPriceTab,
  FixedPriceTab,
  UnifiedPriceTab,
])
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  leftWidth: {
    type: String,
    default: '140px',
  },
})

const emit = defineEmits(['setFixedPrice', 'setPethodType'])
const setFixedPrice = (...args: unknown[]) => {
  emit('setFixedPrice', args[0])
}

const tab = ref(1)
const setTab = () => {
  setFixedPrice(0)
  emit('setPethodType', tab.value)
}
const setUrlMsg = async () => {
  return
}
defineExpose({
  setUrlMsg,
})
onMounted(() => {
  tab.value = props.dataObj.pethodType
})
</script>

<style lang="scss" scoped>
.type-box {
  width: 100%;
  background-color: #282f41;
  border-radius: 4px;
  padding: 1px 16px 4px;
  margin-bottom: 16px;
}
.tab-hedar {
  // margin: 16px 0;
  height: 56px;
  :deep(.v-tabs) {
    height: 56px !important;
    .v-btn {
      height: 56px !important;
      font-size: 14px;
      color: #bbbaba;
      font-weight: 400 !important;
    }
  }
}
.det-box {
  height: 240px;
  :deep(.v-container) {
    padding: 0 !important;
  }
}
:deep(.v-btn) {
  margin: 0;
  flex: 1;
}
</style>
