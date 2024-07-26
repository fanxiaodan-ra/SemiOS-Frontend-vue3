<template>
  <v-tooltip :text="hash" location="top start" :key="hash">
    <template v-slot:activator="{ props }">
      <p class="truncate mb-0" v-bind="props">
        {{hash.slice(0, before)}}...{{hash.slice(-after)}}
      </p>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  before: {
    type: Number,
    default: 6,
    required: false,
  },
  after: {
    type: Number,
    default: 4,
    required: false,
  },
  hash: {
    type: String,
    required: true,
  },
});

</script>