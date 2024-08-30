import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import MakerInfoVue from '../MakerInfo/Index.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('MakerInfoVue', () => {
  it('renders with default', async () => {
    const wrapper = mount(MakerInfoVue, {
      props: {
        dataObj: {
          togetherDaoMakerVo: {
            makerTotalAmount: '1',
            noSpendEthAmount: '2',
            noSpendTokenAmount: '3',
          },
          payCurrencyType: 'ETH',
          daoSymbol: 'SEMIOS316',
          daoErc20Address: '0x1234567890abcdef',
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('1.002.00  ETH3.00  SE...316')
  })
})