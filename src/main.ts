import { createApp } from 'vue'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import { config } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import screenfull from 'screenfull';

import katex from 'katex';
import 'katex/dist/katex.min.css';

import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';

import mermaid from 'mermaid';

import highlight from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

import * as prettier from 'prettier';
import parserMarkdown from 'prettier/plugins/markdown';
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
import '@mdi/font/css/materialdesignicons.css'


config({
  editorExtensions: {
    prettier: {
      prettierInstance: prettier,
      parserMarkdownInstance: parserMarkdown
    },
    highlight: {
      instance: highlight
    },
    screenfull: {
      instance: screenfull
    },
    katex: {
      instance: katex
    },
    cropper: {
      instance: Cropper
    },
    mermaid: {
      instance: mermaid
    }
  }
});
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
  // theme: {
  //   themes: {
  //     light: {
  //       colors: {
  //         primary: '#8C91FF',
  //       }
  //     }
  //   }
  // },
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
