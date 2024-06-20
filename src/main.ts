import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import '@/assets/initstyle.css'
import '@/assets/iconfonts/iconfont.css'
import '@/assets/vuetify.scss'
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
})

import i18n from './lang/index'

import MasonryWall from '@yeger/vue-masonry-wall'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

const app = createApp(App)
const pinia = createPinia()

import echarts from "@/components/echarts";
app.config.globalProperties.$echarts = echarts;
app.provide('$echarts', echarts);
app
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(Toast)
  .use(i18n)
  .use(MasonryWall)
  .use(Viewer, {
    defaultOptions: {
      title: false,
      toolbar: false,
    },
  })
app.mount('#app')
