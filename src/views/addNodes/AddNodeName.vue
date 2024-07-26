<template>
  <v-card
    class="mx-auto my-8 !bg-transparent"
    width="500"
    min-height="360"
    elevation="12"
    v-show="props.addType === 0"
  >
    <v-card-item>
      <div class="card-img">
        <i class="iconfont icon-a-SEMIOSlogozuhe ft42 fc8"></i>
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
        <v-form ref="formRef" @submit.prevent="submit">
          <v-text-field
            v-model="formData.daoName"
            label="Name"
            :rules="rules"
            :error-messages="errorMessage"
            hide-details="auto"
          ></v-text-field>
        </v-form>
      </div>
      <v-btn
        block
        class="btnmo btnz text-none"
        size="large"
        type="submit"
        :loading="btnLoading"
        @click="submit"
        >{{ $t('AddNodeName.sub') }}</v-btn
      >
    </v-card-item>
  </v-card>
</template>
<script setup lang="ts">
import { checkName } from '@/api/daos'
import { ref, reactive } from 'vue'
import useAccount from '@/hooks/useAccount'
const props = defineProps({
  addType: {
    type: Number,
    default: 0,
  },
})
const formData = reactive({
  daoName: '',
})
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const rules = [
  (value: any) => !!value || t('AddNodeName.err.name_no'),
  (value: any) =>
    (value && value.length <= 45) ||
    t('AddNodeName.err.name_len', [value.length]),
  // `Ensure this value has at most 45 characters ( it has ${value.length} ).`,
]

const errorMessage = ref<string[]>([])
const formRef = ref()
const btnLoading = ref(false)

const { getTrading } = useAccount()

const emit = defineEmits(['setDaoName', 'setIsModeSelection'])
const submit = async () => {
  const isTrad = await getTrading()
  console.log(isTrad, 'isTrad')
  if (!isTrad) return
  btnLoading.value = true
  const { valid } = await formRef.value.validate()
  if (!valid) return (btnLoading.value = false)
  const data = {
    name: formData.daoName,
    type: 0,
  }
  try {
    await checkName(data)
    emit('setDaoName', formData.daoName)
    emit('setIsModeSelection', true)
    errorMessage.value = []
  } catch (e: any) {
    errorMessage.value = [e.resultDesc]
  }
  btnLoading.value = false
}
</script>
<style lang="scss" scoped>
.v-card {
  /* background-color: #151925 !important; */
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
