import React from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import CheckboxInputField from '@e-group/material-form/immutable/CheckboxInputField';

import { fromJS } from 'immutable';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';
import { store } from '../redux/immutable/configureStore';

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    field1: {
      checked: true,
    },
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
