<template>
  <div class="card-pd">
    <h4 class="font-h4">{{ props.title }}</h4>
    <div class="card-main" :class="{ 'is-more': isMore }" ref="ewRef">
      <MdPreview
        v-if="props.description !== ''"
        :editorId="props.title"
        theme="dark"
        :modelValue="props.description"
      />
      <!-- As dawn broke over the serene countryside, the mist slowly lifted from
        the valleys, revealing a landscape painted in hues of gold and green.
        Birds chirped joyfully, welcoming the new day with their melodious
        songs. The scent of wildflowers lingered in the air, carried by a gentle
        breeze that rustled through the leaves of ancient trees. In the quaint
        village below, life stirred as villagers emerged from their homes, ready
        to embrace the tasks and challenges that lay ahead. Children laughed and
        played in the narrow streets, their voices echoing off the cobblestone
        walls. Shopkeepers opened their doors, greeting customers with warm
        smiles and the promise of fresh goods. In the distance, the imposing
        silhouette of a castle stood against the horizon, a silent sentinel
        watching over the land. Its turrets reached towards the sky, a reminder
        of a bygone era filled with tales of knights and dragons. As the sun
        climbed higher in the sky, casting its golden rays upon the earth, a
        sense of peace settled over the land. In this moment, all was right with
        the world, and the promise of a new beginning hung in the air like a
        tangible dream. -->
    </div>
  </div>
  <div :class="!isMore ? 'view-more' : 'has-more'" v-if="isBtn"></div>
  <div class="icons text-primary-1" @click="isMore = !isMore" v-if="isBtn">
    {{ isMore ? 'See Less' : 'See More' }}
    <v-icon color="#8C91FF" class="">
      {{ isMore ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
    </v-icon>
  </div>
</template>

<script setup lang="ts">
import { MdPreview, config } from 'md-editor-v3'
import LinkAttr from 'markdown-it-link-attributes'
import 'md-editor-v3/lib/preview.css'

const props = defineProps({
  description: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
})

config({
  markdownItPlugins(plugins) {
    return [
      ...plugins,
      {
        type: 'linkAttr',
        plugin: LinkAttr,
        options: {
          matcher(href: string) {
            // If markdown-it-anchor is used.
            // Anchor links at the heading should be ignored.
            return !href.startsWith('#')
          },
          attrs: {
            target: '_blank',
          },
        },
      },
    ]
  },
})
import { onMounted, ref } from 'vue'
const ewRef = ref()
const isMore = ref(false)
const isBtn = ref(false)
onMounted(() => {
  if (ewRef.value) {
    if (ewRef.value.scrollHeight > ewRef.value.clientHeight) {
      isBtn.value = true
      isMore.value = false
    }
  }
})
</script>
<style scoped lang="scss">
.card-pd {
  padding: 24px;
}
.card-main {
  max-height: 72px;
  overflow: hidden;
  position: relative;
  color: #9e9e9e;
}
.is-more {
  height: auto;
  overflow: hidden;
  max-height: none !important;
}

.view-more {
  width: 100%;
  height: 22px;
  padding-top: 46px;
  background-color: rgba(255, 255, 255, 0.3);
  position: absolute;
  bottom: 0;
  filter: blur(20px);
  opacity: 0.6;
}
.icons {
  height: 24px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  position: absolute;
  display: block;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    display: flex;
  }
}
.has-more {
  width: 100%;
  height: 22px;
  position: absolute;
  bottom: 0;
}
.md-editor {
  background-color: transparent;
  color: #9e9e9e;
}
:deep(.md-editor-preview-wrapper) {
  padding: 0;
}
</style>
