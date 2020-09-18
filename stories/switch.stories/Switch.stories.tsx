import React, { FC } from 'react';

import { Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { Grid, FormGroup } from '@material-ui/core';
import { Field } from 'redux-form';
import Switch from '@e-group/material/Switch';
import SwitchField from '@e-group/material-form/SwitchField';
import { store } from '../redux/configureStore';

import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';

export default {
  title: 'Components/Switch',
  component: Switch,
} as Meta;

export const Default: FC = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <Switch
        checked={state.checkedB}
        onChange={handleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Switch inputProps={{ 'aria-label': 'primary checkbox' }} />
      <Switch disabled inputProps={{ 'aria-label': 'disabled checkbox' }} />
      <Switch
        disabled
        checked
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Switch
        defaultChecked
        color="default"
        inputProps={{ 'aria-label': 'checkbox with default color' }}
      />
    </div>
  );
};

export const WithLabel: FC = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        label="Secondary"
      />
      <Switch
        checked={state.checkedB}
        onChange={handleChange}
        name="checkedB"
        color="primary"
        label="Primary"
      />
      <Switch label="Uncontrolled" />
      <Switch disabled label="Disabled" />
      <Switch disabled checked label="Disabled" />
    </FormGroup>
  );
};

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    field1: 'value1',
  });
  const handleChange = (values) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={values}>
            <Field
              name="field1"
              component={SwitchField}
              switchValue="value1"
              label="field1"
            />
            <Field name="field2" component={SwitchField} switchValue="value2" />
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

export * from './SwitchImmutable.stories';
