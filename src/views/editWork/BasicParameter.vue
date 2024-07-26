<template>
  <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="12">
    <h3 class="node-name">Basic Parameter</h3>
    <v-form ref="formRef">
      <FormRow
        input-name="Work Description"
        :isIcon="false"
        leftWidth="160px"
        :importance="false"
      >
        <v-textarea
          v-model="formData.workDescription"
          counter
          label="Please enter your work description，Markdown syntax is supported."
          :rules="rules"
        ></v-textarea>
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
const rules = [(v: string) => v.length <= 5000 || 'Max 5000 characters']

const formRef = ref()

const formData = ref({
  workDescription: '',
})

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
onMounted(() => {
  formData.value.workDescription = props.dataObj.workDescription
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
