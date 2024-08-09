import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import TopupAndMintVue from '../TopupAndMint.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('TopupAndMintVue', () => {
  it('render with topupMode === 0', () => {
    const wrapper = mount(TopupAndMintVue, {
      props: {
        dataObj: {
          topupMode: 0,
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
    expect(wrapper.text()).toBe('Subnodes Fee0%Builder Fee0%Semios Fee0%');
  })
  it('render with topupMode === 1', () => {
    const wrapper = mount(TopupAndMintVue, {
      props: {
        dataObj: {
          topupMode: 1,
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
    console.log(wrapper.html())
    expect(wrapper.text()).toBe('This Nodes has enabled Top-Up mode, so it does not follow the normal Block Reward logic.');
  })
})
