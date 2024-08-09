import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FixedPriceVue from '../FixedPrice.vue';
import { nextTick } from 'vue';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
global.ResizeObserver = require('resize-observer-polyfill')

describe('MyComponent', () => {
  it('should render the current price label', () => {
    const wrapper = mount(FixedPriceVue, {
      global: {
        plugins: [vuetify]
      } 
    });
    expect(wrapper.html()).toContain('Current Price');
  });

  it('should render the input field with the correct label', () => {
    const wrapper = mount(FixedPriceVue, {
      global: {
        plugins: [vuetify]
      } 
    });
    const inputField = wrapper.find('.v-field-label');
    expect(inputField.text()).toBe('Please set a price');
  });

  it('should validate the input value', async () => {
    const wrapper = mount(FixedPriceVue, {
      props: {
        modelValue: 0,
      },
      global: {
        plugins: [vuetify]
     }
    });

    const inputField = wrapper.find('input');

    await inputField.setValue('');
    await nextTick();
      expect(wrapper.text()).toContain('Current PricePlease set a pricePlease set a priceItem is required');

    await inputField.setValue(0);
    await nextTick();
      expect(wrapper.text()).toContain('Current PricePlease set a pricePlease set a priceThe value must be greater than 0.0001');
  });
});
