<template>
  <v-form ref="formRef">
    <h4 class="ftr my-mgb24">
      {{ $t('AddFormNodesStrategies.builderLabel') }}
    </h4>
    <BuilderBlacklistAddress
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <BuilderWhitelistAddress
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <BuilderWhitelistedNft
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
    <BuilderWhitelistERC721
      @setFormData="setFormData"
      :isEdit="props.isEdit"
      :initData="props.initData"
    />
  </v-form>
</template>

<script setup lang="ts">
import BuilderBlacklistAddress from './BuilderBlacklistAddress.vue'
import BuilderWhitelistAddress from './BuilderWhitelistAddress.vue'
import BuilderWhitelistERC721 from './BuilderWhitelistERC721.vue'
import BuilderWhitelistedNft from './BuilderWhitelistedNft.vue'
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
  workBlacklistAddress: [],
  workWhitelistAddress: [],
  workErclistAddress: [],
  workNftlistAddress: [],
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
