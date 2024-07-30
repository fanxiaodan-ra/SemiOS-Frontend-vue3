<template>
  <div class="wh100">
    <h2 class="h2-title">{{ t('nodesStrategies.title')}}</h2>
    <v-divider class="border-purple"></v-divider>
    <loading v-if="isLoading" />
    <div v-else>
      <p class="text-center text-neutral-500 text-lg font-medium font-['Inter'] tracking-tight mb-6 mt-8">
        {{ t('nodesStrategies.subTitle') }}
        <router-link
          :to="'/workDetails?id=' + userPermission.workId"
          class="hover:text-primary-2 text-indigo-400 text-lg font-medium font-['Inter'] tracking-tight"
          >{{ `${userPermission.daoNameNft}.${userPermission.workNumber}` }}</router-link
        >
      </p>
      <v-card class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24 bg-card-1" elevation="12">
        <h3 class="node-name">{{ t('nodesStrategies.title')}}</h3>
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
          >{{ t('common.back') }}</v-btn
        >
        <v-btn block class="btnz text-none" type="submit" @click="submit"
          >{{ t('common.submit') }}</v-btn
        >
      </div>
    </div>
  </div>
  <DialogLoading
    :title="t('common.loading')"
    :isLoading="isDialogLoading"
    :text="t('common.processing')"
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
import { t } from '@/lang'
import usePermission from '@/hooks/useUserPermission'
import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr } = useToastNotify()
const route = useRoute()
const { userPermission, getPermission } = usePermission()
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
  formData.value = { ...formData.value, ...data }
}
const router = useRouter()
import useAddNodes from '@/hooks/useAddNodes'
const { editNodeStrategies } = useAddNodes()
const isDialogLoading = ref(false)
const submit = async () => {
  if (!userPermission.value.isPermission) {
    notifyErr(t('common.noPermissionTip'), true)
    return
  }
  isDialogLoading.value = true
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
  getPermission({
    daoId: route.query.id as string,
    permissionType: 3
  })
})
</script>

<style lang="scss" scoped></style>
