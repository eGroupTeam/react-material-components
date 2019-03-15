import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import checkboxInputMarkdownText from './doc/checkboxInput.md';
import CheckboxInput, { CheckboxInputComponent } from '../src/CheckboxInput';

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
            <CheckboxInput
              MUICheckboxProps={{
                variant: 'contained'
              }}
              MUIInputProps={{
                value: 'awesome!'
              }}
              checked={checked}
              onChange={e => {
                console.log('checked!');
                setChecked(!checked);
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
