import React from 'react';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field as ImmutableField } from 'redux-form/immutable';
import RadioInput from '@e-group/material/RadioInput';
import RadioInputField from '@e-group/material-form/RadioInputField';
import ImmutableRadioInputField from '@e-group/material-form/immutable/RadioInputField';
import { Field } from 'redux-form';
import RadioInputButtons from './RadioInputButtons';
import Highlight from '../components/Highlight';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import markdownText from './radioInput.md';
import { store as immutableStore } from '../redux/immutable/configureStore';
import { store } from '../redux/configureStore';
import ReduxForm from '../components/ReduxForm';

storiesOf('RadioInput', module)
  .addDecorator((story) => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      return <RadioInputButtons />;
    },
    {
      notes: markdownText,
      info: {
        propTables: [RadioInput],
      },
    }
  )
  .add(
    'with controled checked',
    () => {
      const checked = boolean('Checked', true);
      return (
        <RadioInput
          MuiInputProps={{
            value: 'awesome!',
          }}
          checked={checked}
          onChange={(e) => {
            boolean('Checked', !checked);
          }}
          toggleInput
          label="with controled checked"
        />
      );
    },
    {
      notes: markdownText,
      info: {
        propTables: [RadioInput],
      },
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: {
            value: 'female',
          },
        });
        const handleChange = (values) => {
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
        propTables: [RadioInput],
      },
    }
  );

storiesOf('RadioInput', module)
  .addDecorator((story) => (
    <Provider store={immutableStore}>{story()}</Provider>
  ))
  .add(
    'with immutable Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: {
            value: 'female',
          },
        });
        const handleChange = (values) => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm
                onChange={handleChange}
                initialValues={fromJS(values)}
              >
                <ImmutableField
                  name="gender"
                  component={ImmutableRadioInputField}
                  toggleInput
                  label="male"
                  radioValue="male"
                />
                <ImmutableField
                  name="gender"
                  component={ImmutableRadioInputField}
                  toggleInput
                  label="female"
                  radioValue="female"
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
      notes: markdownText,
      info: {
        propTables: [RadioInput],
      },
    }
  );
