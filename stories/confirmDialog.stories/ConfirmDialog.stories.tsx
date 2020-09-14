import React from 'react';

import { Meta } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ConfirmDialog from '@e-group/material-module/ConfirmDialog';

export default {
  title: 'Modules/ConfirmDialog',
  component: ConfirmDialog,
} as Meta;

export const Default: FC = () => {
  const isOpen = boolean('IsOpen', true);
  const title = text('Title', 'dialog title');
  const message = text('Message', 'dialog message');

  return (
    <ConfirmDialog
      title={title}
      message={message}
      isOpen={isOpen}
      handleClose={() => {
        boolean('IsOpen', false);
      }}
      onCancel={action('cancel click')}
      onConfirm={action('confirm click')}
    />
  );
};
