import React from 'react';
import { Provider } from 'react-redux';
import { Field } from 'redux-form/immutable';
import { storiesOf } from '@storybook/react';
import { Button } from '@material-ui/core';
import {
  TextField,
  CheckboxInputGroupField,
  CheckboxInputField,
  RadioGroupField,
  SelectField
} from '../src';

import ReduxForm from './components/ReduxForm';

import { store } from './redux/configureStore';
import { fromJS } from 'immutable';

const initialValues = {
  SelectField: 0
};

storiesOf('Form', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('Basic Field components', () => (
    <React.Fragment>
      <ReduxForm initialValues={initialValues}>
        <Field
          name="TextField"
          label="TextField"
          component={TextField}
          fullWidth
          margin="normal"
          required
        />
        <Field
          name="TextField2"
          label="TextField2"
          component={TextField}
          fullWidth
          margin="normal"
          required
          meta={{ asyncValidating: true }}
        />
        <Field
          name="TextField2"
          label="TextField2"
          component={TextField}
          fullWidth
          margin="normal"
          required
          /* Pass meta props cause the failed prop type and don't worry it's just for demo */
          meta={{ invalid: true, touched: true, error: 'error' }}
        />
        <Field
          name="SelectField"
          label="SelectField"
          component={SelectField}
          fullWidth
          margin="normal"
          options={[
            { text: 'cam 1', value: 0 },
            { text: 'cam 2', value: 1 },
            { text: 'cam 3', value: 2 },
            { text: 'cam 4', value: 3 }
          ]}
          required
        />
        <Field
          name="SelectField2"
          label="SelectField2"
          component={SelectField}
          fullWidth
          margin="normal"
          options={[
            { text: 'cam 1', value: 0 },
            { text: 'cam 2', value: 1 },
            { text: 'cam 3', value: 2 },
            { text: 'cam 4', value: 3 }
          ]}
          required
          /* Pass meta props cause the failed prop type and don't worry it's just for demo */
          meta={{ invalid: true, touched: true, error: 'error' }}
        />
        <Button fullWidth variant="contained" style={{ marginRight: '10px' }}>
          Submit
        </Button>
        <Button variant="contained" style={{ marginRight: '10px' }}>
          Button
        </Button>
      </ReduxForm>
    </React.Fragment>
  ))
  .add('CheckboxInputField', () => (
    <React.Fragment>
      Simple CheckboxInputField can add label
      <ReduxForm>
        <Field
          name="normalcheckbox"
          component={CheckboxInputField}
          CheckboxProps={{
            label: 'normal checkbox'
          }}
        />
        <Field
          name="checkboxwithinput"
          component={CheckboxInputField}
          CheckboxProps={{
            label: 'checkbox with input'
          }}
          checkedInput
        />
      </ReduxForm>
    </React.Fragment>
  ))
  .add('CheckboxInputGroupField', () => (
    <React.Fragment>
      The CheckboxInputGroupField is a convenience wrapper for the most common
      cases.
      <ReduxForm>
        <Field
          name="checkboxgroup"
          label="The options you want to checked"
          component={CheckboxInputGroupField}
          FormControlProps={{
            margin: 'normal',
            fullWidth: true,
            required: true
          }}
          options={[
            {
              name: 'checkbox1',
              CheckboxProps: {
                label: 'normal checkbox',
                MUICheckboxProps: {
                  color: 'primary'
                }
              }
            },
            {
              name: 'checkbox2',
              CheckboxProps: {
                label: 'checked with text input',
                MUICheckboxProps: {
                  color: 'primary'
                }
              },
              checkedInput: true
            }
          ]}
        />
        <Field
          name="checkboxgroup2"
          component={CheckboxInputGroupField}
          label="The options you want to checked"
          FormControlProps={{
            margin: 'normal',
            fullWidth: true
          }}
          options={[
            {
              name: 'checkbox1',
              CheckboxProps: {
                label: 'normal checkbox',
                MUICheckboxProps: {
                  color: 'primary'
                }
              }
            },
            {
              name: 'checkbox2',
              CheckboxProps: {
                label: 'normal checkbox',
                MUICheckboxProps: {
                  color: 'primary'
                }
              },
              checkedInput: true
            },
            {
              name: 'checkbox3',
              CheckboxProps: {
                label: 'normal checkbox',
                MUICheckboxProps: {
                  color: 'primary'
                }
              },
              checkedInput: true
            }
          ]}
          // Pass meta props cause the failed prop type and don't worry it's just for demo
          // meta={{ invalid: true, touched: true, error: 'error' }}
        />
      </ReduxForm>
    </React.Fragment>
  ))
  .add('RadioGroupField', () => (
    <React.Fragment>
      The RadioGroupField is a convenience wrapper for the most common cases.
      <ReduxForm>
        <Field
          name="RadioGroupField"
          component={RadioGroupField}
          RadioGroupProps={{
            onChange: (e, { input }) => {
              input.onChange(
                fromJS({
                  optionId: e.target.value
                })
              );
            },
            onBlur: (e, { input }) => {
              input.onChange(
                fromJS({
                  optionId: e.target.value
                })
              );
            },
            value: parsedValue => {
              if (parsedValue === '') return '';
              return parsedValue.get('optionId');
            }
          }}
          FormControlProps={{
            margin: 'normal',
            fullWidth: true,
            required: true
          }}
          label="RadioGroupField"
          options={[
            {
              value: '1',
              label: 'label1'
            },
            {
              value: '2',
              label: 'label2'
            },
            {
              value: '3',
              label: 'label3'
            }
          ]}
        />
        <Field
          name="RadioGroupField2"
          component={RadioGroupField}
          label="RadioGroupField"
          options={[
            {
              value: '1',
              label: 'label1'
            },
            {
              value: '2',
              label: 'label2'
            },
            {
              value: '3',
              label: 'label3'
            }
          ]}
          /* Pass meta props cause the failed prop type and don't worry it's just for demo */
          meta={{ invalid: true, touched: true, error: 'error' }}
        />
      </ReduxForm>
    </React.Fragment>
  ));
