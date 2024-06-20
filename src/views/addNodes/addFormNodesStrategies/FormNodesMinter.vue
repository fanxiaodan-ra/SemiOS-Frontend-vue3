<template>
  <v-form ref="formRef">
    <h4 class="ftr my-mgb24">{{ $t('AddFormNodesStrategies.minterLabel') }}</h4>
    <MinterBlacklistAddress
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterWhitelistAddressWithMaxMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterWhitelistAddressWithUnlimitedMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterWhitelistedNFTWithMaxMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterWhitelistedNFTWithUnlimitedMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterWhitelistedERC721WithMaxMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterWhitelistERC721WithUnlimitedMinting
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <MinterUnifiedMintingCapForNode
      @set-form-data="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
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

import { reactive } from 'vue'
const props = defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  initData: {
    type: Object,
    default: () => {},
  },
})
const formData: any = reactive({
  mintingBlacklistAddress: [],
  mintingWithMaxlistAddress: [],
  mintingWithUnlimitedlistAddress: [],
  mintingErcWithMaxlistAddress: [],
  mintingErcWithUnlimitedlistAddress: [],
  mintingCapForDaolistAmount: [],
  mintingNftWithMaxlistAddress: [],
  mintingNftWithUnlimitedlistAddress: [],
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
