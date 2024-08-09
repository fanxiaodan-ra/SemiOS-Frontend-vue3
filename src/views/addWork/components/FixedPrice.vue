<template>
  <v-row no-gutters>
    <v-col cols="6" class="text-sm text-grey-1 flex items-center">
      {{ t('common.curPrice') }}
    </v-col>
    <v-col cols="6" class="flex items-center justify-end">
      <v-text-field
        :label="t('common.setPriceLabel')"
        variant="outlined"
        density="compact"
        v-model="value"
        :rules="[
          (v: any) => !!v || t('common.required'),
          (v: any) => v >= 0.0001 || t('common.greaterThanZeroOne'),
        ]" 
        type="number"
        @update:modelValue="
          setInput(value, 4, 0.0001, 1000000000)
        ">
      </v-text-field>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import { t } from '@/lang'
import { defineProps, defineEmits, ref } from 'vue'
import { oninputNum } from '@/utils'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
})
const value = ref(props.modelValue)

const emits = defineEmits(['update:modelValue'])

const setInput = (
  val: string | number,
  position = 0,
  min = 0,
  max = Infinity
) => {
  const inputNum = oninputNum(val, position, min, max)
  emits('update:modelValue', inputNum)
}

defineExpose({
  value,
})

</script>
