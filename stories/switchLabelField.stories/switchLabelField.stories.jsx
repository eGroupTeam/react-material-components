import React from 'react';
import { Provider } from 'react-redux';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field as ImmutableField } from 'redux-form/immutable';
import SwitchLabelField from '@e-group/material-form/SwitchLabelField';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store as immutableStore } from '../redux/immutable/configureStore';

storiesOf('SwitchLabelField', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'default',
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
