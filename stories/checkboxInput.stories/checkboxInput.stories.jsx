import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import ImmutableJsReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import CheckboxInput from '@e-group/material/CheckboxInput/CheckboxInput';
import CheckboxInputField from '@e-group/material-form/CheckboxInputField';
import { Field } from 'redux-form';
import { Field as ImmutableJsField } from 'redux-form/immutable';
import ImmutableJsCheckboxInputField from '@e-group/material-form/immutable/CheckboxInputField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store as immutableJsStore } from '../redux/immutable/configureStore';
import { store } from '../redux/configureStore';
import { boolean } from '@storybook/addon-knobs';
import checkboxInputMarkdownText from './checkboxInput.md';

storiesOf('CheckboxInput', module)
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
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'with Field',
    () => {
      const initialValues = {
        field1: {
          checked: true
        }
      }
      const Form = () => {
        const [values, setValues] = React.useState(initialValues);
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={initialValues}>
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
  )


storiesOf('CheckboxInput', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .add(
    'with immutableJS Field',
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
              <ImmutableJsReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <ImmutableJsField
                  name="field1"
                  component={ImmutableJsCheckboxInputField}
                  toggleInput
                  label="with Field"
                />
                <ImmutableJsField
                  name="field2"
                  component={ImmutableJsCheckboxInputField}
                  toggleInput
                  label="with Field"
                />
              </ImmutableJsReduxForm>
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
