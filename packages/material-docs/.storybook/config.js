import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';

addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
  require('../src/stories/breadcrumbs.stories.jsx');
  require('../src/stories/button.stories.jsx');
  require('../src/stories/checkbox.stories.jsx');
  require('../src/stories/checkboxInput.stories.jsx');
  require('../src/stories/checkboxInputGroup.stories.jsx');
  require('../src/stories/intlControlProvider.stories.jsx');
  require('../src/stories/lab.stories.jsx');
  require('../src/stories/modules.stories.jsx');
  require('../src/stories/nestedList.stories.jsx');
  require('../src/stories/radio.stories.jsx');
  require('../src/stories/radioGroup.stories.jsx');
  require('../src/stories/textLoading.stories.jsx');
  require('../src/stories/utils.stories.jsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
