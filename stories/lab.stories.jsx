import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MenuItem } from '@material-ui/core';
import Button from '../src/Button';
import ButtonMenu from '../src/lab/ButtonMenu';

storiesOf('Lab', module).add(
  'ButtonMenu',
  () => (
    <ButtonMenu
      id="foo"
      button={<Button onClick={action('clicked 1')}>test</Button>}
    >
      <MenuItem onClick={action('clicked 2')}>item1</MenuItem>
      <MenuItem onClick={action('clicked 3')}>item2</MenuItem>
    </ButtonMenu>
  ),
  {
    info: {
      propTables: [ButtonMenu],
      propTablesExclude: [Button]
    }
  }
);
