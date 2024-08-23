<template>
  <Link
    :text="$t('fork.forkText')"
    className="ml-2"
    :handleClick="handleClick"
  />
  <ForkModal v-model="show" :forkedDao="daoName" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Link from '@/components/Link.vue'
import useAccount from '@/hooks/useAccount';
import ForkModal from './ForkModal.vue';

defineProps({
  daoName: {
    type: String,
    default: '',
  },
})
const show = ref(false)
const { getTrading } = useAccount()
const handleClick = async () => {
  const isTrading = await getTrading()
  if (!isTrading) return
  show.value = true
}
</script>