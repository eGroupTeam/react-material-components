import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import { Field } from 'redux-form/immutable';

import checkboxInputMarkdownText from './doc/checkboxInput.md';
import CheckboxInput, { CheckboxInputComponent } from '../src/CheckboxInput';
import CheckboxInputField from '../src/CheckboxInputField';

storiesOf('CheckboxInput', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <CheckboxInput
        MuiCheckboxProps={{
          variant: 'contained',
          onClick: action('clicked!')
        }}
        MuiInputProps={{
          value: 'awesome!'
        }}
        defaultChecked
        toggleInput
        label="default"
      />
    ),
    {
      notes: checkboxInputMarkdownText,
      info: {
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
              MuiCheckboxProps={{
                variant: 'contained'
              }}
              MuiInputProps={{
                value: 'awesome!'
              }}
              checked={checked}
              onChange={e => {
                console.log('checked!');
                setChecked(!checked);
              }}
              toggleInput
              label="with controled checked"
            />
          </React.Fragment>
        );
      };
      return <Controled />;
    },
    {
      notes: checkboxInputMarkdownText,
      info: {
        propTables: [CheckboxInputComponent],
        propTablesExclude: [CheckboxInput]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const initialValues = fromJS({
        CheckboxInputField: {
          checked: true,
          text: 'awesome!'
        }
      });
      return (
        <ReduxForm initialValues={initialValues}>
          <Field
            name="CheckboxInputField"
            component={CheckboxInputField}
            MuiCheckboxProps={{
              variant: 'contained',
              onClick: action('clicked!')
            }}
            defaultChecked
            toggleInput
            label="with Field"
          />
        </ReduxForm>
      );
    },
    {
      notes: checkboxInputMarkdownText,
      info: {
        propTables: [CheckboxInputField],
        propTablesExclude: [CheckboxInputField]
      }
    }
  );
