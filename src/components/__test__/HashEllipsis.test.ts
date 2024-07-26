import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import HashEllipsisVue from '../HashEllipsis.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('TextEllipsisVue', () => {
  it('renders with default', async () => {
    const wrapper = mount(HashEllipsisVue, {
      props: {
        hash: '0x1234567890abcdef',
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('0x1234...cdef')
  })
  it('renders', async () => {
    const wrapper = mount(HashEllipsisVue, {
      props: {
        before: 3,
        after: 3,
        hash: '0x1234567890abcdef',
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('0x1...def')
  })
})
