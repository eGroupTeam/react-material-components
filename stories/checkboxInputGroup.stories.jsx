import React from 'react';
import { storiesOf } from '@storybook/react';

import checkboxInputGroupText from './doc/checkboxInputGroup.md';
import CheckboxInputGroup from '../src/CheckboxInputGroup';

storiesOf('CheckboxInputGroup', module).add(
  'default',
  () => (
    <CheckboxInputGroup
      label="default"
      FormControlProps={{
        margin: 'normal',
        fullWidth: true,
        required: true
      }}
      options={[
        {
          name: 'checkbox1',
          label: 'normal checkbox',
          MUICheckboxProps: {
            color: 'primary'
          }
        },
        {
          name: 'checkbox2',
          label: 'checked with text input',
          MUICheckboxProps: {
            color: 'primary'
          },
          toggleInput: true
        },
        {
          name: 'checkbox3',
          label: 'checked with text input',
          toggleInput: true
        }
      ]}
    />
  ),
  {
    info: {
      text: checkboxInputGroupText,
      propTables: [CheckboxInputGroup],
      propTablesExclude: [CheckboxInputGroup]
    }
  }
);
