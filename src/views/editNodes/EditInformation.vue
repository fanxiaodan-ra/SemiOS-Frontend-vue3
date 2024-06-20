<template>
  <div class="wh100">
    <h2 class="h2-title">Edit Information</h2>
    <v-divider class="my-divider"></v-divider>
    <loading v-if="isLoading" />
    <div v-else>
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
import EditInformationBasic from './EditInformationBasic.vue'
import EditInformationCommunity from './EditInformationCommunity.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { daoEditDetail, daoEdit } from '@/api/daos'

const route = useRoute()

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
  console.log(data, 'data')
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
      console.log(req, 'reqreqreqreqreq')
      const res = (await daoEdit(req)) as any
      console.log(res, 'res')
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
