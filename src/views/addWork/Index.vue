<template>
  <Loading v-if="isLoading" />
  <div class="add-box" v-else>
    <h2>{{ t('addwork.title') }}</h2>
    <v-divider class="border-purple"></v-divider>
    <v-card class="mx-auto my-pd24 my-mgt24 my-mgb24 max-w-[1200px] bg-card-1" elevation="12">
      <v-form ref="formRef">
        <FormRow input-name="Select Nodes" left-width="160px" :isIcon="false">
          <v-autocomplete
            v-model="formData.daoId"
            :items="daos"
            item-title="daoName"
            item-value="daoId"
            :label="t('common.setNodeLabel')"
            :rules="daoIdRules"
            :disabled="btnLoading"
            @update:modelValue="setSelectData"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :disabled="(item as any ).raw.daoStatus === 4"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </FormRow>
        <v-expand-transition>
          <FormRow
            input-name="Mintable Works"
            left-width="160px"
            :tooltipText="t('addwork.worksLimitNotice')"
            :importance="false"
            v-if="formData.canId"
          >
            <div class="work-info" v-if="formData.unmintedWorkAmount === 0">
              {{ t('addwork.noWorks') }}
            </div>
            <div class="mintable-imgs" v-else>
              <div v-for="item in formData.unmintedWorkUrls">
                <v-img
                  :aspect-ratio="1"
                  class="img-bg"
                  :lazy-src="item"
                  :src="item"
                  width="86"
                ></v-img>
              </div>
              <div class="work-info">
                {{ formData.unmintedWorkAmount }}/{{
                  formData.unmintedWorkTotal
                }}
              </div>
            </div>
          </FormRow>
        </v-expand-transition>
        <UploadImg @setUpImg="setUpImg" ref="childRef" left-width="160px" />
        <FormRow
          input-name="Work Description"
          :isIcon="false"
          left-width="160px"
          :importance="false"
        >
          <v-textarea
            v-model="formData.workDescription"
            counter
            :label="t('addwork.workDescLabel')"
            :rules="descriptionRules"
          ></v-textarea>
        </FormRow>
        <v-expand-transition>
          <ChooseTypeSale
            leftWidth="160px"
            :dataObj="formData"
            @setPethodType="setPethodType"
            @setFixedPrice="setFixedPrice"
            v-if="formData.basicDao && formData.basicDao !== 2"
        /></v-expand-transition>
      </v-form>
    </v-card>
    <div class="dflex flex-jc my-mgb24 my-mgt24">
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="submit"
        :loading="btnLoading"
        >{{ t('common.submit') }}</v-btn
      >
    </div>
  </div>
  <DialogLoading
    :title="'Loading'"
    :isLoading="isDialogLoading"
    text="Your change is being processed, it should be finished immedately."
  />

  <SlotDialog
    title="Congratulation!"
    :isDialog="isSuccessDialog"
    @cancelDialog="cancelSuccessDialog"
  >
    <v-icon style="font-size: 64px; color: #533fa1; margin: 24px 0"
      >mdi-check-circle-outline</v-icon
    >
    <span style="text-align: center">{{ t('addwork.uploadWorkSus') }}</span>
    <v-btn
      block
      class="btnz text-none my-mgt16"
      type="submit"
      @click="goWork"
      >{{ t('addwork.mintOrTransNft') }}</v-btn
    >
  </SlotDialog>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import UploadImg from '@/components/UploadImg.vue'
import ChooseTypeSale from './ChooseTypeSale.vue'
import DialogLoading from '@/components/DialogLoading.vue'
import SlotDialog from '@/components/SlotDialog.vue'
import Loading from '@/components/Loading.vue'
import { ref, onMounted } from 'vue'
import { daoListProtodao, createWorkInfo } from '@/api/daos'
import useAddWork from '@/hooks/useAddWork'
import useAccount from '@/hooks/useAccount'
const { addWork } = useAddWork()
const { getTrading } = useAccount()
import { useRouter } from 'vue-router'
import { t } from '@/lang'

const router = useRouter()

const isLoading = ref(true)
const daos = ref<any>([])
const daoIdRules = [
  (value: string) => {
    if (value) return true
    return 'This field is required.'
  },
]
const descriptionRules = [
  (v: string) => v.length <= 5000 || 'Max 5000 characters',
]
const getData = async () => {
  const data = (await daoListProtodao()) as any
  daos.value = data.dataList
  isLoading.value = false
}

const formData = ref<any>({ workDescription: '', daoId: '', image: null })
const btnLoading = ref(false)
const setSelectData = async (val: string) => {
  formData.value = {
    workDescription: '',
    daoId: val,
    image: formData.value.image,
  }
  await setSelect(val)
}
const setSelect = async (val: string) => {
  await childRef.value.updateSourceFile([])
  if (val) {
    btnLoading.value = true
    const res = await createWorkInfo({ daoId: val })
    formData.value.pethodType = res.data.unifiedPrice
      ? 3
      : res.data.basicDao === 1
      ? 1
      : 2
    formData.value.fixedPrice = res.data.unifiedPrice
      ? 0
      : res.data.basicDao === 2
      ? 0.01
      : null
    formData.value = { ...formData.value, ...res.data }
    btnLoading.value = false
  }
}

const setUpImg = (val: any) => {
  formData.value.image = val.length > 0 ? val[0] : null
}
const setPethodType = (val: number) => {
  formData.value.pethodType = val
}
const setFixedPrice = (val: number) => {
  formData.value.fixedPrice = val
}
const workId = ref('')
const formRef = ref()
const childRef = ref()
const isDialogLoading = ref(false)
const isSuccessDialog = ref(false)
const submit = async () => {
  const isTrad = await getTrading()
  if (!isTrad) return
  const isMsg = await childRef.value.setUrlMsg()
  const { valid } = await formRef.value.validate()
  
  // todo optimize
  if (isMsg) return 
  if (!valid) {
    if (!formData.value.fixedPrice && formData.value.fixedPrice < 0.0001) {
      return
    } else if (!formData.value.fixedPrice) {
      return
    }
  }
  isDialogLoading.value = true
  workId.value = await addWork(formData.value)
  if (workId.value) {
    await setSelect(formData.value.daoId)
    isSuccessDialog.value = true
  }
  isDialogLoading.value = false
}
const goWork = () => {
  router.push({
    path: '/workDetails',
    query: {
      id: workId.value,
    },
  })
}
const cancelSuccessDialog = () => {
  isSuccessDialog.value = false
  workId.value = ''
}
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.add-box {
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
:deep(.v-selection-control-group--inline) {
  height: 56px !important;
}
.mintable-imgs {
  display: flex;
  margin-bottom: 22px;
}
.img-bg {
  background-color: #282f41;
  border-radius: 6px;
  margin-right: 12px;
}
.work-info {
  color: #9e9e9e;
  font-size: 14px;
}
</style>
