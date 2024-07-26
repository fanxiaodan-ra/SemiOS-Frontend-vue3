import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MyPermissionsVue from '../MyPermissions.vue';
import usePermissionStore from '@/store/permissions';
import useUserStore from '@/store';
import { useRouter } from 'vue-router';

// Mock dependencies
vi.mock('@/store/permissions');
vi.mock('@/store');

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('MyPermissionsVue', () => {
  let wrapper: any;

  const mockedPermissionStore = {
    myPermissions: [],
    myPermissionsPageInfo: {
      totalItems: 0,
      pageNo: 1,
    },
    getUserPermissions: vi.fn(),
  };

  const mockedUserStore = {
    UserInfo: {
      address: '0x123',
    },
  };

  const mockedRouter = {
    push: vi.fn(),
  };

  beforeEach(() => {
    (usePermissionStore as any).mockReturnValue(mockedPermissionStore);
    (useUserStore as any).mockReturnValue(mockedUserStore);
    (useRouter as any).mockReturnValue(mockedRouter);
    wrapper = mount(MyPermissionsVue, {
      global: {
        components: {
          Table: {
            template: '<div><slot></slot></div>',
          },
          TextEllipsis: {
            template: '<div><slot></slot></div>',
          },
          'v-divider': {
            template: '<div></div>',
          },
          'v-tooltip': {
            template: '<div><slot name="activator"></slot></div>',
          },
          'v-btn': {
            template: '<button><slot></slot></button>',
          },
        },
      },
    });
  });

  it('should render correctly', () => {
    expect(wrapper.find('h2').text()).toBe('My Permissions');
    expect(wrapper.findAll('v-btn').length).toBe(0);
  });

  it('should call loadItems on mount', async () => {
    await wrapper.vm.loadItems({
      page: 1,
    });
    expect(mockedPermissionStore.getUserPermissions).toHaveBeenCalledWith({
      userAddress: mockedUserStore.UserInfo.address,
      pageNo: 1,
    });
  });

  it('should update isPermissionTransfer and selectItem when onEdit is called', async () => {
    const item = { permissionType: 'test', permissionName: 'Test Permission' };
    await wrapper.vm.onEdit(item);
    expect(wrapper.vm.isPermissionTransfer).toBe(true);
    expect(wrapper.vm.selectItem).toEqual(item);
  });
});
