import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withNotes } from '@storybook/addon-notes';
import { withKnobs } from '@storybook/addon-knobs';
import theme from './theme';

addParameters({
  options: {
    theme
  },
});
addDecorator(withKnobs)
addDecorator(withInfo);
addDecorator(withNotes);

function loadStories() {
  require('../stories/alertDialog.stories');
  require('../stories/backAppbar.stories');
  require('../stories/breadcrumbs.stories');
  require('../stories/confirmDialog.stories');
  require('../stories/button.stories.jsx');
  require('../stories/checkbox.stories.jsx');
  require('../stories/checkboxInput.stories.jsx');
  require('../stories/checkboxInputGroup.stories.jsx');
  require('../stories/dataList.stories.jsx');
  require('../stories/intlControlProvider.stories');
  require('../stories/lab.stories');
  require('../stories/nestedList.stories.jsx');
  require('../stories/picker.stories');
  require('../stories/reactSelect.stories');
  require('../stories/position.stories.jsx');
  require('../stories/position.stories.jsx');
  require('../stories/radio.stories.jsx');
  require('../stories/radioGroup.stories.jsx');
  require('../stories/searchDataList.stories.jsx');
  require('../stories/simpleAddress.stories.jsx');
  require('../stories/textLoading.stories.jsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
