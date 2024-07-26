<template>
  <v-item-group class="group-box">
    <v-container v-if="!isLoading">
      <v-item v-for="(item, idx) in props.topUpMintList as any" :key="item.imgUrl + idx"
        v-if="props.topUpMintList.length > 0">
        <v-card :class="isSelected.workId === item.workId ? 'item-select' : ''" class="my-mgt16 item-card" height="140"
          dark @click="setItem(item)">
          <div class="active-item-icon" v-show="isSelected.workId === item.workId">
            <i class="iconfont icon-check" />
          </div>
          <div class="item-img"><img :src="item.imgUrl" alt="" /></div>
          <div class="item-body flex flex-col justify-center !items-start pl-12" v-if="props.type === 'transferNft'">
            <b class="text-white text-xl font-medium font-['Inter'] tracking-tight mb-2">{{ item.permissionCount }}</b>
            <span class="text-neutral-500 text-sm font-medium font-['Inter'] tracking-tight">{{
              t('myPermissions.permissionOfNft') }}
            </span>
          </div>
          <div class="item-body" v-else>
            <div class="item-left">
              <p>
                {{ item.ethAmount }}
                <TokenIcon size="20px" :payCurrencyType="item.payCurrencyType"
                  :inputTokenAddress="item.inputTokenAddress" />
              </p>
              <span class="name-span">ETH Balance</span>
            </div>
            <v-divider inset vertical color="#2F305B"></v-divider>
            <div class="item-right">
              <p>
                {{ item.erc20Amount }}
                <TokenIcon size="20px" :daoToken="true" :daoSymbol="item.daoSymbol"
                  :daoErc20Address="item.daoErc20Address" />
              </p>
              <span class="name-span">Locked ERC-20 Tokens</span>
            </div>
          </div>
        </v-card>
      </v-item>
      <p v-else class="no-list">
        {{ t('common.noItems') }}
      </p>
    </v-container>
    <Loading v-else />
  </v-item-group>
</template>
<script lang="ts" setup>
import TokenIcon from '@/components/TokenIcon.vue'
import Loading from '@/components/Loading.vue'
import { t } from '@/lang'
import { ref } from 'vue'
const props = defineProps({
  topUpMintList: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: false,
    default: '',
  },
})
const isSelected = ref<any>({})

const emit = defineEmits(['setWorkItem'])
const setItem = (item: any) => {
  isSelected.value = item
  emit('setWorkItem', isSelected.value)
}
</script>

<style lang="scss" scoped>
.group-box {
  height: 400px;
  overflow: auto;
  padding: 0 6px;
}
.item-card {
  background-color: #1A1F2E !important;
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
</style>
