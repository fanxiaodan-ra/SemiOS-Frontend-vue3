<template>
  <div class="card-title items-start">
    <div class="t-img"><img :src="props.dataObj.daoLogoUrl" alt="" /></div>
    <div class="t-box">
      <div class="flex flex-1">
        <dao-title :data-obj="props.dataObj" />
        <div class="flex justify-end items-center">
          <maker-info :data-obj="props.dataObj" />
          <favourite :data-obj="props.dataObj" :is-favorited="isFavorited" />
        </div>
      </div>
      <p class="leading-5 line-clamp-3">
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
import DaoTitle from './components/DaoTitle/Index.vue'
import MakerInfo from './components/MakerInfo/Index.vue'
import Favourite from './components/Favourite/Index.vue'

</script>

<style scoped lang="scss">
.card-title {
  display: flex;
}
.t-img {
  width: 68px;
  height: 68px;
  background-color: #1A1F2E;
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

}

.flex-d {
  display: flex;
  flex: 1;
  flex-direction: column;
}
</style>
