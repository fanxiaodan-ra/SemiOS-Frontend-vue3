<template>
  <div>
    <v-form ref="formRef">
      <h4 class="ftr my-mgb24">
        {{
          $t('AddFormTokenomicsStructure.assetsInteractswithOtherNodesLabel')
        }}
        <i class="iconfont icon-info">
          <v-tooltip activator="parent" location="top" max-width="300">
            {{
              $t('AddFormTokenomicsStructure.assetsInteractswithOtherNodesTip')
            }}
          </v-tooltip>
        </i>
      </h4>
      <FormRow
        class="my-mgb12"
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.ethToOtherNodesLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.ethToOtherNodesTip')"
      >
        <v-row no-gutters class="no-def">
          <v-col
            v-for="(item, idx) in ETHOtherNodesList"
            :key="item.projectId"
            :class="idx % 2 == 0 ? 'my-pr12' : 'my-pl12'"
            cols="12"
            sm="6"
            class="col-color-e"
          >
            <v-text-field
              :label="item.daoName"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="item.value"
              disabled
            >
              <template v-slot:append>
                <span class="delete-ipput" @click="deleteETHOtherNodes(idx)">
                  <v-icon color="#745cd4"> mdi-trash-can-outline </v-icon></span
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn
          border
          class="text-none btnmo btnb ftr fc7"
          prepend-icon="mdi-plus"
          variant="text"
          block
          size="large"
          style="width: 100%"
          @click="addETHOtherNodesDialog"
        >
          {{ $t('AddFormTokenomicsStructure.addBtn') }}
        </v-btn>
      </FormRow>

      <FormRow
        class="my-mgb12"
        :importance="false"
        :input-name="$t('AddFormTokenomicsStructure.erc20ToOtherNodesLabel')"
        :tooltip-text="$t('AddFormTokenomicsStructure.erc20ToOtherNodesTip')"
      >
        <v-row no-gutters class="no-def">
          <v-col
            v-for="(item, idx) in ERCOtherNodeslist"
            :key="item.projectId"
            :class="idx % 2 == 0 ? 'my-pr12' : 'my-pl12'"
            cols="12"
            sm="6"
            class="col-color-f"
          >
            <v-text-field
              :label="item.daoName"
              density="comfortable"
              append-inner-icon="mdi-percent-outline"
              v-model="item.value"
              disabled
            >
              <template v-slot:append>
                <span class="delete-ipput" @click="deleteERCAllocations(idx)">
                  <v-icon color="#745cd4"> mdi-trash-can-outline </v-icon></span
                >
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-btn
          border
          class="text-none btnmo btnb ftr fc7"
          prepend-icon="mdi-plus"
          variant="text"
          block
          size="large"
          style="width: 100%"
          @click="addERCOtherNodesDialog"
        >
          {{ $t('AddFormTokenomicsStructure.addBtn') }}
        </v-btn>
      </FormRow>
    </v-form>
    <DialogETHFormStructureAssetsInteracts
      :isDialog="isAddEthDialog"
      :ETHOtherNodesList="ETHOtherNodesList"
      @cancelEthDialog="cancelEthDialog"
      @addEthData="addEthData"
      :daos="daos"
      :title-num="props.formDataProp.nodesReservesRatioETH"
    />

    <DialogERCFormStructureAssetsInteracts
      :isDialog="isAddErcDialog"
      :ERCOtherNodeslist="ERCOtherNodeslist"
      @cancelErcDialog="cancelErcDialog"
      @addERCData="addERCData"
      :daos="tokenDaos"
      :title-num="props.formDataProp.nodesReservesRatioERC20"
    />
  </div>
</template>

<script setup lang="ts">
import FormRow from '@/components/FormRow.vue'
import DialogETHFormStructureAssetsInteracts from './DialogETHFormStructureAssetsInteracts.vue'
import DialogERCFormStructureAssetsInteracts from './DialogERCFormStructureAssetsInteracts.vue'
import { ref, onMounted } from 'vue'
const props = defineProps({
  formDataProp: {
    type: Object,
    default: () => {},
  },
  initData: {
    type: Object,
    default: () => {},
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const isAddEthDialog = ref(false)

const addETHOtherNodesDialog = () => {
  isAddEthDialog.value = true
}
const cancelEthDialog = () => {
  isAddEthDialog.value = false
}
const emit = defineEmits(['setETHOtherFormData', 'setERCOtherFormData'])
const ETHOtherNodesList = ref<any>([])
const addEthData = (val: any) => {
  console.log(val, 'val')
  ETHOtherNodesList.value.push({ ...val })
  emit('setETHOtherFormData', ETHOtherNodesList.value)
}
const deleteETHOtherNodes = (idx: number) => {
  ETHOtherNodesList.value.splice(idx, 1)
  emit('setETHOtherFormData', ETHOtherNodesList.value)
}

const isAddErcDialog = ref(false)
const addERCOtherNodesDialog = () => {
  isAddErcDialog.value = true
}
const cancelErcDialog = () => {
  isAddErcDialog.value = false
}
const ERCOtherNodeslist = ref<any>([])
const addERCData = (val: any) => {
  ERCOtherNodeslist.value.push({ ...val })
  emit('setERCOtherFormData', ERCOtherNodeslist.value)
}
const deleteERCAllocations = (idx: number) => {
  ERCOtherNodeslist.value.splice(idx, 1)
  emit('setERCOtherFormData', ERCOtherNodeslist.value)
}

const daos = ref<any[]>([])
const tokenDaos = ref<any[]>([])
import { useRoute } from 'vue-router'
const route = useRoute()
import { allcationList } from '@/api/daos'
const getDaoList = async () => {
  if (!route.query.id) return
  const res = (await allcationList({ daoId: route.query.id, type: 1 })) as any
  daos.value = res.dataList.filter((item: any) => item.topupMode !== true)
  tokenDaos.value = res.dataList
  console.log(res, 'resresres')
}
onMounted(() => {
  getDaoList()
  if (props.isEdit) {
    ETHOtherNodesList.value = props.initData.daoEthAllocationVos.map(
      (item: any) => {
        return {
          name: item.projectId,
          value: item.royaltyProportion,
          daoName: item.daoName,
        }
      }
    )
    ERCOtherNodeslist.value = props.initData.daoTokenAllocationVos.map(
      (item: any) => {
        return {
          name: item.projectId,
          value: item.royaltyProportion,
          daoName: item.daoName,
        }
      }
    )
  }
  emit('setERCOtherFormData', ERCOtherNodeslist.value)
  emit('setETHOtherFormData', ETHOtherNodesList.value)
})
</script>

<style lang="scss" scoped>
h4 {
  text-align: center;
}
.col-color-f {
  :deep(.v-field__input) {
    color: #f282be;
  }
}
.col-color-e {
  :deep(.v-field__input) {
    color: #ef8c44;
  }
}
:deep(.v-input--horizontal .v-input__append) {
  margin-inline-start: 12px;
}
.delete-ipput {
  cursor: pointer;
}
.no-def {
  :deep(.v-input--disabled) {
    pointer-events: all;
  }
}
</style>
