<template>
  <div class="wh100">
    <h2 class="h2-title">Nodes Strategies</h2>
    <v-divider class="my-divider"></v-divider>
    <loading v-if="isLoading" />
    <div v-else>
      <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="16">
        <h3 class="node-name">Nodes Strategies</h3>
        <div>
          <FormNodesBuilder
            :form-input="formData"
            @setFormData="setFormData"
            :isEdit="true"
            :initData="initData"
          />
          <FormNodesMinter
            :form-input="formData"
            @setFormData="setFormData"
            :isEdit="true"
            :initData="initData"
          />
        </div>
      </v-card>
      <div class="dflex flex-jc my-mgb24 my-mgt24">
        <v-btn
          block
          class="btnb fc7 text-none mr-10"
          type="submit"
          @click="goNode"
          >Back</v-btn
        >
        <v-btn block class="btnz text-none" type="submit" @click="submit"
          >Submit</v-btn
        >
      </div>
    </div>
  </div>
  <DialogLoading
    :title="'Loading'"
    :isLoading="isDialogLoading"
    text="Your change is being processed, it should be finished immedately."
  />
</template>
<script setup lang="ts">
import DialogLoading from '@/components/DialogLoading.vue'
import FormNodesBuilder from '../addNodes/addFormNodesStrategies/FormNodesBuilder.vue'
import FormNodesMinter from '../addNodes/addFormNodesStrategies/FormNodesMinter.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { blackandwhiteList } from '@/api/daos'

const route = useRoute()

const formData = ref({
  workBlacklistAddress: [],
  workWhitelistAddress: [],
  workErclistAddress: [],
  workNftlistAddress: [],
  mintingBlacklistAddress: [],
  mintingWithMaxlistAddress: [],
  mintingWithUnlimitedlistAddress: [],
  mintingErcWithMaxlistAddress: [],
  mintingErcWithUnlimitedlistAddress: [],
  mintingCapForDaolistAmount: [],
  mintingNftWithMaxlistAddress: [],
  mintingNftWithUnlimitedlistAddress: [],
})
const initData = ref()
const isLoading = ref(true)
const getData = async () => {
  const data = await blackandwhiteList({ daoId: route.query.id })
  initData.value = data.data
  isLoading.value = false
}
const setFormData = (data: any) => {
  console.log(data, 'data')
  formData.value = { ...formData.value, ...data }
}
const router = useRouter()
import useAddNodes from '@/hooks/useAddNodes'
const { editNodeStrategies } = useAddNodes()
const isDialogLoading = ref(false)
const submit = async () => {
  isDialogLoading.value = true
  console.log(formData.value, 'formData....++++++++++++initData', initData)
  const isTx = await editNodeStrategies(formData.value, initData.value)
  isDialogLoading.value = false
  if (!isTx) return
  goNode()
}

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

<style lang="scss" scoped></style>
