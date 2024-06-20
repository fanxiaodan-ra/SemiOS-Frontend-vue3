<template>
  <div
    class="dao-title"
    v-if="store.addNodeType > 0 && store.addNodeType < 6"
  >
    <div class="title-tap">
      <div v-for="(item, index) in titles" :key="item.name">
        <div class="title-name" v-if="index < 5">
          <span
            class="name-icon"
            :class="store.addNodeType >= index + 1 ? 'activeType' : ''"
          >
            <span v-if="store.addNodeType > index + 1">
              <i class="iconfont icon-check"
            /></span>
            <span v-else>{{ index + 1 }}</span>
          </span>
          {{ item.name }}
        </div>
        <div class="parting" v-if="index < 4"></div>
      </div>
    </div>
  </div>
  <div v-if="store.addNodeType > 0 && titles.length > 0">
    <h2>
      {{ titles[store.addNodeType - 1]['name'] }}
    </h2>
    <v-divider class="my-divider"></v-divider>
    <div class="title-text my-mgt16">
      {{ titles[store.addNodeType - 1]['text'] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store'
const store = useUserStore()

// const titleNames = [
//   {
//     name: 'Seed Nodes Asset Type',
//     text: "These parameters determine the asset types of Seed Nodes. 'Input Token'  usually refers to the mint fee, while 'Output Token' is usually used for incentives. Please note that the Asset Types cannot be changed once Seed Nodes are set up successfully, all subsequent Subnodes will follow these two Asset Types. If 'Output Token' is 'Generate' mode, Semios will automatically create an ERC-20 contract and mint 1 billion ERC-20 tokens to the ‘Treasury’  You can view and choose how to allocate these ERC-20 tokens through the 'Treasury' in the 'Seed Nodes' . If 'Import'  mode is selected, the 'Treasury Deposit' function can be used to import ERC-20 tokens into the Treasury.",
//   },
//   {
//     name: 'Nodes Block Parameters',
//     text: 'These parameters primarily shape the life cycle, ERC-20 Token type, and ERC-20 supply of the Nodes. Block rewards are triggered only once per mint window, contingent on the occurrence of minting activities. The reward amount is determined by dividing the Asset Pool balance during minting by the remaining number of mint windows.',
//   },
//   {
//     name: 'Nodes Works Parameters',
//     text: 'These parameters mainly define the work price related parameters.',
//   },
//   {
//     name: 'Nodes Tokenomics Structure',
//     text: 'These parameters are utilized to determine the allocation of the Block Reward. The distribution of rewards involves two levels. Initially, the block reward is allocated in Nodes Level. If Nodes Internal Incentives is specified, this portion of the assets will be allocated based on the respective contributions of Nodes members.',
//   },
//   {
//     name: 'Nodes Strategies',
//     text: 'Strategies are used to determine whether a user is eligible to add or mint work under this Nodes. The order of strategies reflects their priority, with the uppermost strategy having a higher priority.',
//   },
//   {
//     name: 'Setup Nodes',
//     text: '',
//   },
// ]
const titles = ref<any>([])
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
onMounted(() => {
  titles.value = tm('NodesHeader.titles')
})
</script>
<style lang="scss" scoped>
.dao-title {
  margin-top: 24px;
  .title-tap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    color: #9e9e9e;
    font-feature-settings: 'clig' off, 'liga' off;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    div {
      display: flex;
      align-items: center;
    }
    .name-icon {
      width: 24px;
      height: 24px;
      background-color: #282f41;
      border-radius: 24px;
      margin-right: 6px;
      text-align: center;
      display: block;
      line-height: 24px;
    }
    .parting {
      width: 60px;
      height: 1px;
      background: #3f4964;
      margin: 0 12px;
    }
    .activeType {
      background-color: #745cd4;
      color: #fff;
    }
  }
}
.boxcenter {
  justify-content: center;
}
.title-name {
  color: #9e9e9e;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
}
.title-text {
  color: #9e9e9e;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  width: 70%;
  margin: 0 auto;
}
h2 {
  color: #f3f3f3;
  font-family: Inter;
  font-size: 20px;
  font-weight: 500;
  height: 84px;
  line-height: 84px;
  text-align: center;
}
</style>
