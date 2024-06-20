<template>
  <div class="card-title">
    <div class="t-img"><img :src="props.dataObj.daoLogoUrl" alt="" /></div>
    <div class="t-box">
      <div style="display: flex; flex: 1">
        <h4>
          {{ truncateString(props.dataObj.daoName) }}
          <span>{{ truncateString(props.dataObj.erc20Name) }}</span>
        </h4>
        <div class="t-collect" v-if="isFavorited">
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
      <p>
        {{ props.dataObj.daoDescription }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  isFavorited: {
    type: Boolean,
    default: false,
  },
})
import { truncateString } from '@/utils'
import useFavorite from '@/hooks/useFavorite'
const { favoriteData } = useFavorite()
const setFavoriteData = async () => {
  const favData = await favoriteData(
    props.dataObj.daoId,
    0,
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
  background-color: #252b3a;
  margin-right: 24px;
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
  h4 {
    color: #bbbaba;
    font-size: 20px;
    font-weight: 500;
    margin: 0;
    margin-bottom: 4px;
    flex: 1;

    height: 32px;
    display: flex;
    align-items: flex-end;
  }
  span {
    color: #9e9e9e;
    font-family: Inter;
    font-size: 12px;
    font-weight: 400;
    margin-left: 24px;
  }
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
  }
}
.flex-d {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
