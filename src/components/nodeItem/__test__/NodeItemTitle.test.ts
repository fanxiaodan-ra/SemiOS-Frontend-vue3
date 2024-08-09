import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import NodeItemTitleVue from '../NodeItemTitle.vue'


global.ResizeObserver = require('resize-observer-polyfill')

describe('NodeItemTitleVue', () => {
  it('renders with default', async () => {
    const wrapper = shallowMount(NodeItemTitleVue, {
      props: {
        dataObj: {
          daoLogoUrl: 'https://url.com',
          daoDescription: 'DAODESCRIPTION',
          togetherDaoMakerVo: {
            makerTotalAmount: '1',
            noSpendEthAmount: '2',
            noSpendTokenAmount: '3',
          },
        },
        isFavorited: true,
      },
    });
    const img = wrapper.find('[src="https://url.com"]')
    expect(img.exists()).toBeTruthy()
  })
});