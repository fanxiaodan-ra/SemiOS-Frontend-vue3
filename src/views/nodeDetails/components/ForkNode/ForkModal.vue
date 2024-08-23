<template>
  <SlotDialog
    :title="t('fork.modalTitle')"
    :isDialog="newValue"
    @cancelDialog="cancelDialog"
    width="420px"
  >
    <div class="flex flex-col w-full px-4 pt-2">
      <p class="!self-start text-sm mb-4">{{ $t('fork.modalDesc') }}</p>
      <ForkSubNode
        @setDaoName="setDaoName"
        @setIsModeSelection="setIsModeSelection"
      />
      <ExportParams :forkedDao="props.forkedDao" @callback="cancelDialog" />
    </div>
  </SlotDialog>
  <SelectionOrBase
    from="nodeDetails"
    :daoName="daoName"
    :isModeSelection="isModeSelection"
    @setIsModeSelection="setIsModeSelection"
  />
</template>
<script setup lang="ts">
import { defineProps, computed, defineEmits, ref } from 'vue'
import SlotDialog from '@/components/SlotDialog.vue'
import { t } from '@/lang'
import SelectionOrBase from '@/views/addNodes/SelectionOrBase.vue';
import ForkSubNode from './ForkSubNode.vue';
import ExportParams from './ExportParams.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  forkedDao: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])

const daoName = ref('')
const setDaoName = (val: string) => {
  daoName.value = val
}

const isModeSelection = ref(false)
const setIsModeSelection = (val: boolean) => {
  isModeSelection.value = val
  if (val) {
    emit('update:modelValue', false)
  }
}

const newValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

const cancelDialog = () => {
  emit('update:modelValue', false)
}

defineExpose({
  newValue,
  cancelDialog,
})
</script>