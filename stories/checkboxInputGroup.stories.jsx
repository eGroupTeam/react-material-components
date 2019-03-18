import React from 'react';
import { storiesOf } from '@storybook/react';

import checkboxInputGroupText from './doc/checkboxInputGroup.md';
import CheckboxInputGroup from '../src/CheckboxInputGroup';

storiesOf('CheckboxInputGroup', module)
  .add(
    'default',
    () => (
      <CheckboxInputGroup
        label="default"
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
        margin="normal"
        fullWidth
        required
      />
    ),
    {
      info: {
        text: checkboxInputGroupText,
        propTables: [CheckboxInputGroup],
        propTablesExclude: [CheckboxInputGroup]
      }
    }
  )
  .add(
    'with error helperText',
    () => (
      <CheckboxInputGroup
        label="default"
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
        margin="normal"
        fullWidth
        required
        showHelperText
        error
        helperText="helperText"
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
