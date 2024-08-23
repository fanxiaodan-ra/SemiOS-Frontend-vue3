<template>
  <v-form ref="formRef">
    <h4 class="ftr my-mgb24">{{ $t('AddFormNodesStrategies.minterLabel') }}</h4>
    <MinterBlacklistAddress
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingBlacklistAddress"
    />
    <MinterWhitelistAddressWithMaxMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingWithMaxlistAddress"
    />
    <MinterWhitelistAddressWithUnlimitedMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingWithUnlimitedlistAddress"
    />
    <MinterWhitelistedNFTWithMaxMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingNftWithMaxlistAddress"
    />
    <MinterWhitelistedNFTWithUnlimitedMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingNftWithUnlimitedlistAddress"
    />
    <MinterWhitelistedERC721WithMaxMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingErcWithMaxlistAddress"
    />
    <MinterWhitelistERC721WithUnlimitedMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingErcWithUnlimitedlistAddress"
    />
    <MinterUnifiedMintingCapForNode
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
      :list="formData.mintingCapForDaolistAmount"
    />
  </v-form>
</template>

<script setup lang="ts">
import MinterBlacklistAddress from './MinterBlacklistAddress.vue'
import MinterWhitelistAddressWithMaxMinting from './MinterWhitelistAddressWithMaxMinting.vue'
import MinterWhitelistAddressWithUnlimitedMinting from './MinterWhitelistAddressWithUnlimitedMinting.vue'
import MinterWhitelistedERC721WithMaxMinting from './MinterWhitelistedERC721WithMaxMinting.vue'
import MinterWhitelistERC721WithUnlimitedMinting from './MinterWhitelistERC721WithUnlimitedMinting.vue'
import MinterUnifiedMintingCapForNode from './MinterUnifiedMintingCapForNode.vue'
import MinterWhitelistedNFTWithMaxMinting from './MinterWhitelistedNFTWithMaxMinting.vue'
import MinterWhitelistedNFTWithUnlimitedMinting from './MinterWhitelistedNFTWithUnlimitedMinting.vue'

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
  mintingBlacklistAddress = [],
  mintingWithMaxlistAddress = [],
  mintingWithUnlimitedlistAddress = [],
  mintingErcWithMaxlistAddress = [],
  mintingErcWithUnlimitedlistAddress = [],
  mintingCapForDaolistAmount = [],
  mintingNftWithMaxlistAddress = [],
  mintingNftWithUnlimitedlistAddress = [],
} = props.formDataProp

const formData: any = reactive({
  mintingBlacklistAddress,
  mintingWithMaxlistAddress,
  mintingWithUnlimitedlistAddress,
  mintingErcWithMaxlistAddress,
  mintingErcWithUnlimitedlistAddress,
  mintingCapForDaolistAmount,
  mintingNftWithMaxlistAddress,
  mintingNftWithUnlimitedlistAddress,
})

watch(() => [
  props.formDataProp.mintingBlacklistAddress,
  props.formDataProp.mintingWithMaxlistAddress,
  props.formDataProp.mintingWithUnlimitedlistAddress,
  props.formDataProp.mintingErcWithMaxlistAddress,
  props.formDataProp.mintingErcWithUnlimitedlistAddress,
  props.formDataProp.mintingCapForDaolistAmount,
  props.formDataProp.mintingNftWithMaxlistAddress,
  props.formDataProp.mintingNftWithUnlimitedlistAddress,
], ([
  mintingBlacklistAddress,
  mintingWithMaxlistAddress,
  mintingWithUnlimitedlistAddress,
  mintingErcWithMaxlistAddress,
  mintingErcWithUnlimitedlistAddress,
  mintingCapForDaolistAmount,
  mintingNftWithMaxlistAddress,
  mintingNftWithUnlimitedlistAddress,
]) => {
  formData.mintingBlacklistAddress = mintingBlacklistAddress
  formData.mintingWithMaxlistAddress = mintingWithMaxlistAddress
  formData.mintingWithUnlimitedlistAddress = mintingWithUnlimitedlistAddress
  formData.mintingErcWithMaxlistAddress = mintingErcWithMaxlistAddress
  formData.mintingErcWithUnlimitedlistAddress = mintingErcWithUnlimitedlistAddress
  formData.mintingCapForDaolistAmount = mintingCapForDaolistAmount
  formData.mintingNftWithMaxlistAddress = mintingNftWithMaxlistAddress
  formData.mintingNftWithUnlimitedlistAddress = mintingNftWithUnlimitedlistAddress
}, { deep: true })

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
