import React from 'react';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';
import { store as immutableStore } from '../redux/immutable/configureStore';

import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import { Field as ImmutableField } from 'redux-form/immutable';
import SwitchLabelField from '@e-group/material-form/SwitchLabelField';

storiesOf('SwitchLabelField', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: 'value1',
        });
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={values}>
                <Field
                  name="field1"
                  component={SwitchLabelField}
                  switchValue="value1"
                  label="field1"
                />
                <Field
                  name="field2"
                  component={SwitchLabelField}
                  switchValue="value2"
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
    }
  )
storiesOf('SwitchLabelField', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'with immutable Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: 'value1',
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
                  component={SwitchLabelField}
                  switchValue="value1"
                  label="field1"
                />
                <ImmutableField
                  name="field2"
                  component={SwitchLabelField}
                  switchValue="value2"
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
    }
  )
