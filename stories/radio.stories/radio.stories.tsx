import React, { ChangeEvent, FC } from 'react';

import { Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import Radio from '@e-group/material/Radio';
import RadioField from '@e-group/material-form/RadioField';
import { Field } from 'redux-form';
import { green } from '@material-ui/core/colors';
import { store } from '../redux/configureStore';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/ReduxForm';

export default {
  title: 'Components/Radio',
  component: Radio,
} as Meta;

const useStyles = makeStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
});

export const Default: FC = () => {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <Radio
        checked={selectedValue === 'a'}
        onChange={handleChange}
        name="Radio"
        value="a"
      />
      <Radio
        checked={selectedValue === 'b'}
        onChange={handleChange}
        name="Radio"
        value="b"
      />
      <Radio
        classes={classes}
        color="default"
        checked={selectedValue === 'c'}
        onChange={handleChange}
        name="Radio"
        value="c"
      />
      <Radio
        checked={selectedValue === 'd'}
        onChange={handleChange}
        name="Radio"
        value="d"
        color="default"
      />
      <Radio
        checked={selectedValue === 'e'}
        onChange={handleChange}
        name="Radio"
        value="e"
        color="default"
        size="small"
      />
    </div>
  );
};

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    gender: 'male',
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
    </Provider>
  );
};
