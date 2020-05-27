import React from 'react';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { store } from '../redux/configureStore';
import { store as immutableJsStore } from '../redux/immutable/configureStore';
import { boolean } from '@storybook/addon-knobs';
import markdownText from './radioInput.md';

import { Provider } from 'react-redux';
import ImmutableJsReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field as ImmutableJsField } from 'redux-form/immutable';
import RadioInput from '@e-group/material/RadioInput';
import RadioInputField from '@e-group/material-form/RadioInputField';
import ImmutableRadioInputField from '@e-group/material-form/immutable/RadioInputField';
import RadioInputButtons from './RadioInputButtons'
import { Field } from 'redux-form';
import ReduxForm from '../components/ReduxForm';

storiesOf('RadioInput', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
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
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={values}>
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
      notes: markdownText,
      info: {
        propTables: [RadioInput]
      }
    }
  );

storiesOf('RadioInput', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .add(
    'with immutable Field',
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
                <ImmutableJsField
                  name="gender"
                  component={ImmutableRadioInputField}
                  toggleInput
                  label="male"
                  radioValue="male"
                />
                <ImmutableJsField
                  name="gender"
                  component={ImmutableRadioInputField}
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
