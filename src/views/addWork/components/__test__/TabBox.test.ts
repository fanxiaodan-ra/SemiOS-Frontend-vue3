import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TabBoxVue from '../TabBox.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('TabBox', () => {
  it('renders correctly', () => {
    const wrapper = mount(TabBoxVue, {
      props: {
        title: 'TabBoxTitle',
      },
      global: {
        plugins: [vuetify],
      }
    })

    expect(wrapper.text()).toBe('TabBoxTitle')
  })
})
