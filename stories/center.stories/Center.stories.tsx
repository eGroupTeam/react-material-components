import React from 'react';
import { Meta, Story } from '@storybook/react';

import Center from '@e-group/material-layout/Center';
import { AppBar, Typography, Toolbar } from '@material-ui/core';

export default {
  title: 'Layout/Center',
  component: Center,
  argTypes: {
    offsetTop: { control: 'number', defaultValue: 0 },
    height: { control: 'number' },
  },
} as Meta;

export const Default: Story = (args) => (
  <>
    <AppBar position="static">
      <Toolbar>eGroupAI</Toolbar>
    </AppBar>
    <Center style={{ border: '1px solid #000000' }} {...args}>
      <div>
        <Typography>Im center of the world.</Typography>
      </div>
    </Center>
  </>
);
