import PermissionListVue from "../PermissionList.vue";
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import usePermissionStore from "@/store/permissions";
import { createPinia, setActivePinia } from 'pinia'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')
describe('PermissionList', () => {
  let store: any
  beforeEach(async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = usePermissionStore()
    vi.spyOn(store, 'getPermissionListInDetail');
    (store.getPermissionListInDetail as MockedFunction<any>).mockResolvedValue(true);
    vi.mock('vue-router');
    const mockRoute = {
      path: '/',
      meta: {
        title: '',
        icon: '',
        main: true,
      },
      name: '',
      fullPath: '/',
      matched: [],
      query: {
        id: '1',
      },
      hash: '',
      params: {},
      redirectedFrom: undefined,
    };
    const VueRouter = await import('vue-router');
    (
      VueRouter.useRoute as MockedFunction<typeof VueRouter.useRoute>
    ).mockReturnValue(mockRoute);
  })
  it('render', async () => {
    const wrapper = mount(PermissionListVue, {
      props: {
        isDialog: true,
      },
      global: {
        plugins: [vuetify]
      }
    })
    store.permissionList = [{
      permissionType: 1,
      daoId: '1',
      daoName: 'DAO',
      projectId: '1',
      workId: 1,
      daoNameNft: 'DAO NAME',
      workNumber: 0,
      erc721Token: '0x11',
      ownerAddress: '0X00',
    }]
    await wrapper.vm.$nextTick()
    expect(store.getPermissionListInDetail).toBeCalledWith({ daoId: '1' })
    const dialog = document.querySelector('.v-dialog');
    expect(dialog).toBeTruthy();
    const headers = document.querySelectorAll('.v-data-table-header__content')
    expect(headers.length).toBe(3)
    expect(headers[0].innerHTML).toBe('<span>Permissions</span><!----><!---->')
    expect(headers[1].innerHTML).toBe('<span>NFT</span><!----><!---->')
    expect(headers[2].innerHTML).toBe('<span>Holder</span><!----><!---->')
  })
})
