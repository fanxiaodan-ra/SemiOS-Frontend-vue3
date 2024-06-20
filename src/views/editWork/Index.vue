<template>
  <loading v-if="isLoading" />
  <div class="edit-box" v-else>
    <h2>Edit Information</h2>
    <v-divider class="my-divider"></v-divider>
    <BasicParameter
      v-if="formData.workStatus === 0"
      :dataObj="formData"
      @setFormData="setFormData"
      ref="childRef"
    />
    <SocialConnections
      :dataObj="formData"
      @setFormData="setFormData"
      ref="childSocialRef"
    />
    <div class="dflex flex-jc my-mgb24 my-mgt24">
      <v-btn
        block
        class="btnb fc7 text-none mr-10"
        type="submit"
        @click="goWork"
        >Back</v-btn
      >
      <v-btn block class="btnz text-none" type="submit" @click="submit"
        >Submit</v-btn
      >
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
import BasicParameter from './BasicParameter.vue'
import SocialConnections from './SocialConnections.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { workEditDetail, workEdit } from '@/api/works'

const route = useRoute()

const formData = ref({
  workId: 0,
  ownerAddress: '',
  workDescription: '',
  workStatus: 0,
  openseaLink: '',
  discordLink: '',
  twitterLink: '',
  socialLinks: [
    { name: '', link: '' },
    { name: '', link: '' },
    { name: '', link: '' },
  ],
})
const isLoading = ref(true)
const getData = async () => {
  const data = await workEditDetail({ workId: route.query.id })
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
  const isNext = await childRef.value.setData()
  await childSocialRef.value.setData()
  if (!isNext) return
  try {
    isDialogLoading.value = true

    const sig = await getSig()
    if (sig) {
      const connectionsList = formData.value.socialLinks.map((item) => {
        if (item.name === '') {
          return {
            name: 'Link',
            link: item.link,
          }
        } else {
          return {
            ...item,
          }
        }
      })
      const req = {
        ...formData.value,
        socialLinks: connectionsList,
      }
      console.log(req, 'reqreqreqreqreq')
      const res = (await workEdit(req)) as any
      console.log(res, 'res')
      if (res.resultCode === 100) {
        isDialogLoading.value = false
        notifySuc('Updated', true)
        goWork()
      }
    }
    isDialogLoading.value = false
  } catch (error) {
    isDialogLoading.value = false
    const err = JSON.stringify(error)
    notifyErr(err)
  }
}

const goWork = () => {
  router.push({
    path: '/workDetails',
    query: {
      id: route.query.id,
    },
  })
}
onMounted(() => {
  if (route.query.id) {
    getData()
  }
})
</script>

<style lang="scss" scoped>
.edit-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
}
h2 {
  color: #f3f3f3;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  height: 84px;
  line-height: 84px;
  text-align: center;
}
</style>
