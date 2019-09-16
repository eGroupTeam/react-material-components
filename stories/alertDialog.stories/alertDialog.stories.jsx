import React from 'react';

import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

import AlertDialog from '@e-group/material-module/AlertDialog';

storiesOf('AlertDialog', module)
  .add(
    'default',
    () => {
      const isOpen = boolean('IsOpen', true)
      const title = text('Title', 'dialog title')
      const message = text('Message', 'dialog message')

      return (
        <AlertDialog
          title={title}
          message={message}
          isOpen={isOpen}
          handleClose={e => {
            boolean('IsOpen', false)
          }}
        />
      )
    },
    {
      info: {
        propTables: [AlertDialog]
      }
    }
  )