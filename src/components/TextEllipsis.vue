<template>
  <v-tooltip :text="text" location="top start" :disabled="!isEllipsis" :key="text">
    <template v-slot:activator="{ props }">
      <p id="ellipsis" :class="`mb-0 text-ellipsis overflow-hidden text-nowrap inline ${className}`"
        :style="{ maxWidth: `${width}px` }" v-bind="props">
        <slot></slot>
      </p>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, onMounted, defineExpose } from 'vue';
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  className: {
    type: String,
    default: '',
  },
});
const isEllipsis = ref(false);

const ellipsis = ref<HTMLElement | null>(null);

onMounted(() => {
  ellipsis.value = document.getElementById('ellipsis');
});

watch(() => ellipsis.value, () => {
  if (ellipsis.value) {
    const { scrollWidth } = ellipsis.value;
    isEllipsis.value = scrollWidth >= props.width;
  }
}, { immediate: true });

defineExpose({
  isEllipsis,
  ellipsis,
});
</script>