<template>
  <h4 class="text-white text-xl font-medium m-0 flex flex-1 !items-center ">
    {{ daoName }}
    <template v-if="showDaoType">
      <span class="erc20-name leading-5 text-grey-1 text-xs font-normal ml-2">{{ erc20Name }}</span>
      <img :src="daoImg" class="dao-img w-[84px] h-5 ml-4" :alt="daoImg"/>
    </template>
  </h4>
</template>
<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { truncateString } from '@/utils'
import { hasIn } from 'lodash';
import seedNodesImg from '@/assets/images/seedNodes.png'
import subNodesImg from '@/assets/images/subNodes.png'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const daoName = computed(() => truncateString(props.dataObj.daoName))
const erc20Name = computed(() => truncateString(props.dataObj.erc20Name))
const showDaoType = computed(() => hasIn(props.dataObj, 'isAncestorDao'))
const daoImg = computed(() => {
  if (showDaoType) {
    return props.dataObj.isAncestorDao ? seedNodesImg : subNodesImg
  }
  return ''
})
</script>
