import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import ConfirmDialog from '@e-group/material-module/ConfirmDialog';

storiesOf('ConfirmDialog', module)
  .add(
    'default',
    () => {
      const isOpen = boolean('IsOpen', true)
      const title = text('Title', 'dialog title')
      const message = text('Message', 'dialog message')

      return (
        <ConfirmDialog
          title={title}
          message={message}
          isOpen={isOpen}
          handleClose={e => {
            boolean('IsOpen', false)
          }}
          onCancel={action('cancel click')}
          onConfirm={action('confirm click')}
        />
      )
    },
    {
      info: {
        propTables: [ConfirmDialog]
      }
    }
  )