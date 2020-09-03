import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import RadioInputGroup from '@e-group/material/RadioInputGroup';
import RadioInputGroupField from '@e-group/material-form/RadioInputGroupField';

import { store } from '../redux/configureStore';
import { Meta } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';

export default {
  title: 'Components/RadioInputGroup',
  component: RadioInputGroup
} as Meta;

export const Default: React.FC<{}> = () => {
  const isError = boolean('Error', false);
  const helperText = text('Helper Text', 'fill in this option is required!');
  return (
    <RadioInputGroup
      margin="normal"
      fullWidth
      required
      label="default"
      error={isError}
      helperText={helperText}
      options={[
        {
          value: '1',
          label: 'normal radio',
          MuiRadioProps: {
            color: 'primary'
          }
        },
        {
          value: '2',
          label: 'checked with text input',
          MuiRadioProps: {
            color: 'primary'
          },
          toggleInput: true
        },
        {
          value: '3',
          label: 'checked with text input',
          toggleInput: true
        }
      ]}
    />
  );
};

// TODO: Need fixed knobs
// export const WithControledChecked: React.FC<{}> = () => {
//   const checked = boolean('Checked', true)
//   return (
//     <RadioInputGroup
//       margin="normal"
//       fullWidth
//       required
//       label="default"
//       onChange={e => {
//         boolean('Checked', !checked)
//       }}
//       options={[
//         {
//           value: '1',
//           checked,
//           label: 'normal radio',
//           MuiRadioProps: {
//             color: 'primary'
//           }
//         },
//         {
//           value: '2',
//           label: 'checked with text input',
//           MuiRadioProps: {
//             color: 'primary'
//           },
//           toggleInput: true
//         },
//         {
//           value: '3',
//           label: 'checked with text input',
//           toggleInput: true
//         }
//       ]}
//     />
//   );
// }

export const WithReduxFormField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: {
      value: 'radio2',
      text: 'awesome!'
    },
    field2: {
      value: 'Monday',
      text: 'awesome!'
    }
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
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'normal radio',
                  MuiRadioProps: {
                    color: 'primary'
                  },
                  value: 'radio1'
                },
                {
                  label: 'checked with text input',
                  MuiRadioProps: {
                    color: 'primary'
                  },
                  value: 'radio2',
                  toggleInput: true
                },
                {
                  label: 'checked with text input',
                  value: 'radio3',
                  toggleInput: true
                }
              ]}
            />
            <Field
              name="field2"
              label="with Field"
              component={RadioInputGroupField}
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'Monday',
                  value: 'Monday'
                },
                {
                  label: 'Tuesday',
                  value: 'Tuesday'
                },
                {
                  label: 'Wednesday',
                  value: 'Wednesday'
                },
                {
                  label: 'Thursday',
                  value: 'Thursday'
                },
                {
                  label: 'Friday',
                  value: 'Friday'
                },
                {
                  label: 'Saturday',
                  value: 'Saturday'
                },
                {
                  label: 'Sunday',
                  value: 'Sunday'
                }
              ]}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              name="field3"
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'normal radio',
                  value: 'radio1',
                  MuiRadioProps: {
                    color: 'primary'
                  }
                },
                {
                  label: 'checked with text input',
                  value: 'radio2',
                  MuiRadioProps: {
                    color: 'primary'
                  },
                  toggleInput: true
                },
                {
                  label: 'checked with text input',
                  value: 'radio3',
                  toggleInput: true
                }
              ]}
              meta={{
                invalid: true,
                touched: true,
                error: 'fill in this option is required!'
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
