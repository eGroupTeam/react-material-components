import React from 'react';

import { fromJS } from 'immutable';
import { Meta } from '@storybook/react';
import { store } from '../redux/immutable/configureStore';

import TextLoading from '@e-group/material/TextLoading';
import { Provider } from 'react-redux';
import ReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextLoadingField from '@e-group/material-form/immutable/TextLoadingField';

export default {
  title: 'Components/TextLoading',
  component: TextLoading,
} as Meta;

export const WithReduxFormImmutableField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: 'admin@gmail.com'
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
              label="default"
              name="field1"
              margin="normal"
              component={TextLoadingField}
              fullWidth
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="loading"
              name="field2"
              margin="normal"
              component={TextLoadingField}
              fullWidth
              meta={{ asyncValidating: true }}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="error"
              name="field3"
              margin="normal"
              required
              component={TextLoadingField}
              fullWidth
              meta={{
                invalid: true,
                touched: true,
                error: 'error message'
              }}
            />
            <Field
              label="select"
              name="field4"
              fullWidth
              loading
              component={TextLoadingField}
              select={true}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                )
              }}
              required
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
            <Field
              label="multiple select"
              name="field5"
              SelectProps={{
                multiple: true
              }}
              fullWidth
              loading
              component={TextLoadingField}
              select={true}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                )
              }}
              required
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
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