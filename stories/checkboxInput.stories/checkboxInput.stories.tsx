import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import CheckboxInput from '@e-group/material/CheckboxInput/CheckboxInput';
import CheckboxInputField from '@e-group/material-form/CheckboxInputField';
import { Field } from 'redux-form';

import { Meta } from '@storybook/react';
import { store } from '../redux/configureStore';
import { boolean } from '@storybook/addon-knobs';

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput
} as Meta;

export const Default: React.FC<{}> = () => (
  <CheckboxInput defaultChecked toggleInput label="default" />
);

export const WithControledChecked: React.FC<{}> = () => {
  const checked = boolean('Checked', true);
  return (
    <CheckboxInput
      MuiInputProps={{
        value: 'awesome!'
      }}
      checked={checked}
      onChange={e => {
        boolean('Checked', !checked);
      }}
      toggleInput
      label="with controled checked"
    />
  );
};

export const WithReduxFormField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: {
      checked: true
    }
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
