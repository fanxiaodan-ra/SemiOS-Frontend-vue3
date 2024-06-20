<template>
  <div class="pro-box">
    <div class="pos_fix">
      <h2>Profile</h2>
      <v-divider class="my-divider"></v-divider>
    </div>
    <Loading v-if="isLoading" style="margin-top: 86px" />
    <div v-else class="posbox">
      <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="16">
        <v-form ref="formRef">
          <FormRow
            input-name="User Name"
            :isIcon="false"
            leftWidth="80px"
            :importance="false"
          >
            <v-text-field
              v-model="formData.userName"
              counter
              label="Please enter your username."
              :rules="userRules"
            ></v-text-field>
          </FormRow>
          <FormRow
            input-name="User Bio"
            :isIcon="false"
            leftWidth="80px"
            :importance="false"
          >
            <v-textarea
              v-model="formData.introduction"
              counter
              label="Please write some self introduciton."
              :rules="rules"
            ></v-textarea>
          </FormRow>
          <UploadImg
            :imgUrl="formData.avatarLink"
            inputName="Avatar"
            tooltip-text="Recommended resolution is 200*200 with file size less than 2MB, keep visual elements centered (JPG, JPEG, PNG, GIF)."
            @setUpImg="setUpImg"
            ref="childRef"
            left-width="80px"
          />

          <FormRow
            input-name="Opensea"
            :isIcon="false"
            leftWidth="80px"
            :importance="false"
          >
            <v-text-field
              label="https://opensea.io/"
              density="comfortable"
              v-model="formData.openseaLink"
            >
              <template v-slot:prepend-inner>
                <v-icon class="iconfont icon-opensea" />
              </template>
            </v-text-field>
          </FormRow>
          <FormRow
            input-name="Telegram"
            :isIcon="false"
            leftWidth="80px"
            :importance="false"
          >
            <v-text-field
              label="https://t.me/"
              density="comfortable"
              v-model="formData.discordLink"
            >
              <template v-slot:prepend-inner>
                <v-icon class="iconfont icon-telegram" />
              </template>
            </v-text-field>
          </FormRow>
          <FormRow
            input-name="Twitter"
            :isIcon="false"
            leftWidth="80px"
            :importance="false"
          >
            <v-text-field
              label="https://twitter.com/"
              density="comfortable"
              v-model="formData.twitterLink"
            >
              <template v-slot:prepend-inner>
                <v-icon class="iconfont icon-twitter" />
              </template>
            </v-text-field>
          </FormRow>
        </v-form>
      </v-card>
      <div class="dflex flex-jc my-mgb24 my-mgt24">
        <v-btn
          block
          class="btnz text-none"
          type="submit"
          :loading="btnLoading"
          @click="save"
          >Save</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import UploadImg from '@/components/UploadImg.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

import { userProfileInfo, userProfileSave } from '@/api/user'

const formData = ref<any>({
  introduction: '',
  userName: '',
  avatar: null,
  openseaLink: '',
  twitterLink: '',
  discordLink: '',
})
import useUserStore from '@/store'
const store = useUserStore()
const getData = async () => {
  const res = await userProfileInfo()
  formData.value = res.data
  store.setUserInfo({
    ...store.UserInfo,
    avatar: res.data.avatarLink,
    name: res.data.userName,
  })
  isLoading.value = false
}

const btnLoading = ref(false)

const rules = [(v: string) => v.length <= 1000 || 'Max 1000 characters']
const userRules = [(v: string) => v.length <= 45 || 'Max 45 characters']
const formRef = ref()
const setUpImg = (val: any) => {
  formData.value.avatar = val.length > 0 ? val[0] : null
  console.log(formData.value.avatar, ' formData.value.avatar')
}

import useToastNotify from '@/hooks/useToastNotify'
const { notifyErr, notifySuc } = useToastNotify()
import useAccount from '@/hooks/useAccount'
const { getSig } = useAccount()
const save = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  btnLoading.value = true
  const sig = await getSig()
  if (sig) {
    try {
      const res = (await userProfileSave(formData.value)) as any
      if (res.resultCode === 100) {
        await getData()
        btnLoading.value = false
        notifySuc('Updated', true)
      } else {
        notifyErr(res.resultDesc, true)
        btnLoading.value = false
      }
    } catch (error) {
      const err = JSON.stringify(error)
      notifyErr(err)
      btnLoading.value = false
    }
  } else {
    btnLoading.value = false
  }
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.pro-box {
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
.v-card {
  width: 100%;
}
:deep(.v-form) {
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 24px;
}
</style>
