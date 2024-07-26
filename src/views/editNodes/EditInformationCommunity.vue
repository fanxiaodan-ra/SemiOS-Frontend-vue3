<template>
  <v-card class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24 bg-card-1" elevation="12">
    <h3 class="node-name">Community Parameter</h3>
    <v-form ref="formRef">
      <FormRow
        input-name="Opensea"
        :isIcon="false"
        leftWidth="160px"
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
        leftWidth="160px"
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
        leftWidth="160px"
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

      <FormRow
        input-name="Link"
        :isIcon="false"
        leftWidth="160px"
        :importance="false"
        v-for="(item, index) in socialLinks"
        :key="index + 'socialLinks'"
      >
        <v-text-field
          label="yoursite.io"
          density="comfortable"
          v-model="item.link"
        >
          <template v-slot:prepend-inner>
            <v-icon class="iconfont icon-twitter" />
          </template>
        </v-text-field>
      </FormRow>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})

const formData = ref({
  openseaLink: '',
  discordLink: '',
  twitterLink: '',
  socialLinks: [],
})

const emit = defineEmits(['setFormData'])
const setData = async () => {
  formData.value.socialLinks = socialLinks.value.map((item) => item.link) as any
  emit('setFormData', formData.value)
}
defineExpose({
  setData,
})
const socialLinks = ref([
  {
    link: '',
  },
  {
    link: '',
  },
  {
    link: '',
  },
])
onMounted(() => {
  formData.value.openseaLink = props.dataObj.openseaLink
  formData.value.discordLink = props.dataObj.discordLink
  formData.value.twitterLink = props.dataObj.twitterLink
  socialLinks.value = props.dataObj.socialLinks.map((item: any) => {
    return {
      link: item,
    }
  })
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
:deep(.v-input__control) {
  height: 56px !important;
}
:deep(.v-selection-control-group--inline) {
  height: 56px !important;
}
</style>
