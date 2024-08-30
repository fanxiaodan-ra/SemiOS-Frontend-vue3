import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import FloorPriceVue from '../FloorPrice.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('FloorPriceVue', () => {
  it('should render the current price label', () => {
    const wrapper = mount(FloorPriceVue, {
      props: {
        dataObj: {
          canvasCurrentPrice: 0,
          erc20PaymentMode: 'fixed',
          daoSymbol: 'DAO',
          daoErc20Address: '0x1234567890abcdef',
          payCurrencyType: 'ETH',
          inputTokenAddress: '0x1234567890abcdef',
        }
      },
      global: {
        plugins: [vuetify]
      }
    });
    expect(wrapper.text()).toBe('Floor Price   DAO');
  });
});