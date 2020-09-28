import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';

export default {
  title: 'Lab/ButtonMenu',
  component: ButtonMenu,
  argTypes: { onClose: { action: 'closed' } },
} as Meta;

export const Default: FC = (args) => (
  <ButtonMenu
    button={
      <Button onClick={() => console.log('button clicked')}>button</Button>
    }
    {...args}
  >
    <MenuItem onClick={() => console.log('item1 clicked')}>item1</MenuItem>
    <MenuItem onClick={() => console.log('item2 clicked')}>item2</MenuItem>
  </ButtonMenu>
);
