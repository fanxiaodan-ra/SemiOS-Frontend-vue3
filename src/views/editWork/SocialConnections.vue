<template>
  <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="12">
    <h3 class="node-name">Social Connections</h3>
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
        input-name="Links"
        :isIcon="false"
        leftWidth="160px"
        :importance="false"
        v-for="(item, index) in formData.socialLinks"
        :key="index + 'socialLinks'"
      >
        <div>
          <v-row no-gutters>
            <v-col cols="4">
              <div class="my-mgr12">
                <v-text-field
                  class="color-input-a"
                  label="name"
                  density="comfortable"
                  v-model="item.name"
                >
                </v-text-field>
              </div>
            </v-col>
            <v-col cols="8">
              <div class="my-mgl12">
                <v-text-field label="link" v-model="item.link"
                  ><template v-slot:prepend-inner>
                    <v-icon class="iconfont icon-link" />
                  </template>
                </v-text-field>
              </div>
            </v-col>
          </v-row>

          <!-- <v-row no-gutters>
            <v-col class="my-mgr12">
              <v-text-field
                class="color-input-a"
                label="name"
                density="comfortable"
              >
              </v-text-field>
            </v-col>
            <v-col class="my-mgl12">
              <v-text-field label="link" density="comfortable"
                ><template v-slot:prepend-inner>
                  <v-icon class="iconfont icon-link" />
                </template>
              </v-text-field>
            </v-col>
          </v-row> -->
        </div>
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
  socialLinks: [
    { name: '', link: '' },
    { name: '', link: '' },
    { name: '', link: '' },
  ],
})

const emit = defineEmits(['setFormData'])
const setData = async () => {
  emit('setFormData', formData.value)
}
defineExpose({
  setData,
})
onMounted(() => {
  formData.value.openseaLink = props.dataObj.openseaLink
  formData.value.discordLink = props.dataObj.discordLink
  formData.value.twitterLink = props.dataObj.twitterLink
  formData.value.socialLinks = props.dataObj.socialLinks
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
