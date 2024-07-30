<template>
  <div class="wh100">
    <h2 class="h2-title">{{ t('editInfo.title')}}</h2>
    <v-divider class="border-purple"></v-divider>
    <loading v-if="isLoading" />
    <div v-else>
      <p class="text-center text-neutral-500 text-lg font-medium font-['Inter'] tracking-tight mb-6 mt-8">
        {{ t('editInfo.subTitle') }}
        <router-link
          :to="'/workDetails?id=' + userPermission.workId"
          class="hover:text-primary-2 text-indigo-400 text-lg font-medium font-['Inter'] tracking-tight"
          >{{ `${userPermission.daoNameNft}.${userPermission.workNumber}` }}</router-link
        >
      </p>
      <EditInformationBasic
        :dataObj="formData"
        @setFormData="setFormData"
        ref="childRef"
      />
      <EditInformationCommunity
        :dataObj="formData"
        @setFormData="setFormData"
        ref="childSocialRef"
      />
      <div class="dflex flex-jc my-mgb24 my-mgt24">
        <v-btn
          block
          class="btnb fc7 text-none mr-10"
          type="submit"
          @click="goNode"
          >{{ t('common.back') }}</v-btn
        >
        <v-btn class="btnz text-none" type="submit" @click="submit"
          >{{ t('common.save') }}</v-btn
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
import EditInformationBasic from './EditInformationBasic.vue'
import EditInformationCommunity from './EditInformationCommunity.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { daoEditDetail, daoEdit } from '@/api/daos'
import usePermission from '@/hooks/useUserPermission'
import { RouterLink } from 'vue-router'
import { t } from '@/lang'
const route = useRoute()
const { userPermission, getPermission } = usePermission()
const formData = ref({
  daoName: '',
  daoManitesto: '',
  daoDescription: '',
  daoLogo: '',
  daoBgBanner: '',
  logoUrl: '',
  bannerUrl: '',
  ownerAddress: '',
  openseaLink: '',
  discordLink: '',
  twitterLink: '',
  socialLinks: [],
})
const isLoading = ref(true)
const getData = async () => {
  const data = await daoEditDetail({ daoId: route.query.id })
  formData.value = data.data
  isLoading.value = false
}
const setFormData = (data: any) => {
  formData.value = { ...formData.value, ...data }
}
const childRef = ref()
const childSocialRef = ref()
const router = useRouter()

import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
import useAccount from '@/hooks/useAccount'
const { getSig } = useAccount()
const isDialogLoading = ref(false)
const submit = async () => {
  if (!userPermission.value.isPermission) {
    notifyErr(t('common.noPermissionTip'), true)
    return
  }
  const isNext = await childRef.value.setData()
  await childSocialRef.value.setData()
  if (!isNext) return
  try {
    isDialogLoading.value = true
    const sig = await getSig()
    if (sig) {
      const connectionsList = formData.value.socialLinks.join(',')
      const req = {
        ...formData.value,
        socialLinks: connectionsList,
      }
      const res = (await daoEdit(req)) as any
      if (res.resultCode === 100) {
        isDialogLoading.value = false
        notifySuc('Updated', true)
        goNode()
      } else {
        notifyErr('Updated failed, please retry later')
      }
    }
    isDialogLoading.value = false
  } catch (error) {
    isDialogLoading.value = false
    const err = JSON.stringify(error)
    notifyErr(err)
  }
}

const goNode = () => {
  router.push({
    path: route.query.type === '1' ? '/daoCollectionAnalytics' : '/nodeDetails',
    query: {
      id: route.query.id,
    },
  })
}

onMounted(() => {
  getData()
  getPermission({
    daoId: route.query.id as string,
    permissionType: route.query.type === '1' ? 6 : 1,
  })
})
</script>

<style lang="scss" scoped></style>
