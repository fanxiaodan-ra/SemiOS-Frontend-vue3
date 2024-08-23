<template>
  <v-form ref="formRef">
    <h4 class="ftr my-mgb24">
      {{ $t('AddFormNodesStrategies.builderLabel') }}
    </h4>
    <BuilderBlacklistAddress
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.workBlacklistAddress"
    />
    <BuilderWhitelistAddress
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.workWhitelistAddress"
    />
    <BuilderWhitelistedNft
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.workNftlistAddress"
    />
    <BuilderWhitelistERC721
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.workErclistAddress"
    />
  </v-form>
</template>

<script setup lang="ts">
import BuilderBlacklistAddress from './BuilderBlacklistAddress.vue'
import BuilderWhitelistAddress from './BuilderWhitelistAddress.vue'
import BuilderWhitelistERC721 from './BuilderWhitelistERC721.vue'
import BuilderWhitelistedNft from './BuilderWhitelistedNft.vue'
import { reactive, watch } from 'vue'
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Object,
    default: () => {},
  },
  formDataProp: {
    type: Object,
    default: () => {},
  },
})


const {
  workBlacklistAddress,
  workWhitelistAddress,
  workErclistAddress,
  workNftlistAddress,
} = props.formDataProp
const formData: any = reactive({
  workBlacklistAddress,
  workWhitelistAddress,
  workErclistAddress,
  workNftlistAddress,
})

watch(() => [
  props.formDataProp.workBlacklistAddress,
  props.formDataProp.workWhitelistAddress,
  props.formDataProp.workErclistAddress,
  props.formDataProp.workNftlistAddress,
], ([
  workBlacklistAddress,
  workWhitelistAddress,
  workErclistAddress,
  workNftlistAddress,
]) => {
  formData.workBlacklistAddress = workBlacklistAddress
  formData.workWhitelistAddress = workWhitelistAddress
  formData.workErclistAddress = workErclistAddress
  formData.workNftlistAddress = workNftlistAddress
})

const emit = defineEmits(['setFormData'])
const setFormData = (value: any[], type: string) => {
  formData[type] = [...value]
  emit('setFormData', formData)
}
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
.delete-ipput {
  cursor: pointer;
}
.no-def {
  :deep(.v-input--disabled) {
    pointer-events: all;
  }
}
</style>
