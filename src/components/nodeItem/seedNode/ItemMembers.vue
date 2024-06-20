<template>
  <div class="current-top">
    <v-row align="start" no-gutters class="current-num">
      <v-col cols="4">
        {{ props.dataObj.togetherDaoMemberVo.starter }}
      </v-col>
      <v-col class="my-flexaj" cols="4">
        {{ props.dataObj.togetherDaoMemberVo.builder }}
      </v-col>
      <v-col cols="4">
        {{ props.dataObj.togetherDaoMemberVo.mintter }}
      </v-col>
    </v-row>
    <v-row align="start" no-gutters class="current-name">
      <v-col cols="4">Starters</v-col>
      <v-col cols="4"> Builders</v-col>
      <v-col cols="4"> Minters</v-col>
    </v-row>
  </div>
  <div>
    <v-row align="start" no-gutters class="current-num">
      <v-col class="my-flexaj" cols="4">
        {{ props.dataObj.togetherDaoMemberVo.nftHolders }}
      </v-col>
      <v-col class="my-flexaj" cols="4">
        {{ props.dataObj.togetherDaoMemberVo.erc20Holders }}
      </v-col>
    </v-row>
    <v-row align="start" no-gutters class="current-name">
      <v-col cols="4"> NFT Holders</v-col>
      <v-col cols="4"> ERC-20 Holders</v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
</script>

<style scoped lang="scss">
.current-top {
  margin-bottom: 16px;
}
.current-num {
  color: #fff;
  font-size: 16px;
}
.current-name {
  color: #9e9e9e;
  font-size: 14px;
  font-weight: 400;
}
</style>
