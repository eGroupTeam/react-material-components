import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import CheckboxInput, { CheckboxInputComponent } from '../src/CheckboxInput';
import CheckboxInputField from '../src/CheckboxInputField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from './redux/configureStore';
import checkboxInputMarkdownText from './doc/checkboxInput.md';

storiesOf('CheckboxInput', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <CheckboxInput
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
          <CheckboxInput
            MuiInputProps={{
              value: 'awesome!'
            }}
            checked={checked}
            onChange={e => {
              setChecked(!checked);
            }}
            toggleInput
            label="with controled checked"
          />
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
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            checked: true,
            text: 'awesome!'
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
        propTables: [CheckboxInputField],
        propTablesExclude: [CheckboxInputField]
      }
    }
  );
