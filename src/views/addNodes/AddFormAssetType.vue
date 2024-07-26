<template>
  <v-card
    class="mx-auto my-pd24 my-mgt24 my-mgb24 max-w-[1200px]"
    elevation="12"
  >
    <h3 class="node-name" v-if="store.addNodeType === 6 && !route.query.id">
      {{ $t('AddFormAssetType.title') }}
    </h3>
    <v-form ref="formRef">
      <FormRow
        :input-name="$t('AddFormAssetType.inputTokenLabel')"
        :tooltip-text="$t('AddFormAssetType.inputTokenTip')"
      >
        <v-select
          v-model="formData.inputToken"
          label="Select"
          :items="inputTokenList"
          item-title="label"
          item-value="value"
          @update:modelValue="setSelect"
        ></v-select>
      </FormRow>
      <v-expand-transition>
        <FormRow
          :input-name="
            $t('AddFormAssetType.inputTokenErc20ContractAddressLabel')
          "
          :tooltip-text="
            $t('AddFormAssetType.inputTokenErc20ContractAddressTip')
          "
          v-if="formData.inputToken === 'Input'"
        >
          <v-text-field
            :label="
              $t('AddFormAssetType.inputTokenErc20ContractAddressPlaceholder')
            "
            density="comfortable"
            :rules="rules"
            v-model="formData.inputTokenErc20ContractAddress"
          >
          </v-text-field>
        </FormRow>
      </v-expand-transition>
      <FormRow
        :input-name="$t('AddFormAssetType.thirdPartyLabel')"
        :tooltip-text="$t('AddFormAssetType.thirdPartyTip')"
        :importance="false"
        ><v-radio-group
          v-model="formData.thirdParty"
          @update:modelValue="setGroup"
          inline
        >
          <v-radio
            v-for="item in outputType"
            :key="item.label"
            :label="item.label"
            :value="item.value"
            color="#745cd4"
          >
          </v-radio>
        </v-radio-group>
      </FormRow>
      <v-expand-transition>
        <FormRow
          :input-name="$t('AddFormAssetType.erc20ContractAddressLabel')"
          :tooltip-text="$t('AddFormAssetType.erc20ContractAddressTip')"
          v-if="formData.thirdParty"
        >
          <v-text-field
            :label="$t('AddFormAssetType.erc20ContractAddressPlaceholder')"
            density="comfortable"
            :rules="rules"
            v-model="formData.erc20ContractAddress"
          >
          </v-text-field>
        </FormRow>
      </v-expand-transition>
    </v-form>
    <div class="dflex flex-jc my-mgb24 my-mgt24" v-if="store.addNodeType !== 6">
      <v-btn
        block
        class="btnz text-none"
        type="submit"
        @click="setAddType(2)"
        >{{ t('common.next') }}</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useUserStore from '@/store'
import { TOKENLIST } from '@/config'
import { ethers } from 'ethers'
import { getCode } from '@/common/web3service'
import { filterHash } from '@/utils'
import { t } from '@/lang'
const route = useRoute()
const store = useUserStore()
const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => {},
  },
  initData: {
    type: Object,
    default: () => {},
  },
})
const outputType = [
  { label: 'Generate', value: false },
  { label: 'Import', value: true },
]
const inputTokenList: any = ref([...TOKENLIST])

const formData = ref({
  inputToken: '0x0000000000000000000000000000000000000000',
  inputTokenErc20ContractAddress: '',
  thirdParty: false,
  erc20ContractAddress: '',
  initData: {},
})

const formRef = ref()
const rules = [
  (value: any) => !!value || t('common.fieldRequired'),
  async (value: any) => {
    const strArr = value.match(/^(0x)?[0-9a-fA-F]{40}$/)
    const isAddress = ethers.utils.isAddress(value)

    if (!strArr || !isAddress) {
      return t('AddFormAssetType.wrongAddress')
    }
    const isCode = await getCode(value)
    if (!isCode) {
      return t('AddFormAssetType.invalidERC20Contract')
    }
    if (
      formData.value.inputToken !== '0x0000000000000000000000000000000000000000'
    ) {
      const inputToken = filterHash(
        formData.value.inputTokenErc20ContractAddress
      )
      const outputToken = filterHash(formData.value.erc20ContractAddress)
      if (
        inputToken !== '' &&
        outputToken !== '' &&
        inputToken === outputToken
      ) {
        return t('AddFormAssetType.inTAndOutTBeTheSame')
      }
    }
    return true
  },
]
const setSelect = (val: string) => {
  if (val === '0x0000000000000000000000000000000000000000' || val === 'Input') {
    formData.value.inputTokenErc20ContractAddress = ''
  } else {
    formData.value.inputTokenErc20ContractAddress = val
  }
  formRef.value.resetValidation()
}

const setGroup = () => {
  formData.value.erc20ContractAddress = ''
  formRef.value.resetValidation()
}
const emit = defineEmits(['setFormData'])

const validateForm = async (value: any) => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    emit('setFormData', {
      formVal: value,
      validVal: {
        position: 0,
        value: true,
      },
    })
    if (!valid) return false
  }
}
watch(
  () => formData,
  (value) => {
    validateForm(value)
  },
  { deep: true }
)
watch(
  () => props.initData,
  (value) => {
    if (route.query.id) {
      if (value.payCurrencyType === 'ETH') {
        formData.value.inputToken = '0x0000000000000000000000000000000000000000'
        formData.value.inputTokenErc20ContractAddress = ''
      } else {
        formData.value.inputToken = 'Input'
        formData.value.inputTokenErc20ContractAddress = value.inputTokenAddress
      }
      formData.value.initData = value
      validateForm(formData)
    }
  },
  { deep: true, immediate: true }
)
const validateNext = async () => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    return valid
  } else {
    return true
  }
}
defineExpose({
  validateNext,
})
const setAddType = async (val: number) => {
  if (formRef.value) {
    const { valid } = await formRef.value.validate()
    if (!valid) return false
    validateForm(formData)
    store.setNodeType(val)
    window.scrollTo(0, 0)
  }
}
</script>

<style lang="scss" scoped></style>
