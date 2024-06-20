<template>
  <div class="up-box">
    <p class="text-p">You will bind the top-up balance to this NFT</p>
    <v-card class="my-mgt16 item-card" height="140" dark>
      <div class="item-img"><img :src="props.dataObj.imageUrl" alt="" /></div>
      <div class="item-body">
        <div class="item-left">
          <p>
            <span
              v-if="
                props.dataObj.royaltyTokenPrice !== null &&
                props.dataObj.royaltyTokenPrice !== ''
              "
              >{{ props.dataObj.royaltyTokenPrice }}
            </span>
            <span v-else>
              {{ props.dataObj.price }}
            </span>
            {{ props.dataObj.ethAmount }}
            <TokenIcon
              size="20px"
              :payCurrencyType="props.dataObj.payCurrencyType"
              :inputTokenAddress="props.dataObj.inputTokenAddress"
            />
          </p>
          <span class="name-span">ETH Balance</span>
        </div>
        <v-divider inset vertical color="#6062aa"></v-divider>
        <div class="item-right">
          <p>
            {{ props.dataObj.mintersMaxRewardToken }}
            <TokenIcon
              size="20px"
              :daoToken="true"
              :daoSymbol="props.dataObj.daoSymbol"
              :daoErc20Address="props.dataObj.daoErc20Address"
            />
          </p>
          <span class="name-span">Locked ERC-20 Tokens</span>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script lang="ts" setup>
import TokenIcon from '@/components/TokenIcon.vue'

const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  topUpMintList: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['setWorkItem'])
</script>

<style lang="scss" scoped>
.up-box {
  height: 400px;
  overflow: auto;
  padding: 0 6px;
}
.item-card {
  background-color: #252b3a !important;
  border: 1px solid #0000;
  box-sizing: border-box;
  display: flex;
}
.item-select {
  background-color: #3a435b !important;
  border-color: #745cd4;
}
.active-item-icon {
  position: absolute;
  right: 0;
  border-radius: 0px 0px 0px 16px;
  background: #745cd4;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 24px;

  i {
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    color: #282f41;
  }
}
.item-img {
  width: 138px;
  height: 138px;

  img {
    object-fit: cover;
    // z-index: 1;
    position: sticky;
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}

.item-body {
  flex: 1;
  display: flex;
  align-items: center;
}

.item-left,
.item-right {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    color: #fff;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    margin: 0;
  }

  .name-span {
    color: #9e9e9e;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    display: block;
  }
}
.text-p {
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  margin: 32px 0;
  text-align: center;
}
</style>
