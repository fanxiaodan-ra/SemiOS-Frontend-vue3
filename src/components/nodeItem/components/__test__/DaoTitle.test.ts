import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DaoTitleVue from '../DaoTitle/Index.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('DaoTitleVue', () => {
  it('renders without necessary params:isAncestorDao', async () => {
    const wrapper = mount(DaoTitleVue, {
      props: {
        dataObj: {
          daoName: 'DAONAME',
          erc20Name: 'ERC20NAME',
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('DAONAME')
    const erc20Name = wrapper.find('.erc20-name')
    expect(erc20Name.exists()).toBeFalsy()
  })
  it('renders with isAncestorDao === 0', async () => {
    const wrapper = mount(DaoTitleVue, {
      props: {
        dataObj: {
          daoName: 'DAONAME',
          erc20Name: 'ERC20NAME',
          isAncestorDao: 0,
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('DAONAME ERC20NAME')
    const erc20Name = wrapper.find('.erc20-name')
    expect(erc20Name.exists()).toBeTruthy()
    const daoImg = wrapper.find('.dao-img')
    expect(daoImg.exists()).toBeTruthy()
    expect(daoImg.attributes('src')).toBe('/src/assets/images/subNodes.png')
  })
  it('renders with isAncestorDao === 1', async () => {
    const wrapper = mount(DaoTitleVue, {
      props: {
        dataObj: {
          daoName: 'DAONAME',
          erc20Name: 'ERC20NAME',
          isAncestorDao: 1,
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    expect(wrapper.text()).toBe('DAONAME ERC20NAME')
    const erc20Name = wrapper.find('.erc20-name')
    expect(erc20Name.exists()).toBeTruthy()
    const daoImg = wrapper.find('.dao-img')
    expect(daoImg.exists()).toBeTruthy()
    expect(daoImg.attributes('src')).toBe('/src/assets/images/seedNodes.png')
  })
})
