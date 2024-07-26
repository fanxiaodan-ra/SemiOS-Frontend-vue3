<template>
  <div class="card-title">
    <div class="t-img"><img :src="props.dataObj.imgUrl" alt="" /></div>
    <div class="t-box">
      <div style="display: flex">
        <router-link
          :to="`/workDetails?id=${props.dataObj.workId}`"
          class="a-style"
        >
          <v-btn class="text-none title-name" variant="text">
            <h4 class="box-title">
              <span v-if="props.dataObj.workStatus === 1" class="fc8">
                <v-tooltip activator="parent" location="top">
                  {{ props.dataObj.daoName }} . {{ props.dataObj.workNumber }}
                </v-tooltip>
                {{ truncateString(props.dataObj.daoName) }}
                <span style="color: #d9d9d9"
                  >. {{ props.dataObj.workNumber }}</span
                >
              </span>
              <span v-else>
                <span v-if="props.dataObj.generate === 1" class="fc8">
                  <v-tooltip activator="parent" location="top">
                    {{ props.dataObj.daoName }} #Pass /Unminted
                  </v-tooltip>
                  {{ truncateString(props.dataObj.daoName)
                  }}<span style="color: #fff">#</span
                  ><span style="color: #b3b5f2">Pass</span
                  ><span style="color: #d9d9d9">/Unminted</span>
                </span>
                <span v-else class="fc8">
                  <v-tooltip activator="parent" location="top">
                    {{ props.dataObj.daoName }} #{{
                      splitAddress(props.dataObj.creatorAddress)
                    }}
                    /Unminted
                  </v-tooltip>
                  {{ truncateString(props.dataObj.daoName)
                  }}<span style="color: #fff">#</span
                  ><span style="color: #b3b5f2">{{
                    splitAddress(props.dataObj.creatorAddress)
                  }}</span
                  ><span style="color: #d9d9d9">/Unminted</span>
                </span>
              </span>
            </h4>
          </v-btn>
        </router-link>

        <div class="t-collect">
          <div class="favo-box">
            <v-btn
              size="32"
              class="text-none"
              variant="text"
              @click.stop.prevent="setFavoriteData"
            >
              <i
                class="iconfont"
                :class="
                  props.dataObj.favorited ? 'icon-icon3' : 'icon-shoucang'
                "
                :style="{ color: props.dataObj.favorited ? '#ffa2a2' : '' }"
              ></i>
            </v-btn>
            <span class="t-num"> {{ props.dataObj.favoriteAmount }}</span>
          </div>
        </div>
      </div>
      <div class="item-price flexcen">
        <span class="price-name"
          >{{ priceType[props.dataObj.priceType] }} :&nbsp;
        </span>
        <span
          class="flexcen"
          v-if="
            props.dataObj.royaltyTokenPrice !== null &&
            props.dataObj.royaltyTokenPrice !== ''
          "
        >
          {{ bigNumFormat(props.dataObj.royaltyTokenPrice, 5, 0.000001) }}
          <TokenIcon
            :daoToken="props.dataObj.erc20PaymentMode"
            :daoSymbol="props.dataObj.daoSymbol"
            :daoErc20Address="props.dataObj.daoErc20Address"
            :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress"
          />
        </span>
        <span class="flexcen" v-else>
          {{ bigNumFormat(props.dataObj.price, 5, 0.000001) }}
          <TokenIcon
            :daoToken="props.dataObj.erc20PaymentMode"
            :daoSymbol="props.dataObj.daoSymbol"
            :daoErc20Address="props.dataObj.daoErc20Address"
            :payCurrencyType="props.dataObj.payCurrencyType"
            :inputTokenAddress="props.dataObj.inputTokenAddress"
          />
        </span>
        <span
          class="price-work"
          v-if="
            props.dataObj.workStatus === 0 && props.dataObj.passesTotalQuantity
          "
        >
          <span class="price-name"
            >{{
              $t('WorkDetail.matchMediaintedPassesByTotalMintablePassesLabel')
            }}
            : </span
          >{{ props.dataObj.havePassesQuantity }} /
          {{ bigNumFormat(props.dataObj.passesTotalQuantity, 5) }}
        </span>
      </div>
      <!-- <p>
        {{ props.dataObj.workDescription }}
      </p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { splitAddress, bigNumFormat, truncateString } from '@/utils'
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
})
const priceType = ['Price', 'Fixed Price', 'Unified Price']
import TokenIcon from '@/components/TokenIcon.vue'
import useFavorite from '@/hooks/useFavorite'
const { favoriteData } = useFavorite()
const setFavoriteData = async () => {
  const favData = await favoriteData(
    props.dataObj.workId,
    2,
    props.dataObj.favorited
  )
  if (favData) {
    props.dataObj.favorited = favData.favorited
    props.dataObj.favoriteAmount += favData.favoriteAmount
  }
}
</script>

<style scoped lang="scss">
.card-title {
  display: flex;
}
.t-img {
  width: 68px;
  height: 68px;
  background-color: #1A1F2E;
  margin-right: 8px;
  flex: 0 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.t-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  // span {
  //   color: #9e9e9e;
  //   font-family: Inter;
  //   font-size: 12px;
  //   font-weight: 400;
  //   margin-left: 24px;
  // }
  p {
    color: #9e9e9e;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.2px;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
}
.favo-box {
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.t-collect {
  width: 200px;
  margin-left: auto;
  text-align: end;
  flex: 0 0 auto;
  i {
    font-size: 14px;
    color: #9e9e9e;
  }
  .t-num {
    font-size: 14px;
    margin-left: 12px;
    color: #9e9e9e;
  }
}
.box-title {
  margin: 0;
  // margin-bottom: 4px;
  flex: 1;
  height: 36px;
  display: flex;
  // align-items: flex-end;
  span {
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    line-height: 36px;
  }
}
.flex-d {
  display: flex;
  flex: 1;
  flex-direction: column;
}

.item-price {
  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  margin-left: 18px;
}

.price-name {
  color: #9e9e9e;
  font-size: 12px;
  font-weight: 400;
  margin: 0;
}
.price-work {
  margin-left: 12px;
}
</style>
