import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import ConfirmDialog from '@e-group/material-module/ConfirmDialog';

export default {
  title: 'Modules/ConfirmDialog',
  component: ConfirmDialog,
  argTypes: {
    primary: { control: 'text', defaultValue: 'Title' },
    message: { control: 'text', defaultValue: 'Message' },
    isOpen: { control: 'boolean', defaultValue: true },
    fullWidth: { control: 'boolean', defaultValue: true },
    handleClose: { control: 'boolean', name: 'isOpen' },
    onCancel: { action: 'cancel click' },
    onConfirm: { action: 'confirm click' },
  },
} as Meta;

export const Default: FC = (args) => <ConfirmDialog {...args} />;
