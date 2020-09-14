import React, { FC } from 'react';

import { fromJS } from 'immutable';

import { Provider } from 'react-redux';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/immutable';
import RadioField from '@e-group/material-form/RadioField';
import { store } from '../redux/immutable/configureStore';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    gender: 'male',
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
