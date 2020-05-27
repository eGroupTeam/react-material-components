import React from 'react';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store as immutableJsStore } from '../redux/immutable/configureStore';
import { boolean } from '@storybook/addon-knobs';
import markdownText from './radioInput.md';

import { Provider } from 'react-redux';
import ImmutableJsReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import RadioInput from '@e-group/material/RadioInput/RadioInput';
import RadioInputField from '@e-group/material-form/RadioInputField';
import RadioInputButtons from './RadioInputButtons'

storiesOf('RadioInput', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .add(
    'default',
    () => {
      return <RadioInputButtons />
    },
    {
      notes: markdownText,
      info: {
        propTables: [RadioInput]
      }
    }
  )
  .add(
    'with controled checked',
    () => {
      const checked = boolean('Checked', true)
      return (
        <RadioInput
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
      notes: markdownText,
      info: {
        propTables: [RadioInput]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: {
            value: "female"
          }
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableJsReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  name="gender"
                  component={RadioInputField}
                  toggleInput
                  label="male"
                  radioValue="male"
                />
                <Field
                  name="gender"
                  component={RadioInputField}
                  toggleInput
                  label="female"
                  radioValue="female"
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
      notes: markdownText,
      info: {
        propTables: [RadioInput]
      }
    }
  );
