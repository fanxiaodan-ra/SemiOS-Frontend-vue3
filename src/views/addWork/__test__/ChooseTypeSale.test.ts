import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import ChooseTypeSaleVue from '../ChooseTypeSale.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

vi.mock('../FixedPriceTab.vue')
vi.mock('../FixedPriceTab.vue')
vi.mock('../UnifiedPriceTab.vue')

describe('ChooseTypeSaleVue', () => {
  it('should render the current price label', () => {
    const wrapper = mount(ChooseTypeSaleVue, {
      props: {
        dataObj: {
          leftWidth: 10,
          pethodType: 1,
          canvasCurrentPrice: 0,
          erc20PaymentMode: 'fixed',
          daoSymbol: 'DAO',
          daoErc20Address: '0x1234567890abcdef',
          payCurrencyType: 'ETH',
          inputTokenAddress: '0x1234567890abcdef',
          daoReserveRatio: {
            daoMintFee: 0,
            canvasMintFee: 0,
            d4aMintFee: 0
          }
        }
      },
      global: {
        plugins: [vuetify]
      } 
    });
    expect(wrapper.text()).toBe('Choose a Type of Sale Floating PriceFixed PriceThe price of work will be dynamically adjusted based on the sales of works under the same Builder.Current Price0  DAOFloor Price  DAOSubnodes Fee0% Builder Fee0% Semios Fee0%');
  });
});