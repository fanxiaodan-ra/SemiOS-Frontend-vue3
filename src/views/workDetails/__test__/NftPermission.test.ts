import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import NftPermissionVue from '../NftPermission.vue';
import usePermission from '@/store/permissions';
import { useRoute } from 'vue-router';

// Mock dependencies
vi.mock('@/store/permissions');
vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
}));

describe('NftPermissionVue', () => {
  let wrapper: any;

  const mockedPermissionStore = {
    getNftPermissionInDetail: vi.fn().mockResolvedValue([{
      nodeLink: 'link1',
      daoName: 'Dao 1',
      permissionName: 'Permission 1',
    }]),
  };

  const mockedRoute = {
    query: { id: '1' },
  };

  beforeEach(() => {
    (usePermission as any).mockReturnValue(mockedPermissionStore);
    (useRoute as any).mockReturnValue(mockedRoute);

    wrapper = mount(NftPermissionVue, {
      props: {
        isOwner: true,
        daoId: 'dao1',
      },
      global: {
        components: {
          'v-card': { template: '<div><slot></slot></div>' },
          'v-skeleton-loader': { template: '<div class="v-skeleton-loader"></div>' },
          'v-list': { template: '<div><slot></slot></div>' },
          'v-list-item': { template: '<div><slot></slot></div>' },
          'v-list-item-content': { template: '<div><slot></slot></div>' },
          'v-btn': { template: '<button><slot></slot></button>' },
          'v-tooltip': { template: '<div><slot name="activator"></slot></div>' },
          'a': { template: '<a><slot></slot></a>' },
          PermissionTransfer: { template: '<div></div>' },
        },
      },
    });
    wrapper.vm.dataList = [{ nodeLink: 'link1', daoName: 'Dao 1', permissionName: 'Permission 1' }];
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('h4').text()).toBe('Permission Bound To This NFT');
    expect(wrapper.findAll('.v-skeleton-loader').length).toBe(0); // No skeleton loaders should be present initially
  });

  it('should call init method on mounted', async () => {
    expect(mockedPermissionStore.getNftPermissionInDetail).toHaveBeenCalledWith(1);
  });

  it('should update dataList when init method is called', async () => {
    const data = [{ nodeLink: 'link1', daoName: 'Dao 1', permissionName: 'Permission 1' }];
    mockedPermissionStore.getNftPermissionInDetail.mockResolvedValueOnce(data);

    await wrapper.vm.init();

    expect(wrapper.vm.dataList).toEqual(data);
  });

  it('should update isPermissionTransfer and selectItem when onEdit is called', async () => {
    const item = { nodeLink: 'link1', daoName: 'Dao 1', permissionName: 'Permission 1' };

    await wrapper.vm.onEdit(item);

    expect(wrapper.vm.isPermissionTransfer).toBe(true);
    expect(wrapper.vm.selectItem).toEqual({ ...item, workId: '1' });
  });
});
