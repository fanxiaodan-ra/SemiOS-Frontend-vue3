<template>
  <div class="dao-title" v-if="store.addNodeType > 0 && store.addNodeType < 6">
    <div class="title-tap" v-if="!route.query.id">
      <div v-for="(item, index) in titles" :key="item.name">
        <div class="title-name" v-if="index < 5">
          <span class="name-icon" :class="store.addNodeType >= index + 1 ? 'activeType' : ''">
            <span v-if="store.addNodeType > index + 1">
              <i class="iconfont icon-check" /></span>
            <span v-else>{{ index + 1 }}</span>
          </span>
          {{ item.name }}
        </div>
        <div class="parting" v-if="index < 4"></div>
      </div>
    </div>
    <div class="title-tap" v-else>
      <div v-for="(item, index) in titles" :key="item.name">
        <div class="title-name" v-if="index > 0 && index < 5">
          <span class="name-icon" :class="store.addNodeType >= index + 1 ? 'activeType' : ''">
            <span v-if="store.addNodeType > index + 1">
              <i class="iconfont icon-check" /></span>
            <span v-else>{{ index }}</span>
          </span>
          {{ item.name }}
        </div>
        <div class="parting" v-if="index > 0 && index < 4"></div>
      </div>
    </div>
  </div>
  <div v-if="store.addNodeType > 0 && titles.length > 0">
    <h2>
      {{ titles[store.addNodeType - 1]['name'] }}
    </h2>
    <v-divider class="border-purple"></v-divider>
    <div class="title-text my-mgt16">
      {{ titles[store.addNodeType - 1]['text'] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store'
const store = useUserStore()

const titles = ref<any>([])
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { tm } = useI18n()
import { useRoute } from 'vue-router'
const route = useRoute()
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
      background-color: #8C91FF;
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
