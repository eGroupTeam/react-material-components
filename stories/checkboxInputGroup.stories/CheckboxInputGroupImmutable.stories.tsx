import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import { Grid } from '@material-ui/core';
import { Field } from 'redux-form/immutable';
import CheckboxInputGroupField from '@e-group/material-form/immutable/CheckboxInputGroupField';

import { fromJS } from 'immutable';
import { store } from '../redux/immutable/configureStore';

export const WithReduxFormImmutableField: React.FC<{}> = () => {
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
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
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
                  MuiCheckboxProps: {
                    color: 'primary'
                  }
                },
                {
                  key: 'checkbox2',
                  name: 'checkbox2',
                  label: 'checked with text input',
                  MuiCheckboxProps: {
                    color: 'primary'
                  },
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
                  MuiCheckboxProps: {
                    color: 'primary'
                  }
                },
                {
                  key: 'checkbox2',
                  name: 'checkbox2',
                  label: 'checked with text input',
                  MuiCheckboxProps: {
                    color: 'primary'
                  },
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
