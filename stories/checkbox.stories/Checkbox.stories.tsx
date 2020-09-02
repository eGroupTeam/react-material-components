import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import Checkbox from '@e-group/material/Checkbox';
import CheckboxField from '@e-group/material-form/CheckboxField';

import { Meta } from '@storybook/react';
import { store } from '../redux/configureStore';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta;

export const Default: React.FC<{}> = () => <Checkbox label="default" />

export const WithReduxFormField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: true
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={values}>
            <Field
              name="field1"
              component={CheckboxField}
              label="checkbox with Field"
            />
            <Field
              name="field2"
              component={CheckboxField}
              label="checkbox with Field"
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
}