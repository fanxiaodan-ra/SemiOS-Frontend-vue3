import PermissionTransferVue from '../PermissionTransfer.vue'
import { describe, it, expect, vi, beforeEach, MockedFunction } from 'vitest'
import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import usePermissionStore from "@/store/permissions";
import { createPinia, setActivePinia } from 'pinia'
import * as exWeb3Service from '@/common/exWeb3service'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')
describe('PermissionTransfer', () => {
  let store: any
  beforeEach(async () => {
    const pinia = createPinia();
    setActivePinia(pinia);
    store = usePermissionStore()
    vi.spyOn(store, 'getUserPermissionsNft');
    (store.getUserPermissionsNft as MockedFunction<any>).mockResolvedValue(() => { 
      return {
        wait: () => vi.fn().mockResolvedValue(true)
      }
    });
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
    const wrapper = mount(PermissionTransferVue, {
      props: {
        isDialog: true,
        selectItem: {},
        workId: '1',
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
    vi.spyOn(exWeb3Service, 'setDaoPermission');
    await wrapper.vm.$nextTick()
    expect(store.getUserPermissionsNft).toBeCalledWith({ workId: '1' })
    const dialog = document.querySelector('.v-dialog');
    expect(dialog).toBeTruthy();
    expect(document.querySelector('.v-btn')).toBeTruthy();
    await wrapper.vm.transfer()
    expect(exWeb3Service.setDaoPermission).toBeCalled()
  })
})
