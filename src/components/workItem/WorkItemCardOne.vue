<template>
  <div class="w-card">
    <div class="card-box" v-masonry fit-width="true" transition-duration="0.8s">
      <div
        v-for="item in props.list"
        :key="item.imgUrl"
        class="card-img"
        :style="{
          'background-color': item.bgColor,
        }"
        v-masonry-tile
      >
        <v-hover v-slot="{ isHovering, props }">
          <div class="card-grow" color="grey-lighten-4" v-bind="props">
            <v-expand-transition>
              <div
                v-if="isHovering"
                class="d-flex transition-fast-in-fast-out bg-orange-darken-2 v-card--reveal text-h2"
                style="height: 100%; z-index: 1"
              >
                $14.99
              </div>
            </v-expand-transition>
            <img class="item-img" :src="item.imgUrl" alt="" />
            <div class="img-box-footer">
              <!-- <h3>{{ item.workDescription }}</h3>
              <div class="item-text" v-if="item.workStatus === 1">
                {{ item.daoName }}.{{ item.workNumber }}
              </div>
              <div v-else>
                <div class="item-text" v-if="item.generate === 1">
                  {{ item.daoName }}#Pass/Unminted
                </div>
                <div class="item-text" v-else>
                  {{ item.daoName }}#{{
                    ellipsis(item.creatorAddress)
                  }}/Unminted
                </div>
              </div> -->
              <div class="item-nums">
                <div class="nums-left">
                  {{ priceType[item.priceType] }}:
                  <span
                    v-if="
                      item.royaltyTokenPrice !== null &&
                      item.royaltyTokenPrice !== ''
                    "
                    class="flex-span"
                  >
                    <span class="lan">
                      {{ bigNumFormat(item.royaltyTokenPrice, 5, 0.000001) }}
                    </span>
                    <img
                      v-if="item.erc20PaymentMode"
                      src="@/assets/images/Token.png"
                      class="iconpng"
                    />
                    <img v-else src="@/assets/images/ETH.png" class="iconpng" />
                  </span>
                  <span v-else class="flex-span">
                    <span class="lan">
                      {{ bigNumFormat(item.price, 5, 0.000001) }}
                    </span>
                    <img
                      v-if="item.erc20PaymentMode"
                      src="@/assets/images/Token.png"
                      class="iconpng"
                    />
                    <img v-else src="@/assets/images/ETH.png" class="iconpng" />
                  </span>
                </div>
                <div class="nums-right">
                  <i
                    @click.stop.prevent="setAmount"
                    class="iconfont icon-icon3"
                    :style="{ color: item.favorited ? '#ffa2a2' : '' }"
                  ></i>
                  <span class="t-num"> {{ item.favoriteAmount }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-hover>
      </div>
    </div>
    <table-loading
      :is-loading="props.isLoading"
      :list="props.list"
      :isAll="props.isAll"
    />
  </div>
</template>

<script setup lang="ts">
import TableLoading from '../TableLoading.vue'

import { bigNumFormat } from '@/utils'
const props = defineProps({
  list: <any>{
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isAll: {
    type: Boolean,
    default: false,
  },
})
const priceType = ['Price', 'Fixed Price', 'Unified Price']

const setAmount = () => {}
</script>

<style scoped lang="scss">
.w-card {
  margin: 0 48px;
}
.card-box {
  margin: 0 auto;
  margin-left: auto;
}
.card-img {
  float: left;
  margin: 10px;
  box-sizing: border-box;
  width: 276px;
  cursor: pointer;
  .item-img {
    width: 100%;
    height: 100%;
  }
}
.img-box-footer {
  height: 98px;
  border: 0.5px solid #6062aa;
  box-sizing: border-box;
  border-top: none;
  background-color: #1b2233;
  padding: 0 12px;
  margin-top: -12px;

  h3 {
    font-size: 14px;
    margin-bottom: 10px;
    color: #9e9e9e;
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-family: Roboto7;
    word-break: break-all;
    padding-top: 12px;
    height: 32px;
  }
  .item-text {
    font-size: 12px;
    color: #bbbaba;
    margin-bottom: 10px;
    height: 16px;
    line-height: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  .item-nums {
    color: #9e9e9e;
    display: flex;
    font-size: 12px;
    .nums-left {
      display: flex;
      align-items: center;
    }
    .flex-span {
      display: flex;
      align-items: center;
    }
    .nums-right {
      margin-left: auto;
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 14px;
        margin-right: 8px;
      }
    }
  }
}
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
