<template>
  <SlotDialog
      :title="t('setupDaoSuc.title')"
      :isDialog="newValue"
      @cancelDialog="cancelDialog"
      width="544px"
    >
      <div class="flex justify-center flex-col px-12 pt-8">
        <v-img
          :src="nft0Info.imgUrl"
          :height="400"
          :width="448"
          :style="{
            background: nft0Info.bgColor,
          }"
          class="rounded-[2px] mb-6"
        ></v-img>
      <p class="text-sm text-white mb-10">
        {{ t('setupDaoSuc.desc') }}
      </p>
      <div class="flex w-full justify-center mb-12">
        <v-btn
          class="text-none btnb w-1/2"
          type="submit"
          size="large"
          @click="goNodeDetail"
          >{{ t('setupDaoSuc.nodeDetail') }}</v-btn
        >
        <v-btn
          class="btnz text-none w-1/2"
          type="submit"
          size="large"
          @click="goNftDetail"
          >{{ t('setupDaoSuc.nftDetail') }}</v-btn
        >
      </div>
      </div>
      
    </SlotDialog>
</template>
<script setup lang="ts">
import SlotDialog from '@/components/SlotDialog.vue'
import { t } from '@/lang'
import { defineProps, computed, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import useSetupDaoStore from '@/store/setupDao'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const router = useRouter()
const setupDaoStore = useSetupDaoStore()
const emit = defineEmits(['update:modelValue'])

const nft0Info = computed(() => setupDaoStore.nft0Info)

const newValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})
const cancelDialog = () => {
  emit('update:modelValue', false)
}
const goNftDetail = () => {
  emit('update:modelValue', false)
  router.push({
    name: 'workDetails',
    query: {
      id: setupDaoStore.workId
    }
  })
}
const goNodeDetail = () => {
  emit('update:modelValue', false)
  router.push({
    name: 'nodeDetails',
    query: {
      id: setupDaoStore.daoId
    }
  })
}
defineExpose({
  newValue,
  cancelDialog,
  goNftDetail,
  goNodeDetail
})
</script>