<template>
  <v-card
    class="mx-auto my-pd24 max-w-[1200px] my-mgt24 my-mgb24"
    elevation="12"
  >
    <h3 class="node-name" v-if="store.addNodeType === 6">
      {{ $t('AddFormNodesStrategies.title') }}
    </h3>
    <div>
      <FormNodesBuilder
        :form-input="formData"
        @setFormData="setFormData"
        :form-data-prop="props.formDataProp"
      />
      <FormNodesMinter
        :form-input="formData"
        @setFormData="setFormData"
        :form-data-prop="props.formDataProp"
      />
    </div>
    <div class="dflex flex-jc my-mgb24 my-mgt24" v-if="store.addNodeType !== 6">
      <v-btn
        block
        class="btnb fc7 text-none mr-10"
        type="submit"
        @click="setAddType(4)"
        >{{ t('common.back') }}</v-btn
      >
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="setAddType(6)"
        >{{ t('common.next') }}</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import FormNodesBuilder from './FormNodesBuilder.vue'
import FormNodesMinter from './FormNodesMinter.vue'
import { ref } from 'vue'
import useUserStore from '@/store'
import { t } from '@/lang'
const store = useUserStore()
const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => {},
  },
})
const formData = ref<any>({
  workBlacklistAddress: [],
  workWhitelistAddress: [],
  workErclistAddress: [],
  workNftlistAddress: [],
  mintingBlacklistAddress: [],
  mintingWithMaxlistAddress: [],
  mintingWithUnlimitedlistAddress: [],
  mintingErcWithMaxlistAddress: [],
  mintingErcWithUnlimitedlistAddress: [],
  mintingCapForDaolistAmount: [],
  mintingNftWithMaxlistAddress: [],
})

const emit = defineEmits(['setFormData'])
const setFormData = (val: any) => {
  formData.value = {
    ...formData.value,
    ...val,
  }
  emit('setFormData', { formVal: formData })
}
const setAddType = async (val: number) => {
  store.setNodeType(val)
  window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
</style>
