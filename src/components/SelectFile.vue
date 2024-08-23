<template>
  <div class="w-full h-auto">
    <div class="h-[110px] border border-dashed border-gray-2 rounded-sm relative">
      <input
        type="file"
        accept=".txt"
        id="docpicker"
        class="w-full h-full text-gray-2 text-center opacity-0 relative z-10"
        @change="handleChange"
      />
      <div class="flex flex-col items-center absolute top-[30px] left-0 w-full h-full z-0">
        <i class="iconfont icon-file text-grey-75 !text-2xl"></i>
        <label class="flex justify-center items-center font-sm">
          <p class="text-grey-75">
            {{ $t('importTemplate.dropFileText') }}
          </p>
          <a class="text-primary-1 underline ml-1">
            {{ $t('importTemplate.chooseFile') }}
          </a>
        </label>
      </div>
    </div>
    <p v-if="fileName"
      class="w-full h-[26px] rounded-sm pl-2 flex justify-between items-center mt-2 bg-grey-15 text-xs text-grey-45">
      <span class="flex items-center">
        <i class="iconfont icon-attach text-grey-45 text-sm mr-1"></i>
        {{ fileName }}
      </span>
      <v-btn class="!px-0 scale-50" size="x-small" height="36" @click="clearThisFile">
        <i class="iconfont icon-guanbi !text-base"></i>
      </v-btn>
    </p>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: new File([], ''),
  },
})

const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  },
})
const fileName = ref('')

const emit = defineEmits(['update:modelValue'])

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0] as File
  if (file) {
    fileName.value = file.name
    value.value = file
  }
}

const clearThisFile = () => {
  fileName.value = ''
  value.value = {} as File
  const fileInput = document.getElementById('docpicker') as HTMLInputElement
  if (fileInput) {
    fileInput.value = ''
  }
}

onBeforeUnmount(() => {
  clearThisFile()
})

</script>