<template>
  <v-card class="mx-auto my-pd24 my-mw80 my-mgt24 my-mgb24" elevation="16">
    <h3
      class="node-name"
      v-if="store.addNodeType === 6 && !route.query.id"
    >
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
    <div
      class="dflex flex-jc my-mgb24 my-mgt24"
      v-if="store.addNodeType !== 6"
    >
      <v-btn block class="btnz text-none" type="submit" @click="setAddType(2)"
        >Next</v-btn
      >
    </div>
  </v-card>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import { ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
import useUserStore from '@/store'
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
const inputTokenList: any = ref([])
import { TOKENLIST } from '@/config'
inputTokenList.value = [...TOKENLIST]
import { ethers } from 'ethers'
import { getCode } from '@/common/web3service'
import { filterHash } from '@/utils'
const formData = reactive({
  inputToken: '0x0000000000000000000000000000000000000000',
  inputTokenErc20ContractAddress: '',
  thirdParty: false,
  erc20ContractAddress: '',
})
const rules = [
  (value: any) => !!value || 'Field is required',
  async (value: any) => {
    const strArr = value.match(/^(0x)?[0-9a-fA-F]{40}$/)
    const isAddress = ethers.utils.isAddress(value)
    if (!strArr || !isAddress) {
      return 'Wrong address please modify and resubmit.'
    }
    const isCode = await getCode(value)
    if (!isCode) {
      return 'Invalid ERC-20 Contract'
    }
    if (formData.inputToken !== '0x0000000000000000000000000000000000000000') {
      const inputToken = filterHash(formData.inputTokenErc20ContractAddress)
      const outputToken = filterHash(formData.erc20ContractAddress)
      if (
        inputToken !== '' &&
        outputToken !== '' &&
        inputToken === outputToken
      ) {
        return 'Input token and Output token cannot be the same ERC-20 contract address.'
      }
    }
    return true
  },
]

const setSelect = (val: string) => {
  if (val === '0x0000000000000000000000000000000000000000' || val === 'Input') {
    formData.inputTokenErc20ContractAddress = ''
  } else {
    formData.inputTokenErc20ContractAddress = val
  }
}

const setGroup = () => {
  formData.erc20ContractAddress = ''
}
const emit = defineEmits(['setFormData'])
watch(
  () => formData,
  (value) => {
    console.log(value, 'value')
    emit('setFormData', value)
  },
  { deep: true }
)
watch(
  () => props.initData,
  (value) => {
    if (value.payCurrencyType === 'ETH') {
      formData.inputToken = '0x0000000000000000000000000000000000000000'
      formData.inputTokenErc20ContractAddress = ''
    } else {
      formData.inputToken = 'Input'
      formData.inputTokenErc20ContractAddress = value.inputTokenAddress
    }
    emit('setFormData', formData)
  },
  { deep: true }
)
const formRef = ref()
const setAddType = async (val: number) => {
  const { valid } = await formRef.value.validate()
  if (!valid) return false
  emit('setFormData', formData)
  store.setNodeType(val)
  window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped></style>
