import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import HintIconVue from '../HintIcon.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('HintIconVue', () => {
  it('renders with default', async () => {
    const wrapper = mount(HintIconVue, {
      props: {
        title: 'hint message',
        icon: 'i-outer',
        classes: 'class-for-outer'
      },
      global: {
        plugins: [vuetify]
      }
    })
    const icon = wrapper.find('.iconfont')
    expect(icon.attributes('class')).toBe('iconfont i-outer class-for-outer')
  })
})