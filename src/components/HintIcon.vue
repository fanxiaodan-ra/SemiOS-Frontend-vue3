<template>
  <v-tooltip :text="title" location="top">
    <template v-slot:activator="{ props }">
      <i :class="`iconfont ${icon} ${classes}`" v-bind="props"></i>
    </template>
  </v-tooltip>
</template>
<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    classes: {
      type: String,
      default: '',
    }
  })
</script>