<template>
  <ThinBtn
    :text="t('fork.exportNode')"
    class-name="mb-2"
    @click="handleExport"
    :loading="loading"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { t } from '@/lang'
import { toEncode } from '@/utils/obfuscation';
import { generateAndDownloadTxFile } from '@/utils/generation';
import ThinBtn from '@/components/ThinBtn.vue'
import useSetupDaoStore from '@/store/setupDao';
import useToastNotify from '@/hooks/useToastNotify';

const props = defineProps({
  forkedDao: {
    type: String,
    default: '',
  },
})
const route = useRoute()
const emit = defineEmits(['callback'])
const setupDaoStore = useSetupDaoStore()
const { notifyErr, notifySuc } = useToastNotify()

const loading = ref(false)

const handleExport = async () => {
  try {
    loading.value = true
    const result = await setupDaoStore.getForkedDaoParams({
      daoId: route.query.id as string,
      type: 2,
    })

    const encodedResult = toEncode(JSON.stringify(result))
    if (!encodedResult) {
      throw new Error('Export failed')
    }

    generateAndDownloadTxFile({
      name: `${props.forkedDao}-Nodes-Parameters-Template-File`,
      content: encodedResult,
    })
    
    notifySuc('Export success', true)
  } catch (error) {
    console.error(error)
    notifyErr('Export failed', true)
  } finally {
    loading.value = false
    emit('callback')
  }
}
</script>