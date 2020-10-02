import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import Snackbar from '@e-group/material-lab/Snackbar';

export default {
  title: 'Lab/Snackbar',
  component: Snackbar,
  argTypes: {
    message: { control: 'text', defaultValue: 'Message' },
    isOpen: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
    onCloseClick: { action: 'clicked' },
    autoHideDuration: { control: 'number', defaultValue: 2000 },
    anchorOrigin: {
      control: 'object',
      defaultValue: {
        vertical: 'top',
        horizontal: 'center',
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['default', 'warning', 'info', 'success', 'error'],
      },
      defaultValue: 'default',
    },
  },
} as Meta;

export const Default: FC = (args) => <Snackbar {...args} />;
