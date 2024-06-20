<template>
  <div class="icons-box">
    <v-btn-toggle>
      <v-btn size="40">
        <a
          class="a-style"
          :href="openLink('https://opensea.io/', props.dataObj.openseaLink)"
          target="_blank"
          v-if="props.dataObj.openseaLink"
        >
          <i class="iconfont icon-opensea isClick">
            <v-tooltip activator="parent" location="top" max-width="300">
              Opensea : https://opensea.io/{{ props.dataObj.openseaLink }}
            </v-tooltip>
          </i>
        </a>
        <i v-else class="iconfont icon-opensea"></i>
      </v-btn>
      <v-btn size="40">
        <a
          class="a-style"
          :href="openLink('https://t.me/', props.dataObj.discordLink)"
          target="_blank"
          v-if="props.dataObj.discordLink"
        >
          <i class="iconfont icon-telegram isClick">
            <v-tooltip activator="parent" location="top" max-width="300">
              Telegram : https://t.me/{{ props.dataObj.discordLink }}
            </v-tooltip></i
          >
        </a>
        <i v-else class="iconfont icon-telegram"></i>
      </v-btn>

      <v-btn size="40">
        <a
          class="a-style"
          :href="openLink('https://twitter.com/', props.dataObj.twitterLink)"
          target="_blank"
          v-if="props.dataObj.twitterLink"
        >
          <i class="iconfont icon-twitter isClick">
            <v-tooltip activator="parent" location="top" max-width="300">
              Twitter: https://twitter.com/{{ props.dataObj.twitterLink }}
            </v-tooltip></i
          >
        </a>
        <i v-else class="iconfont icon-twitter"></i>
      </v-btn>
    </v-btn-toggle>
    <v-btn-toggle>
      <div v-if="props.isName">
        <div
          v-if="props.dataObj.socialLinks.filter((item:string)=>item!=='')?.length > 0"
        >
          <v-btn
            size="40"
            v-for="(item, index) in props.dataObj.socialLinks"
            :key="index"
          >
            <a
              class="a-style"
              :href="openLink(item)"
              target="_blank"
              v-if="item"
            >
              <i class="iconfont icon-link isClick">
                <v-tooltip activator="parent" location="top" max-width="300">
                  {{ item }}
                </v-tooltip></i
              >
            </a>
            <i v-else class="iconfont icon-link"></i>
          </v-btn>
        </div>
      </div>
      <div v-else>
        <div
          v-if="
            props.dataObj.socialLinks && props.dataObj.socialLinks.length > 0
          "
        >
          <v-btn
            size="40"
            v-for="(item, index) in props.dataObj.socialLinks"
            :key="item.link + index"
          >
            <a
              class="a-style"
              :href="openLink(item.link)"
              target="_blank"
              v-if="item.name && item.link"
            >
              <i class="iconfont icon-link isClick">
                <v-tooltip activator="parent" location="top" max-width="300">
                  {{ item.name }} : {{ item.link }}
                </v-tooltip>
              </i>
            </a>
            <i v-else class="iconfont icon-link"></i>
          </v-btn>
        </div>
      </div>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  dataObj: {
    type: Object,
    default: () => {},
  },
  isName: {
    type: Boolean,
    default: false,
  },
})

const openLink = (http: string, url: string = '') => {
  const newHttp = http.slice(0, 4) === 'http' ? http : 'https://' + http
  return `${newHttp}${url}`
}
</script>

<style scoped lang="scss">
.icons-box {
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  i {
    font-size: 24px !important;
    color: #9e9e9e !important;
    margin: 6px;
  }
  .isClick {
    color: #8c91ff !important;
    cursor: pointer;
  }
}
</style>
