<template>
  <v-card class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24 bg-card-1" elevation="12">
    <h3 class="node-name">Basic Parameter</h3>
    <v-form ref="formRef">
      <FormRow input-name="Nodes Name" :isIcon="false" leftWidth="160px" :importance="false">
        <v-text-field label="" density="comfortable" :disabled="route.query.type !== '1'" v-model="formData.daoName">
        </v-text-field>
      </FormRow>
      <UploadImg @setUpImg="setUpImg" ref="childRef" left-width="160px" input-name="Nodes Logo" :tooltipText="logoText"
        :imgSize="5" :imgUrl="props.dataObj.daoLogoUrl" />
      <FormRow input-name="Nodes Manifesto" :isIcon="false" leftWidth="160px" :importance="false">
        <v-textarea v-model="formData.daoManitesto" counter
          label="Please enter your Nodes manifesto, Markdown syntax is supported." :rules="manitestoRules"></v-textarea>
      </FormRow>
      <FormRow input-name="Nodes Description" :isIcon="false" leftWidth="160px" :importance="false">
        <v-textarea v-model="formData.daoDescription" counter
          label="Please enter your Nodes description, Markdown syntax is supported."
          :rules="descriptionRules"></v-textarea>
      </FormRow>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import UploadImg from '@/components/UploadImg.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => { },
  },
})
const route = useRoute()
const manitestoRules = [
  (v: string) => v.length <= 1500 || 'Max 1500 characters',
]
const descriptionRules = [
  (v: string) => v.length <= 5000 || 'Max 5000 characters',
]

const formRef = ref()

const formData = ref({
  daoName: '',
  daoManitesto: '',
  daoDescription: '',
  daoLogo: '',
  daoBgBanner: '',
  daoLogoUrl: '',
  ownerAddress: '',
}) as any
const logoText =
  'Recommended resolution is 800*800 with file size less than 5MB, keep visual elements centered (JPG, JPEG, PNG, GIF).'
const emit = defineEmits(['setFormData'])
const setData = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) {
    return false
  } else {
    emit('setFormData', formData.value)
    return true
  }
}
defineExpose({
  setData,
})
const setUpImg = (val: any) => {
  formData.value.daoLogo = val.length > 0 ? val[0] : null
}
onMounted(() => {
  formData.value = { ...props.dataObj, daoManitesto: props.dataObj.daoManitesto.replace(/\r\n/g, '\n'), daoDescription: props.dataObj.daoDescription.replace(/\r\n/g, '\n') }
})
</script>

<style lang="scss" scoped>
.v-card {
  width: 100%;
}

:deep(.v-form) {
  max-width: 1024px;
  margin: 0 auto;
  margin-top: 24px;
}

// :deep(.v-input__control) {
//   height: 56px !important;
// }
:deep(.v-selection-control-group--inline) {
  height: 56px !important;
}
</style>
