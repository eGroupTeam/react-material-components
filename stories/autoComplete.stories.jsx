import React from 'react';
import { storiesOf } from '@storybook/react';

import autoCompleteMarkdownText from './doc/autoComplete.md';

import AutoComplete from '@e-group/material-module/AutoComplete';
import { boolean } from '@storybook/addon-knobs';

storiesOf('AutoComplete', module)
  .add(
    'default',
    () => (
      <AutoComplete
        MuiTextFieldProps={{
          fullWidth: boolean('FullWidth', true),
          InputProps: {
            disableUnderline: boolean('DisableUnderline', false)
          }
        }}
        placeholder="Search"
      />
    ),
    {
      notes: autoCompleteMarkdownText,
      info: {
        propTables: [AutoComplete]
      }
    }
  )
