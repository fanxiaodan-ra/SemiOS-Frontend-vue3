<template>
  <v-form ref="formRef" @submit.prevent="submit">
    <v-text-field
      v-model="value"
      label="Name"
      :rules="rules"
      :error-messages="errorMessage"
      hide-details="auto"
    ></v-text-field>
  </v-form>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { t } from '@/lang'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  submit: {
    type: Function,
    default: () => {},
  },
  errorMessage: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
})

const value = ref(props.modelValue)

const formRef = ref()

const rules = [
  (value: any) => !!value || t('AddNodeName.err.name_no'),
  (value: any) =>
    (value && value.length <= 45) ||
    t('AddNodeName.err.name_len', [value.length]),
  // `Ensure this value has at most 45 characters ( it has ${value.length} ).`,
]

watch(value, (val:string) => {
  emit('update:modelValue', val)
})

defineExpose({
  formRef,
  value,
})
</script>