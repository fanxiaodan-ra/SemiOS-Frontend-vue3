<template>
  <div class="dflex flex-ai">
    <div :style="{ width: props.leftWidth }" class="input-name ft14">
      <span class="fc7" v-if="props.importance">*</span>
      {{ props.inputName }}
      <i class="iconfont icon-info align-[-1px]" v-if="props.isIcon">
        <v-tooltip activator="parent" location="top" max-width="300">
          {{ props.tooltipText }}
        </v-tooltip>
      </i>
    </div>
    <div style="flex: 1">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  inputName: {
    type: String,
    default: 'Start Date',
  },
  leftWidth: {
    type: String,
    default: '320px',
  },
  tooltipText: {
    type: String,
    default: '',
  },
  isIcon: {
    type: Boolean,
    default: true,
  },
  importance: {
    type: Boolean,
    default: true,
  },
})
</script>

<style lang="scss" scoped>
.input-name {
  margin-inline-end: 16px;
  height: 56px;
  place-self: flex-start;
  line-height: 56px;
  color: #9e9e9e;
  text-align: end;
}
</style>
