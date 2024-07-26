<template>
  <div class="mt-[280px]">
    <div class="noList">
      {{ t('common.noItems') }}
    </div>
    <v-btn block class="btnz text-none" type="submit" @click="goPage()">Back to all items</v-btn>
  </div>
</template>
<script setup lang="ts">
import { t } from '@/lang'
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
  path: {
    type: String,
    default: '/explore',
  },
  query: {
    type: Object,
    default: () => {},
  },
})


const goPage = () => {
  router.push({
    path: props.path,
    query: props.query,
  })
}
</script>
<style scoped>
.noList {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbbaba;
  font-size: 18px;
  margin: 42px 0;

  .xian {
    height: 1px;
    width: 45px;
    background-color: #d9d9d9;
    margin: 0 15px;
  }
}
</style>