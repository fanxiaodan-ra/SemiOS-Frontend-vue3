import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import SucDialogVue from '../SucDialog.vue'
import { useRouter } from 'vue-router'
import useSetupDaoStore from '@/store/setupDao'

// Mock Vue Router
vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

// Mock setupDaoStore
vi.mock('@/store/setupDao', () => ({
  default: vi.fn(),
}))

describe('SucDialogVue', () => {
  const mockedRouter = { push: vi.fn() }
  const mockedStore = {
    nft0Info: { imgUrl: 'test.jpg', bgColor: 'red' },
    workId: '123',
    daoId: '456',
  }

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockedRouter);
    (useSetupDaoStore as any).mockReturnValue(mockedStore);
  });

  it('should render correctly', () => {
    const wrapper = mount(SucDialogVue, {
      props: { modelValue: true },
    })

    expect(wrapper.find('v-img').exists()).toBe(true)
    expect(wrapper.find('v-img').attributes('src')).toBe('test.jpg')
    expect(wrapper.find('v-btn').exists()).toBe(true)
  })

  it('should emit update:modelValue when cancelDialog is called', async () => {
    const wrapper = mount(SucDialogVue, {
      props: { modelValue: true },
    })

    await wrapper.vm.cancelDialog()
  })

  it('should call router.push with correct params when goNftDetail is called', async () => {
    const wrapper = mount(SucDialogVue, {
      props: { modelValue: true },
    })

    await wrapper.vm.goNftDetail()
    expect(mockedRouter.push).toHaveBeenCalledWith({
      name: 'workDetails',
      query: { id: '123' },
    })
  })

  it('should call router.push with correct params when goNodeDetail is called', async () => {
    const wrapper = mount(SucDialogVue, {
      props: { modelValue: true },
    })

    await wrapper.vm.goNodeDetail()
    expect(mockedRouter.push).toHaveBeenCalledWith({
      name: 'nodeDetails',
      query: { id: '456' },
    })
  })
})
