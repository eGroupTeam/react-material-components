import React, { useState } from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CheckboxInput, {
  CheckboxInputProps,
} from '@e-group/material/CheckboxInput';
import CheckboxInputField from '@e-group/material-form/CheckboxInputField';
import { Field } from 'redux-form';

import { Meta, Story } from '@storybook/react';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/ReduxForm';
import { store } from '../redux/configureStore';

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
  argTypes: {
    checked: { control: 'boolean' },
    toggleInput: { control: 'boolean' },
    label: { control: 'text', defaultValue: 'default' },
    onChange: { action: 'checked change' },
  },
} as Meta;

export const Default: Story<CheckboxInputProps> = () => (
  <CheckboxInput label="default" defaultChecked toggleInput />
);

export const WithControled: Story<CheckboxInputProps> = ({
  checked = false,
  ...other
}) => <CheckboxInput checked={checked} {...other} />;

export const WithReduxFormField: Story<CheckboxInputProps> = () => {
  const [values, setValues] = useState({
    field1: {
      checked: true,
    },
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
