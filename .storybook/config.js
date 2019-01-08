import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info'

addDecorator(withInfo)

function loadStories() {
  require('../stories/components.js');
  require('../stories/form.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);