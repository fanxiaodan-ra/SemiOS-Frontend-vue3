<template>
  <v-dialog v-model="props.isDialog" :persistent="true" :no-click-animation="true" :width="props.width">
    <v-card class="bg-card-1">
      <div class="mode-title fw4 fti">
        {{ props.title }}
        <v-btn class="cancel-btn" variant="text" @click="cancelDialog">
          <i class="iconfont icon-guanbi ft12"></i>
        </v-btn>
      </div>
      <v-card-actions :class="cardActionsClass">
        <slot></slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts" setup>
const props = defineProps({
  isDialog: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '400',
  },
  cardActionsClass: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['cancelDialog'])
const cancelDialog = () => {
  emit('cancelDialog')
}
</script>

<style lang="scss" scoped>
:deep(.v-card-actions) {
  // margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
