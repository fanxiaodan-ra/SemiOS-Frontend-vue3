<template>
  <AddNodeName
    @setDaoName="setDaoName"
    @setIsModeSelection="setIsModeSelection"
    v-if="store.addNodeType === 0"
  />
  <AddNodeFrom
    @setAddType="setAddType"
    :initData="initData"
    :daoName="daoName"
    v-if="store.addNodeType !== 0"
  />
  <ModeSelection
    :isModeSelection="isModeSelection"
    :daoName="daoName"
    :initData="initData"
    @cancelDialog="setIsModeSelection"
    @setLoading="setLoading"
    @setAddType="setAddType"
    @show-suc-dialog="setShowSucDialog"
  />
  <DialogLoading :title="'Setup Nodes'" :isLoading="isDialogLoading" />
  <SucDialog v-model="showSucDialog" />

</template>
<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import { maincreator } from '@/api/daos'
import { ref, onMounted } from 'vue'
import ModeSelection from './ModeSelection.vue'
import AddNodeName from './AddNodeName.vue'
import AddNodeFrom from './AddNodeFrom.vue'
import SucDialog from './components/SucDialog.vue'
import useUserStore from '@/store'
import { useRoute } from 'vue-router'

const store = useUserStore()
const isDialogLoading = ref(false)
const setLoading = (val: boolean) => {
  isDialogLoading.value = val
}
const route = useRoute()

const daoName = ref('')
const showSucDialog = ref(false)
const setDaoName = (val: string) => {
  daoName.value = val
}

const isModeSelection = ref(false)

const setIsModeSelection = (val: boolean) => {
  isModeSelection.value = val
}
const initData = ref<any>({})
const getInitData = async () => {
  const res = await maincreator({ daoId: route.query.id })
  initData.value = res.data
}

const setAddType = (val: number) => {
  store.setNodeType(val)
}

const setShowSucDialog = (val: boolean) => {
  showSucDialog.value = val
}

onMounted(() => {
  store.setNodeType(0)
  if (route.query.id) {
    getInitData()
  }
})
</script>
<style lang="scss" scoped></style>
