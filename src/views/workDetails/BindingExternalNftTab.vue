<template>
  <div class="external-box">
    <p class="text-p">Coming Soon</p>
    <v-form ref="formRef">
      <FormRow input-name="ERC-721" :isIcon="false" leftWidth="80px">
        <v-text-field
          label="
           Pleace input ERC-721 Address 
          "
          disabled
          density="comfortable"
          v-model="formData.erc721Address"
        >
        </v-text-field>
      </FormRow>
      <FormRow input-name="Token ID" :isIcon="false" leftWidth="80px">
        <v-text-field
          label="
           Pleace input 
          "
          disabled
          density="comfortable"
          v-model="formData.tokenId"
        >
        </v-text-field>
      </FormRow>
    </v-form>
  </div>
</template>
<script lang="ts" setup>
import FormRow from '@/components/FormRow.vue'

import { ref } from 'vue'
const formData = ref<any>({})
</script>

<style lang="scss" scoped>
.external-box {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
}
.text-p {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin-bottom: 32px;
}
</style>
