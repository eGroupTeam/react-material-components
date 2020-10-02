import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import SnackbarContent from '@e-group/material-lab/SnackbarContent';

export default {
  title: 'Lab/SnackbarContent',
  component: SnackbarContent,
  argTypes: {
    message: { control: 'text', defaultValue: 'Message' },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['default', 'warning', 'info', 'success', 'error'],
      },
      defaultValue: 'default',
    },
  },
} as Meta;

export const Default: FC = (args) => <SnackbarContent {...args} />;
