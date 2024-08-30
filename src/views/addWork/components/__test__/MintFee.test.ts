import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import MintFeeVue from '../MintFee.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('FloorPriceVue', () => {
  it('should render the current price label', () => {
    const wrapper = mount(MintFeeVue, {
      props: {
        daoReserveRatio: {
          daoMintFee: 0,
          canvasMintFee: 0,
          d4aMintFee: 0
        }
      },
      global: {
        plugins: [vuetify]
      }
    });
    expect(wrapper.text()).toBe('Subnodes Fee0  %Builder Fee0  %Semios Fee0   2.5 %');
  });
});