<template>
  <v-card class="mx-auto my-8 !bg-transparent" width="500" min-height="360" elevation="12" v-show="props.addType === 0">
    <v-card-item>
      <div class="card-img">
        <i class="iconfont icon-logozuhe ft42 fc8"></i>
      </div>
      <v-card-title class="my-mgt24 ft40 ftr my-mgb24">
        <!-- Name your Nodes -->
        {{ $t('AddNodeName.title') }}
      </v-card-title>
      <v-card-subtitle class="ft16 fw3 fc9 ftr my-mgb24">
        <!-- An attractive name will make people flock to it. -->
        {{ $t('AddNodeName.info') }}
      </v-card-subtitle>
      <div class="my-mgb24">
        <node-name
          ref="nodeNameRef"
          v-model="daoName"
          :submit="submit"
          :errorMessage="errorMessage"
        />
      </div>
      <v-btn block class="btnmo btnz text-none" size="large" type="submit" :loading="btnLoading" @click="submit">{{
        $t('AddNodeName.sub') }}</v-btn>
    </v-card-item>
  </v-card>
</template>
<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import NodeName from './components/NodeName.vue'
import useNameSubmit from './hooks/useNameSubmit'
const props = defineProps({
  addType: {
    type: Number,
    default: 0,
  },
})

const daoName = ref('')
const nodeNameRef = ref()
const nameSubmitRes = ref()

const submit = computed(() => {
  return nameSubmitRes.value.submit
})
const errorMessage = computed(() => {
  return nameSubmitRes.value.errorMessage
})
const btnLoading = computed(() => {
  return nameSubmitRes.value.btnLoading
})


const emit = defineEmits(['setDaoName', 'setIsModeSelection'])

watch(
  () => [nodeNameRef.value, daoName.value],
  () => {
    nameSubmitRes.value = useNameSubmit(
      emit,
      daoName.value,
      nodeNameRef.value?.formRef
    )
  },
  { immediate: true }
)

</script>
<style lang="scss" scoped>
.v-card {
  box-shadow: none !important;
}
:deep(.v-field__input) {
  font-size: 2.25rem !important;
}
:deep(.v-field__field) {
  background-color: #1A1F2E !important;
}
:deep(.v-card-subtitle) {
  opacity: 1;
}
:deep(.v-messages__message) {
  line-height: 16px;
}
:deep(.v-form) {
  min-height: 6.5rem !important;
}
.v-card .v-card-title {
  line-height: 2.5rem;
}
.newLength {
  color: black;
}
</style>
