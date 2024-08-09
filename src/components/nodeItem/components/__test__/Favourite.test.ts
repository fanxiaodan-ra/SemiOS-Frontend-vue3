import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import FavouriteVue from '../Favourite/Index.vue'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

const favoriteMock = vi.fn().mockResolvedValue({
  favoriteAmount: 1,
  favorited: true,
})
vi.mock('@/hooks/useFavorite', () => ({
  default: () => ({
    favoriteData: favoriteMock,
  })
}))

describe('FavouriteVue', () => {
  it('renders with favorited === true', async () => {
    const wrapper = mount(FavouriteVue, {
      props: {
        dataObj: {
          favorited: true,
          favoriteAmount: 1,
        },
        isFavorited: true,
      },
      global: {
        plugins: [vuetify]
      }
    })
    const favorite = wrapper.find('.favourite')
    expect(favorite.exists()).toBeTruthy()
    expect(favorite.find('.icon-icon3')).toBeTruthy()
    expect(favorite.find('.favorite-num').text()).toEqual('1')
  })
  it('renders with favorited === false', async () => {
    const wrapper = mount(FavouriteVue, {
      props: {
        dataObj: {
          favorited: false,
          favoriteAmount: 0,
        },
        isFavorited: true,
      },
      global: {
        plugins: [vuetify]
      }
    })
    const favorite = wrapper.find('.favourite')
    console.log(favorite.html())
    expect(favorite.exists()).toBeTruthy()
    expect(favorite.find('.icon-shoucang').exists()).toBeTruthy()
    expect(favorite.find('.favorite-num').text()).toEqual('0')
    const btn = wrapper.find('button')
    await btn.trigger('click')
    expect(favoriteMock).toHaveBeenCalled()
  })
})
