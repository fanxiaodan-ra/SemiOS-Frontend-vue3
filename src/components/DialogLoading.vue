<template>
  <v-dialog
    v-model="props.isLoading"
    :persistent="true"
    :no-click-animation="true"
    width="400"
  >
    <v-card>
      <div class="mode-title fw4 fti">{{ props.title }}</div>
      <v-card-actions><Loading /> </v-card-actions>
      <p class="dialog-text my-pr24 my-pl24 my-pb24">
        {{ props.text }}
      </p>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
import Loading from '@/components/Loading.vue'
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: 'Setup Nodes',
  },
  text: {
    type: String,
    default:
      'Your Nodes is being created, it should be confirmed on the blockchain shortly.',
  },
})
</script>

<style lang="scss" scoped>
.flexbox {
  height: 120px;
}
.sk-circle-bounce {
  width: 3rem;
  height: 3rem;
}
</style>
