<template>
  <Link
    :text="$t('importTemplate.importBtn')"
    :className="`${className} ml-2`"
    :handleClick="handleClick"
  />
  <ImportForkedParamModal v-model="show" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Link from '@/components/Link.vue'
import ImportForkedParamModal from './ImportForkedParamModal.vue';

defineProps({
  className: {
    type: String,
    default: '',
  },
})
const show = ref(false)
const handleClick = () => {
  show.value = true
}
</script>