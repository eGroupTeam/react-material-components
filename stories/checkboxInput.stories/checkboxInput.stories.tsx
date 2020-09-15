import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CheckboxInput from '@e-group/material/CheckboxInput';
import CheckboxInputField from '@e-group/material-form/CheckboxInputField';
import { Field } from 'redux-form';

import { Meta } from '@storybook/react';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/ReduxForm';
import { store } from '../redux/configureStore';

export default {
  title: 'Components/CheckboxInput',
  component: CheckboxInput,
} as Meta;

export const Default: FC = () => (
  <CheckboxInput defaultChecked toggleInput label="default" />
);

// TODO: Need fixed knobs
// export const WithControledChecked: FC = () => {
//   const checked = boolean('Checked', true);
//   return (
//     <CheckboxInput
//       MuiInputProps={{
//         value: 'awesome!'
//       }}
//       checked={checked}
//       onChange={e => {
//         boolean('Checked', !checked);
//       }}
//       toggleInput
//       label="with controled checked"
//     />
//   );
// };

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
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
