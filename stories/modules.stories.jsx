import React from 'react';
import { storiesOf } from '@storybook/react';

import autoCompleteMarkdownText from './doc/autoComplete.md';
import AutoComplete from '../src/AutoComplete';

storiesOf('Modules', module).add(
  'AutoComplete',
  () => {
    return (
      <AutoComplete
        TextFieldProps={{
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
