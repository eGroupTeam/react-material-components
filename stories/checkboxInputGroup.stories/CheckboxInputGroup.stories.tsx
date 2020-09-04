import React, { useState } from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import CheckboxInputGroup, {
  Value
} from '@e-group/material/CheckboxInputGroup';
import CheckboxInputGroupField from '@e-group/material-form/CheckboxInputGroupField';

import { store } from '../redux/configureStore';
import { Meta } from '@storybook/react';
export * from './CheckboxInputGroupFormik.stories';
export * from './CheckboxInputGroupImmutable.stories';

export default {
  title: 'Components/CheckboxInputGroup',
  component: CheckboxInputGroup
} as Meta;

export const Default: React.FC<{}> = () => {
  const [value, setValue] = useState<Value>();
  const handleChange = (value: Value) => {
    setValue(value);
  };
  return (
    <>
      value: {JSON.stringify(value)}
      <CheckboxInputGroup
        value={value}
        label="default"
        onChange={handleChange}
        options={[
          {
            name: 'checkbox1',
            label: 'normal checkbox',
            color: 'primary'
          },
          {
            name: 'checkbox2',
            label: 'checked with text input',
            color: 'primary',
            toggleInput: true
          },
          {
            name: 'checkbox3',
            label: 'checked with text input',
            toggleInput: true
          }
        ]}
        margin="normal"
        fullWidth
        required
      />
    </>
  );
};

export const WithReduxFormField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: {
      checkbox2: {
        checked: true,
        text: 'awesome!'
      }
    },
    field2: {
      Monday: {
        checked: true
      },
      Tuesday: {
        checked: true
      }
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
              component={CheckboxInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  key: 'checkbox1',
                  name: 'checkbox1',
                  label: 'normal checkbox',
                  color: 'primary'
                },
                {
                  key: 'checkbox2',
                  name: 'checkbox2',
                  label: 'checked with text input',
                  color: 'primary',
                  toggleInput: true
                },
                {
                  key: 'checkbox3',
                  name: 'checkbox3',
                  label: 'checked with text input',
                  toggleInput: true
                }
              ]}
            />
            <Field
              name="field2"
              label="with Field"
              component={CheckboxInputGroupField}
              fullWidth
              margin="normal"
              options={[
                {
                  key: 'Monday',
                  name: 'Monday',
                  label: 'Monday'
                },
                {
                  key: 'Tuesday',
                  name: 'Tuesday',
                  label: 'Tuesday'
                },
                {
                  key: 'Wednesday',
                  name: 'Wednesday',
                  label: 'Wednesday'
                },
                {
                  key: 'Thursday',
                  name: 'Thursday',
                  label: 'Thursday'
                },
                {
                  key: 'Friday',
                  name: 'Friday',
                  label: 'Friday'
                },
                {
                  key: 'Saturday',
                  name: 'Saturday',
                  label: 'Saturday'
                },
                {
                  key: 'Sunday',
                  name: 'Sunday',
                  label: 'Sunday'
                }
              ]}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              name="field3"
              label="with Field"
              component={CheckboxInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  key: 'checkbox1',
                  name: 'checkbox1',
                  label: 'normal checkbox',
                  color: 'primary'
                },
                {
                  key: 'checkbox2',
                  name: 'checkbox2',
                  label: 'checked with text input',
                  color: 'primary',
                  toggleInput: true
                },
                {
                  key: 'checkbox3',
                  name: 'checkbox3',
                  label: 'checked with text input',
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
