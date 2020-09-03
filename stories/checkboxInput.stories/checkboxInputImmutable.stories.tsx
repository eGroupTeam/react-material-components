import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import CheckboxInput from '@e-group/material/CheckboxInput/CheckboxInput';
import { Field } from 'redux-form/immutable';
import CheckboxInputField from '@e-group/material-form/immutable/CheckboxInputField';

import { fromJS } from 'immutable';
import { Meta } from '@storybook/react';
import { store } from '../redux/immutable/configureStore';

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput
} as Meta;

export const WithReduxFormImmutableField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: {
      checked: true
    }
  });
  const handleChange = (values: any) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
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
    </Provider>
  );
};
