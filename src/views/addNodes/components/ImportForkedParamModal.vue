<template>
  <SlotDialog
    :title="t('importTemplate.dialogTitle')"
    :isDialog="newValue"
    @cancelDialog="cancelDialog"
    width="420px"
  >
    <div class="flex justify-center flex-col w-full px-4 pb-4">
      <SelectFile v-model="file" />
      <div class="flex justify-center mt-4">
        <v-btn
          variant="outlined"
          class="text-none"
          color="#8C91FF"
          @click="cancelDialog"
        >
          {{ t('common.cancel') }}
        </v-btn>
        <v-btn
          class="btnz text-none ml-6"
          :disabled="!disabledSubmit"
          @click="submit"
        >
          {{ t('common.submit') }}
        </v-btn>
      </div>
    </div>
  </SlotDialog>
</template>
<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import SlotDialog from '@/components/SlotDialog.vue'
import SelectFile from '@/components/SelectFile.vue'
import { t } from '@/lang'
import { defineProps, computed, defineEmits } from 'vue'
import { readFile } from '@/utils/file'
import { toDecode } from '@/utils/obfuscation'
import useToastNotify from '@/hooks/useToastNotify'
import useSetupDaoStore from '@/store/setupDao'
import { ForkedParams } from '@/types/SetupDao'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const { notifyErr } = useToastNotify()
const setupDaoStore = useSetupDaoStore()

const file = ref({} as File)

const disabledSubmit = computed(() => {
  return file.value?.name && file.value.name.length > 0
})

const newValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const cancelDialog = () => {
  emit('update:modelValue', false)
}

const verifyParams = (params: ForkedParams) => {
  const keys = ['nodeBlockParam', 'nodeWorksParam', 'nodesStrategies', 'nodesTokenStructure']
  if (keys.some((key) => !params[key as keyof ForkedParams])) {
    return false
  }
  return true
}
const submit = () => {
  readFile(file.value, (content: string) => {
    try {
      const params = JSON.parse(toDecode(content))
      if (!verifyParams(params)) {
        throw new Error('Invalid params')
      } else {
        setupDaoStore.setForkedDaoParams(params)
      }
    } catch (error) {
      notifyErr(t('importTemplate.fileInputError'), true)
    }
  })
  cancelDialog()
}

defineExpose({
  newValue,
  cancelDialog,
})
</script>
