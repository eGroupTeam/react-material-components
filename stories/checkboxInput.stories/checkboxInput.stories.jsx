import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import CheckboxInput from '@e-group/material/CheckboxInput/CheckboxInput';
import CheckboxInputField from '@e-group/material-form/CheckboxInputField';
import { Field } from 'redux-form';
import { Field as ImmutableField } from 'redux-form/immutable';
import ImmutableCheckboxInputField from '@e-group/material-form/immutable/CheckboxInputField';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store as immutableStore } from '../redux/immutable/configureStore';
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
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'with immutable Field',
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
              <ImmutableReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <ImmutableField
                  name="field1"
                  component={ImmutableCheckboxInputField}
                  toggleInput
                  label="with Field"
                />
                <ImmutableField
                  name="field2"
                  component={ImmutableCheckboxInputField}
                  toggleInput
                  label="with Field"
                />
              </ImmutableReduxForm>
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
