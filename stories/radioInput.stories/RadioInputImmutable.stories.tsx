import React, { FC } from 'react';

import { fromJS } from '@e-group/immutable';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import RadioInputField from '@e-group/material-form/immutable/RadioInputField';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';
import { store } from '../redux/immutable/configureStore';

export const WithReduxFormImmutableField: FC = (args) => {
  const [values, setValues] = React.useState({
    gender: {
      value: 'female',
    },
  });
  const handleChange = (values) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm
            onChange={handleChange}
            initialValues={fromJS(values) as any}
          >
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
