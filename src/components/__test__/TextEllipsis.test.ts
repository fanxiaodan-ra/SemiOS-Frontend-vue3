import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TextEllipsisVue from '../TextEllipsis.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('TextEllipsisVue', () => {
  it('renders properly', async () => {
    const wrapper = mount(TextEllipsisVue, {
      props: {
        text: 'Hello World',
        width: 10,
      },
      slots: {
        default: '<a class="link">hello hello hello</a>'
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('hello hello hello')
    const ellipsis = wrapper.find('#ellipsis')
    expect(ellipsis.exists()).toBe(true)
    expect(ellipsis.attributes('style')).toBe('max-width: 10px;')
    wrapper.vm.ellipsis = {
      scrollWidth: 100
    } as any
    await wrapper.vm.$nextTick()
  })
})
