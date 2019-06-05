import React from 'react';
import { storiesOf } from '@storybook/react';

import autoCompleteMarkdownText from './doc/autoComplete.md';
import AutoComplete from '../../../material/src/AutoComplete';

storiesOf('Modules', module).add(
  'AutoComplete',
  () => {
    return (
      <AutoComplete
        MuiTextFieldProps={{
          fullWidth: true,
          InputProps: {
            disableUnderline: true
          }
        }}
        placeholder="Search"
      />
    );
  },
  {
    notes: autoCompleteMarkdownText,
    info: {
      propTables: [AutoComplete]
    }
  }
);
