<template>
  <div class="no-data font-bold">
    <div>
      <p><v-icon>mdi-clock-time-eight-outline</v-icon></p>
      <h4>{{ props.title }}</h4>
      <h5>{{ props.text }}</h5>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
})
</script>

<style scoped lang="scss">
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  text-align: center;
  i {
    font-size: 28px;
    color: #2F305B;
  }
  h4 {
    margin: 12px 0;
    font-size: 14px;
    color: #757575;
  }
  h5 {
    margin: 0;
    font-size: 14px;
    color: #9e9e9e;
  }
}
</style>
