<template>
  <v-expansion-panels>
    <v-expansion-panel
      expand-icon="none"
      collapse-icon="none"
    >
      <template v-slot:title>
        <ThinBtn
          :text="$t('fork.forkSubNode')"
          class-name="mb-2"
          @click="initParams"
        />
      </template>
      <v-expansion-panel-text class="bg-grey-1 rounded-sm p-4 mb-2">
        <h6 class="text-base text-w-90 mb-2 font-medium">
          {{ $t('AddNodeName.title') }}
        </h6>
        <p class="text-xs text-w-55 mb-2">
          {{ $t('AddNodeName.info') }}
        </p>
        <div class="flex flex-col items-center w-full">
          <node-name
            ref="nodeNameRef"
            v-model="daoName"
            :submit="submit"
            :errorMessage="errorMessage"
          />
          <v-btn
            class="btnmo btnz text-none mt-6"
            size="large"
            type="submit"
            :loading="btnLoading"
            @click="submit"
          >{{ $t('AddNodeName.sub') }}</v-btn>
        </div>
        
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup lang="ts">
import { ref, watch, computed, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router';
import { isEmpty } from 'lodash';
import ThinBtn from '@/components/ThinBtn.vue'
import NodeName from '@/views/addNodes/components/NodeName.vue';
import useNameSubmit from '@/views/addNodes/hooks/useNameSubmit';
import useSetupDaoStore from '@/store/setupDao';

const route = useRoute()
const setupDaoStore = useSetupDaoStore()

const daoName = ref('')
const nodeNameRef = ref()
const nameSubmitRes = ref()
const paramsLoading = ref(false)

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

const initParams = async () => {
  if (!isEmpty(setupDaoStore.initData)) return
  try {
    paramsLoading.value = true
    setupDaoStore.initDaoParams({
      daoId: route.query.id as string,
    })
  } catch (error) {
    console.error(error)
  } finally {
    paramsLoading.value = false
  }
}

onBeforeUnmount(() => {
  setupDaoStore.initData = {}
})

watch(
  () => [nodeNameRef.value, daoName.value],
  () => {
    nameSubmitRes.value = useNameSubmit(
      emit,
      daoName.value,
      nodeNameRef.value?.formRef,
    )
  },
  { immediate: true }
)

</script>
<style scoped lang="scss">
:deep(.v-expansion-panel) {
  background-color: transparent;
}
:deep(.v-expansion-panel-title__overlay) {
  display: none;
}
:deep(.v-expansion-panel-title) {
  min-height: auto!important;
  padding: 0;
}
:deep(.v-expansion-panel-text__wrapper) {
  padding: 0;
}
</style>