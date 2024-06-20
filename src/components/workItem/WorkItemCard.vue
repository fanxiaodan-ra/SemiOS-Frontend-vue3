<template>
  <div class="w-card">
    <masonry-wall
      :items="props.list"
      :column-width="276"
      :gap="24"
      v-if="props.list.length > 0"
    >
      <template #default="{ item }: any">
        <div :style="{ height: `${item.height + 60}px` }" class="card-box">
          <router-link :to="`/workDetails?id=${item.workId}`" class="a-style">
            <div class="card-img">
              <v-hover v-slot="{ isHovering, props }">
                <div class="card-grow" v-bind="props">
                  <v-expand-transition>
                    <div
                      v-if="isHovering"
                      class="transition-fast-in-fast-out v-card--reveal my-exp"
                    >
                      <div class="item-text" v-if="item.workStatus === 1">
                        {{ item.daoName }}.{{ item.workNumber }}
                      </div>
                      <div v-else>
                        <div class="item-text" v-if="item.generate === 1">
                          {{ item.daoName }}#Pass/Unminted
                        </div>
                        <div class="item-text" v-else>
                          {{ item.daoName }}#{{
                            splitAddress(item.creatorAddress)
                          }}/Unminted
                        </div>
                      </div>
                      <div class="item-des">
                        {{ item.workDescription }}
                      </div>
                      <div class="nums-price">
                        {{ priceType[item.priceType] }} :&nbsp;
                        <div
                          v-if="
                            item.royaltyTokenPrice !== null &&
                            item.royaltyTokenPrice !== ''
                          "
                          class="flex-span flexcen"
                        >
                          <span class="lan">
                            {{
                              bigNumFormat(item.royaltyTokenPrice, 5, 0.000001)
                            }}
                          </span>
                          <TokenIcon
                            size="18px"
                            :daoToken="item.erc20PaymentMode"
                            :daoSymbol="item.daoSymbol"
                            :daoErc20Address="item.daoErc20Address"
                            :payCurrencyType="item.payCurrencyType"
                            :inputTokenAddress="item.inputTokenAddress"
                          />
                        </div>
                        <div v-else class="flex-span flexcen">
                          <span class="lan">
                            {{ bigNumFormat(item.price, 5, 0.000001) }}
                          </span>
                          <TokenIcon
                            size="18px"
                            :daoToken="item.erc20PaymentMode"
                            :daoSymbol="item.daoSymbol"
                            :daoErc20Address="item.daoErc20Address"
                            :payCurrencyType="item.payCurrencyType"
                            :inputTokenAddress="item.inputTokenAddress"
                          />
                        </div>
                      </div>
                      <div class="item-btns">
                        <v-btn
                          height="40"
                          variant="text"
                          width="40"
                          border
                          :icon="
                            item.favorited ? 'mdi-heart' : 'mdi-heart-outline'
                          "
                          :style="{
                            color: item.favorited ? '#ffa2a2' : '#9e9e9e',
                          }"
                          @click.stop.prevent="setFavoriteData(item)"
                        >
                        </v-btn>
                      </div>
                    </div>
                  </v-expand-transition>
                  <div
                    :style="{ height: `${item.height}px` }"
                    style="min-height: 180px"
                  >
                    <img class="item-img" :src="item.imgUrl" alt="" />
                    <!-- <v-img
                      :aspect-ratio="1"
                      class="item-img"
                      :lazy-src="item.imgUrl"
                      :src="item.imgUrl"
                      width="276"
                    ></v-img> -->
                  </div>

                  <div class="img-box-footer">
                    <div class="item-nums">
                      <div class="nums-left">
                        <div class="item-name" v-if="item.workStatus === 1">
                          {{ item.daoName }}.{{ item.workNumber }}
                        </div>
                        <div v-else>
                          <div class="item-name" v-if="item.generate === 1">
                            {{ item.daoName }}#Pass/Unminted
                          </div>
                          <div class="item-name" v-else>
                            {{ item.daoName }}#{{
                              splitAddress(item.creatorAddress)
                            }}/Unminted
                          </div>
                        </div>
                      </div>
                      <div class="nums-right">
                        <i
                          class="iconfont"
                          :class="
                            item.favorited ? 'icon-icon3' : 'icon-shoucang'
                          "
                          :style="{
                            color: item.favorited ? '#ffa2a2' : '#9e9e9e',
                          }"
                        ></i>
                        <span class="t-num"> {{ item.favoriteAmount }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </v-hover>
            </div>
          </router-link>
        </div>
      </template>
    </masonry-wall>

    <table-loading
      :is-loading="props.isLoading"
      :list="props.list"
      :isAll="props.isAll"
      :isSearch="props.isSearch"
      :searchType="props.searchType"
    />
  </div>
</template>

<script setup lang="ts">
import TableLoading from '../TableLoading.vue'
import TokenIcon from '@/components/TokenIcon.vue'
import { splitAddress, bigNumFormat } from '@/utils'
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
  isSearch: {
    type: Boolean,
    default: false,
  },
  searchType: {
    type: Number,
    default: 0,
  },
})
const priceType = ['Price', 'Fixed Price', 'Unified Price']

import useFavorite from '@/hooks/useFavorite'
const { favoriteData } = useFavorite()
const setFavoriteData = async (item: any) => {
  const favData = await favoriteData(item.workId, 2, item.favorited)
  if (favData) {
    item.favorited = favData.favorited
    item.favoriteAmount += favData.favoriteAmount
  }
}
</script>

<style scoped lang="scss">
.w-card {
  margin: 0 48px;
  // padding-top: 6px;
}
.card-box {
  min-height: 240px;
  display: flex;
  justify-content: center;
}
.card-img {
  float: left;
  box-sizing: border-box;
  width: 276px;
  cursor: pointer;
  border-radius: 8px !important;
  background-color: #282f41;
}
.item-img {
  height: 100%;
  width: 100%;
  border-radius: 6px 6px 0 0;
  min-height: 180px;
}
.img-box-footer {
  height: 60px;
  line-height: 60px;
  // border: 0.5px solid #6062aa;
  box-sizing: border-box;
  border-top: none;
  background-color: #282f41;
  padding: 0 12px;

  border-radius: 0 0 6px 6px;
  .item-nums {
    color: #9e9e9e;
    display: flex;
    font-size: 16px;
    font-weight: 500;
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
        font-size: 16px;
        margin: 0 4px;
      }
    }
    .item-name {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow-wrap: anywhere;
      overflow: hidden;
      white-space: normal;
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
.item-text {
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow-wrap: anywhere;
}
.nums-price {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  display: flex;
  align-items: center;
}
.my-exp {
  height: 100%;
  z-index: 1;
  border-radius: 6px;
  background-color: #533fa1 !important;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .item-des {
    font-size: 16px;
    font-weight: 400;
    color: #bbbaba;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3;
  }
  .item-btns {
    position: absolute;
    bottom: 6px;
    right: 6px;
    // :deep(.v-btn__content) {
    //   color: #ffa2a2;
    // }
  }
}
.lan {
  word-break: break-all;
  line-height: 28px;
}
:deep(.v-img__img--contain) {
  object-fit: cover;
}
</style>
