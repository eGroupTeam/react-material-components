import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import Checkbox from '@e-group/material/Checkbox';
import CheckboxField from '@e-group/material-form/CheckboxField';

import { fromJS } from '@e-group/immutable';
import { Meta } from '@storybook/react';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';
import { store } from '../redux/immutable/configureStore';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
} as Meta;

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    field1: true,
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
              component={CheckboxField}
              label="checkbox with Field"
            />
            <Field
              name="field2"
              component={CheckboxField}
              label="checkbox with Field"
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
