import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import AlertDialog from '@e-group/material-module/AlertDialog';

export default {
  title: 'Modules/AlertDialog',
  component: AlertDialog,
  argTypes: {
    primary: { control: 'text', defaultValue: 'Title' },
    message: { control: 'text', defaultValue: 'Message' },
    isOpen: { control: 'boolean', defaultValue: true },
    fullWidth: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
  },
} as Meta;

export const Default: FC = (args) => <AlertDialog {...args} />;
