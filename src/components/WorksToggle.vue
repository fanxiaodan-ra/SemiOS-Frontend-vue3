<template>
  <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
    <v-btn-toggle v-model="workType" divided>
      <v-btn icon="mdi-format-align-right"></v-btn>
      <v-btn icon="mdi-format-align-justify"></v-btn>
    </v-btn-toggle>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
const workType = ref(1)
const emit = defineEmits(['setFormDate'])
onMounted(() => {
  // emit('setFormDate', formatDate.value)
})
</script>

<style lang="scss" scoped></style>
