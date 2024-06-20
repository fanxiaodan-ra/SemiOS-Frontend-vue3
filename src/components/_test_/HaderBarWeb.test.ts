import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HaderBarWeb from '../HaderBarWeb.vue'
import { aPush } from '@/utils'
// import { shallowMount, createLocalVue } from "@vue/test-utils";

// import ElementUI from "element-ui";
// const localVue = createLocalVue();
// localVue.use(ElementUI);
//TODO 测试
describe('HaderBarWeb', () => {
  it('renders properly', () => {
    const href = aPush('www.baidu.com')
    const wrapper = mount(HaderBarWeb)
    expect(href).toBe('www.baidu.com')
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
