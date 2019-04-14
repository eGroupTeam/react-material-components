import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
  require('../stories/button.stories.jsx');
  require('../stories/container.stories.jsx');
  require('../stories/loader.stories.jsx');
  require('../stories/form.stories.jsx');
  require('../stories/modules.stories.jsx');
  require('../stories/checkbox.stories.jsx');
  require('../stories/checkboxInput.stories.jsx');
  require('../stories/checkboxInputGroup.stories.jsx');
  require('../stories/intlControlProvider.stories.jsx');
  require('../stories/radio.stories.jsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
