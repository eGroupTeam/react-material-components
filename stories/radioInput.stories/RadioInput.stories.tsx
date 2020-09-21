import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import RadioInput, { RadioInputProps } from '@e-group/material/RadioInput';
import RadioInputField from '@e-group/material-form/RadioInputField';
import { Field } from 'redux-form';
import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Highlight from '../components/Highlight';
import { store } from '../redux/configureStore';
import ReduxForm from '../components/ReduxForm';

export default {
  title: 'Components/RadioInput',
  component: RadioInput,
  argTypes: {
    checked: { control: 'boolean' },
    toggleInput: { control: 'boolean' },
    label: { control: 'text', defaultValue: 'Label' },
    color: { control: [] },
  },
} as Meta;

export const Default: FC = (args) => (
  <RadioInput name="RadioInput" value="a" {...args} />
);

const styles = createStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
});

const GreenRadioInputComponent: FC<
  RadioInputProps & WithStyles<typeof styles>
> = ({ classes, ...other }) => (
  <RadioInput classes={classes} color="default" {...other} />
);

const GreenRadioInput = withStyles(styles)(GreenRadioInputComponent);

export const WithCustomized: FC = (args) => (
  <GreenRadioInput name="RadioInput" value="a" {...args} />
);

export const WithReduxFormField: FC = (args) => {
  const [values, setValues] = React.useState({
    gender: {
      value: 'female',
    },
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
    </Provider>
  );
};

export * from './RadioInputImmutable.stories';
