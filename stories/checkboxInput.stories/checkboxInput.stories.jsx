import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import CheckboxInput from '@e-group/material/CheckboxInput/CheckboxInput';
import CheckboxInputField from '@e-group/material-form/CheckboxInputField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from '../redux/configureStore';
import { boolean } from '@storybook/addon-knobs';
import checkboxInputMarkdownText from './checkboxInput.md';

storiesOf('CheckboxInput', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <CheckboxInput
        defaultChecked
        toggleInput
        label="default"
      />
    ),
    {
      notes: checkboxInputMarkdownText,
      info: {
        propTables: [CheckboxInput]
      }
    }
  )
  .add(
    'with controled checked',
    () => {
      const checked = boolean('Checked', true)
      return (
        <CheckboxInput
          MuiInputProps={{
            value: 'awesome!'
          }}
          checked={checked}
          onChange={e => {
            boolean('Checked', !checked)
          }}
          toggleInput
          label="with controled checked"
        />
      );
    },
    {
      notes: checkboxInputMarkdownText,
      info: {
        propTables: [CheckboxInput]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            checked: true
          }
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  name="field1"
                  component={CheckboxInputField}
                  toggleInput
                  label="with Field"
                />
                <Field
                  name="field2"
                  component={CheckboxInputField}
                  toggleInput
                  label="with Field"
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={JSON.stringify(values, null, 4)}
                type="language-json"
              />
            </Grid>
          </Grid>
        );
      };
      return <Form />;
    },
    {
      notes: checkboxInputMarkdownText,
      info: {
        propTables: [CheckboxInput]
      }
    }
  );
