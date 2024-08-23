<template>
  <ModeSelection
    :isModeSelection="isModeSelection"
    :daoName="daoName"
    :initData="initData"
    :from="from"
    @cancelDialog="() => emit('setIsModeSelection', false)"
    @setLoading="setLoading"
    @setAddType="setAddType"
    @show-suc-dialog="setShowSucDialog"
  />
  <DialogLoading :title="'Setup Nodes'" :isLoading="isDialogLoading" />
  <SucDialog v-model="showSucDialog" />
</template>
<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import { ref, computed } from 'vue'
import ModeSelection from './ModeSelection.vue'
import SucDialog from './components/SucDialog.vue'
import useUserStore from '@/store'
import useSetupDaoStore from '@/store/setupDao'

defineProps({
  isModeSelection: Boolean,
  daoName: String,
  from: String,
})
const emit = defineEmits(['setIsModeSelection'])

const store = useUserStore()
const setupDaoStore = useSetupDaoStore()

const initData = computed(() => setupDaoStore.initData)

const isDialogLoading = ref(false)
const setLoading = (val: boolean) => {
  isDialogLoading.value = val
}

const showSucDialog = ref(false)

const setAddType = (val: number) => {
  store.setNodeType(val)
}

const setShowSucDialog = (val: boolean) => {
  showSucDialog.value = val
}
</script>