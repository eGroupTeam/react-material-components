import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
  require('../stories/buttons.js');
  require('../stories/container.js');
  require('../stories/loader.js');
  require('../stories/form.js');
  // You can require as many stories as you need.
}

configure(loadStories, module);
