import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';

export default {
  title: 'Lab/ButtonMenu',
  component: ButtonMenu,
} as Meta;

export const Default: FC = (args) => (
  <ButtonMenu
    button={<Button onClick={() => console.log('clicked')}>test</Button>}
    {...args}
  >
    <MenuItem onClick={() => console.log('clicked')}>item1</MenuItem>
    <MenuItem onClick={() => console.log('clicked')}>item2</MenuItem>
  </ButtonMenu>
);
