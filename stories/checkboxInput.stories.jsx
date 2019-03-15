import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import checkboxInputMarkdownText from './doc/checkboxInput.md';
import CheckboxInput, { CheckboxInputComponent } from '../src/CheckboxInput';
import { Button } from '@material-ui/core';

storiesOf('CheckboxInput', module)
  .add(
    'default',
    () => (
      <CheckboxInput
        MUICheckboxProps={{
          variant: 'contained',
          onClick: action('clicked!')
        }}
        MUIInputProps={{
          value: 'awesome!'
        }}
        defaultChecked
        toggleInput
        label="default"
      />
    ),
    {
      info: {
        text: checkboxInputMarkdownText,
        propTables: [CheckboxInputComponent],
        propTablesExclude: [CheckboxInput]
      }
    }
  )
  .add(
    'with controled checked',
    () => {
      const Controled = () => {
        const [checked, setChecked] = React.useState(true);
        return (
          <React.Fragment>
            <Button onClick={() => setChecked(!checked)}>
              Click to change checked
            </Button>
            <CheckboxInput
              MUICheckboxProps={{
                variant: 'contained'
              }}
              MUIInputProps={{
                value: 'awesome!'
              }}
              checked={checked}
              onChange={() => {
                action('changed!');
              }}
              toggleInput
              label="default"
            />
          </React.Fragment>
        );
      };
      return <Controled />;
    },
    {
      info: {
        text: checkboxInputMarkdownText,
        propTables: [CheckboxInputComponent],
        propTablesExclude: [CheckboxInput]
      }
    }
  );
