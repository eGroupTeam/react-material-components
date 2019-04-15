import React from 'react';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import { Field } from 'redux-form/immutable';

import checkboxInputGroupText from './doc/checkboxInputGroup.md';
import CheckboxInputGroup from '../src/CheckboxInputGroup';
import CheckboxInputGroupField from '../src/CheckboxInputGroupField';

storiesOf('CheckboxInputGroup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <CheckboxInputGroup
        label="default"
        options={[
          {
            name: 'checkbox1',
            label: 'normal checkbox',
            MuiCheckboxProps: {
              color: 'primary'
            }
          },
          {
            name: 'checkbox2',
            label: 'checked with text input',
            MuiCheckboxProps: {
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
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with error helperText',
    () => (
      <CheckboxInputGroup
        label="with error"
        options={[
          {
            name: 'checkbox1',
            label: 'normal checkbox',
            MuiCheckboxProps: {
              color: 'primary'
            }
          },
          {
            name: 'checkbox2',
            label: 'checked with text input',
            MuiCheckboxProps: {
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
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const initialValues = fromJS({
        CheckboxInputGroupField: {
          checkbox2: {
            checked: true,
            text: 'awesome!'
          }
        }
      });
      return (
        <ReduxForm initialValues={initialValues}>
          <Field
            name="CheckboxInputGroupField"
            label="with Field"
            component={CheckboxInputGroupField}
            options={[
              {
                name: 'checkbox1',
                label: 'normal checkbox',
                MuiCheckboxProps: {
                  color: 'primary'
                }
              },
              {
                name: 'checkbox2',
                label: 'checked with text input',
                MuiCheckboxProps: {
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
        </ReduxForm>
      );
    },
    {
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  );
