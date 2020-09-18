import React, { FC } from 'react';

import { fromJS } from 'immutable';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import RadioGroupField from '@e-group/material-form/RadioGroupField';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';
import { store } from '../redux/immutable/configureStore';

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    gender: 'male',
    day: 'Monday',
  });
  const handleChange = (values) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
            <Field
              name="gender"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              helperText="please choose your gender"
              required
              label="gender"
              options={[
                {
                  key: 'male',
                  value: 'male',
                  label: 'male',
                },
                {
                  key: 'female',
                  value: 'female',
                  label: 'female',
                },
              ]}
            />
            <Field
              name="day"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              required
              label="pick one day"
              options={[
                {
                  key: 'Monday',
                  value: 'Monday',
                  label: 'Monday',
                },
                {
                  key: 'Tuesday',
                  value: 'Tuesday',
                  label: 'Tuesday',
                },
                {
                  key: 'Wednesday',
                  value: 'Wednesday',
                  label: 'Wednesday',
                },
                {
                  key: 'Thursday',
                  value: 'Thursday',
                  label: 'Thursday',
                },
                {
                  key: 'Friday',
                  value: 'Friday',
                  label: 'Friday',
                },
                {
                  key: 'Saturday',
                  value: 'Saturday',
                  label: 'Saturday',
                },
                {
                  key: 'Sunday',
                  value: 'Sunday',
                  label: 'Sunday',
                },
              ]}
            />
            <Field
              name="gender2"
              component={RadioGroupField}
              margin="normal"
              fullWidth
              helperText="please choose your gender"
              required
              label="gender"
              options={[
                {
                  key: 'male',
                  value: 'male',
                  label: 'male',
                },
                {
                  key: 'female',
                  value: 'female',
                  label: 'female',
                },
              ]}
              /* Pass meta props cause the failed prop type and don't worry it's just for demo */
              meta={{
                invalid: true,
                touched: true,
                error: 'fill in this option is required!',
              }}
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
