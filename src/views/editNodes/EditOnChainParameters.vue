<template>
  <div class="wh100">
    <h2 class="h2-title">Edit On-Chain Parameters</h2>
    <v-divider class="my-divider"></v-divider>
    <loading v-if="isLoading" />
    <div v-else>
      <EditOnChainNodesBlock
        :initData="initData"
        @setFormData="setFormData"
        ref="nodesBlockRef"
      />
      <EditOnChainNodesWork
        :initData="initData"
        @setFormData="setFormData"
        ref="nodesWorkRef"
      />
      <EditOnChainTokenomics
        :initData="initData"
        @setFormData="setFormData"
        ref="nodesTokenomicsRef"
      />
      <div class="dflex flex-jc my-mgb24 my-mgt24">
        <v-btn
          block
          class="btnb fc7 text-none mr-10"
          type="submit"
          @click="goNode"
          >Back</v-btn
        >
        <v-btn block class="btnz text-none" type="submit" @click="setEditForm"
          >Submit</v-btn
        >
      </div>
    </div>
  </div>
  <DialogLoading
    :title="'Edit'"
    :isLoading="isDialogLoading"
    text="Please continue in the wallet..."
  />
</template>

<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import EditOnChainNodesBlock from './EditOnChainNodesBlock.vue'
import EditOnChainNodesWork from './EditOnChainNodesWork.vue'
import EditOnChainTokenomics from './EditOnChainTokenomics.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { distribute } from '@/api/daos'

const route = useRoute()

const formData = ref()
const initData = ref()
const isLoading = ref(true)
const getData = async () => {
  const res = await distribute({ daoId: route.query.id })
  const decimalsNum = res.data.daoTokenMode
    ? `1e${res.data.erc20TokenDecimals}`
    : `1e${res.data.inputTokenDecimals}`
  initData.value = {
    ...res.data,
    decimalsNum: decimalsNum,
    thirdParty: res.data.isThirdpartyToken,
  }

  // formData.value = data.data
  isLoading.value = false
}
const nodesBlockRef = ref()
const nodesWorkRef = ref()
const nodesTokenomicsRef = ref()
const isDialogLoading = ref(false)
import useAddNodes from '@/hooks/useAddNodes'
const { editNodeChain } = useAddNodes()
const setEditForm = async () => {
  const isBlock = await nodesBlockRef.value.setFormBlock()
  console.log(isBlock, 'isBlock')
  if (!isBlock) return
  const isWork = await nodesWorkRef.value.setFormWork()
  console.log(isWork, 'isWork')
  if (!isWork) return
  const isToken = await nodesTokenomicsRef.value.setTokenomicsData()
  console.log(isToken, 'isToken')
  if (!isToken) return
  isDialogLoading.value = true
  const req = {
    ...formData.value,
    daoId: initData.value.projectId,
    decimalsNum: initData.value.decimalsNum,
  }
  const changeInfiniteMode =
    initData.value.infiniteMode === formData.value.infiniteMode ? false : true
  console.log(changeInfiniteMode, 'changeInfiniteMode')
  const isTx = await editNodeChain(req, changeInfiniteMode)
  isDialogLoading.value = false
  if (!isTx) return
  goNode()
}
const setFormData = (data: any) => {
  console.log(data, 'datadatadatadata')
  formData.value = { ...formData.value, ...data }
}
const router = useRouter()
const goNode = () => {
  router.push({
    path: '/nodeDetails',
    query: {
      id: route.query.id,
    },
  })
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.edit-box {
  height: 100%;
  width: 100%;
}
</style>
