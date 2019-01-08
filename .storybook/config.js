import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/components.js');
  require('../stories/form.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);