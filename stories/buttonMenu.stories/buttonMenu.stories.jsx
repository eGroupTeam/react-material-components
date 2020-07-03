import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';

storiesOf('ButtonMenu', module)
  .add(
    'default',
    () => {
      const Demo = () => (
        <ButtonMenu
          id="foo"
          button={<Button onClick={action('clicked 1')}>test</Button>}
        >
          <MenuItem onClick={action('clicked 2')}>item1</MenuItem>
          <MenuItem onClick={action('clicked 3')}>item2</MenuItem>
        </ButtonMenu>
      );
      return <Demo />;
    },
    {
      info: {
        propTables: [ButtonMenu]
      }
    }
  )