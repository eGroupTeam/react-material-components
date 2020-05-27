import React from 'react';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';
import { store as immutableJsStore } from '../redux/immutable/configureStore';
import radioMarkdownText from './radio.md';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field as ImmutableJsField } from 'redux-form/immutable';
import Radio from '@e-group/material/Radio';
import RadioField from '@e-group/material-form/RadioField';
import Highlight from '../components/Highlight';
import ImmutableJsReduxForm from '../components/immutable/ReduxForm';
import RadioButtons from './RadioButtons';
import { Field } from 'redux-form';
import ReduxForm from '../components/ReduxForm';

storiesOf('Radio', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      return <RadioButtons />;
    },
    {
      notes: radioMarkdownText,
      info: {
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: 'male'
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
                  component={RadioField}
                  label="male"
                  radioValue="male"
                />
                <Field
                  name="gender"
                  component={RadioField}
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
      notes: radioMarkdownText,
      info: {
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  );

storiesOf('Radio', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .add(
    'with immutableJS Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: 'male'
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
                  component={RadioField}
                  label="male"
                  radioValue="male"
                />
                <ImmutableJsField
                  name="gender"
                  component={RadioField}
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
      notes: radioMarkdownText,
      info: {
        propTables: [Radio],
        propTablesExclude: [Provider]
      }
    }
  );
