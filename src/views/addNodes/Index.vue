<template>
  <AddNodeName
    @setDaoName="setDaoName"
    @setIsModeSelection="setIsModeSelection"
    v-if="store.addNodeType === 0"
  />
  <AddNodeForm
    @setAddType="setAddType"
    :initData="initData"
    :daoName="daoName"
    v-if="store.addNodeType !== 0"
  />
  <SelectionOrBase
    from="setupDao"
    :daoName="daoName"
    :isModeSelection="isModeSelection"
    @setIsModeSelection="setIsModeSelection"
  />
</template>
<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import AddNodeName from './AddNodeName.vue'
import AddNodeForm from './AddNodeForm.vue'
import SelectionOrBase from './SelectionOrBase.vue'
import useUserStore from '@/store'
import useSetupDaoStore from '@/store/setupDao'
import { useRoute } from 'vue-router'

const route = useRoute()
const store = useUserStore()
const setupDaoStore = useSetupDaoStore()

const daoName = ref('')
const setDaoName = (val: string) => {
  daoName.value = val
}

const isModeSelection = ref(false)
const setIsModeSelection = (val: boolean) => {
  isModeSelection.value = val
}

const initData = computed(() => setupDaoStore.initData)
onMounted(() => {
  if (route.query.id) {
    setupDaoStore.initDaoParams({
      daoId: route.query.id as string,
    })
  } else {
    setupDaoStore.clearInitData()
  }
})
const setAddType = (val: number) => {
  store.setNodeType(val)
}
watch(() => route.query.type, (val) => {
  const type = Number(val) || 0
  setAddType(type)
}, { immediate: true })

watch(() => route.query.daoName, (val) => {
  if (val) {
    setDaoName(val as string)
  }
}, { immediate: true })
</script>
