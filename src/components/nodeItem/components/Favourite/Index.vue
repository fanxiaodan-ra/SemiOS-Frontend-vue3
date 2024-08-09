<template>
  <div
    class="favourite ml-auto text-end grow-0 shrink-0 basis-auto"
    v-if="isFavorited"
  >
    <div class="h-8 flex items-center justify-end">
      <v-btn
        size="32"
        class="text-none"
        variant="text"
        @click.stop.prevent="setFavoriteData"
      >
        <i
          :class="`iconfont text-sm text-grey-1 ${props.dataObj.favorited ? 'icon-icon3' : 'icon-shoucang'}`"
          :style="{ color: props.dataObj.favorited ? '#ffa2a2' : '' }"
        ></i>
      </v-btn>
      <span class="favorite-num ml-3 text-sm"> {{ props.dataObj.favoriteAmount }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import useFavorite from '@/hooks/useFavorite'

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
