import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Table from '../Table.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Table', () => {
  it('renders properly', () => {
    const wrapper = mount(Table, {
      props: {
        headers: [
          {
            title: 'Name',
            value: 'name'
          },
          {
            title: 'Age',
            value: 'age'
          }
        ],
        serverItems: [
          {
            name: 'John Doe',
            age: 30
          },
          {
            name: 'Jane Doe',
            age: 25
          }
        ],
        loading: false,
        loadItems: vi.fn(),
        pageInfo: {
          itemsPerPage: 10,
          curPage: 1,
          totalItems: 2,
          pageCount: 1
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    const headers = wrapper.findAll('.v-data-table-header__content')
    expect(headers.length).toBe(2)
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Age')
    const trs = wrapper.findAll('.v-data-table__tr')
    expect(trs.length).toBe(2)
    expect(trs[0].text()).toBe('John Doe30')
    expect(trs[1].text()).toBe('Jane Doe25')

    const pagination = wrapper.find('.v-pagination')
    expect(pagination.exists()).toBe(true)
  })
  it('renders with multi page', async () => {
    const mockLoadItems = vi.fn()
    const wrapper = mount(Table, {
      props: {
        headers: [
          {
            title: 'Name',
            value: 'name'
          },
          {
            title: 'Age',
            value: 'age'
          }
        ],
        serverItems: [
          {
            name: 'John Doe',
            age: 30
          },
          {
            name: 'Jane Doe',
            age: 25
          }
        ],
        loading: false,
        loadItems: mockLoadItems,
        pageInfo: {
          itemsPerPage: 1,
          curPage: 1,
          totalItems: 2,
          pageCount: 1
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    const pagNums = wrapper.findAll('.v-pagination__item')
    expect(pagNums.length).toBe(2)
    const vPag = wrapper.findComponent({
      name: 'VPagination'
    })
    await vPag.vm.$emit('update:page', 2)
    expect(mockLoadItems).toHaveBeenCalledTimes(1)
  })
  it('renders with no Data', () => {
    const wrapper = mount(Table, {
      props: {
        headers: [
          {
            title: 'Name',
            value: 'name'
          },
          {
            title: 'Age',
            value: 'age'
          }
        ],
        serverItems: [],
        loading: false,
        loadItems: vi.fn(),
        pageInfo: {
          itemsPerPage: 10,
          curPage: 1,
          totalItems: 2,
          pageCount: 1
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    const headers = wrapper.findAll('.v-data-table-header__content')
    expect(headers.length).toBe(2)
    expect(headers[0].text()).toBe('Name')
    expect(headers[1].text()).toBe('Age')
    const trs = wrapper.findAll('.v-data-table__tr')
    expect(trs.length).toBe(0)
    const noData = wrapper.find('.no-data')
    expect(noData.exists()).toBe(true)

  })
  it('renders with loading', () => {
    const wrapper = mount(Table, {
      props: {
        headers: [
          {
            title: 'Name',
            value: 'name'
          },
          {
            title: 'Age',
            value: 'age'
          }
        ],
        serverItems: [],
        loading: true,
        loadItems: vi.fn(),
        pageInfo: {
          itemsPerPage: 10,
          curPage: 1,
          totalItems: 2,
          pageCount: 1
        }
      },
      global: {
        plugins: [vuetify]
      }
    })
    console.log(wrapper.html())
    const loaders = wrapper.find('.v-data-table-progress__loader')
    expect(loaders.exists()).toBe(true)
  })
})
