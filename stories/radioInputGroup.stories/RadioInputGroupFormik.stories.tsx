import React from 'react';
import Highlight from '../components/Highlight';
import { Grid, Button } from '@material-ui/core';
import RadioInputGroupField from '@e-group/material-formik/RadioInputGroupField';

import { Form, Formik, Field } from 'formik';

const validate = (values: any) => {
  const errors: any = {};

  if (Object.keys(values.field3).length === 0) {
    errors.field3 = 'Required';
  }

  return errors;
};

export const WithFormikField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: {
      value: 'radio2',
      text: 'awesome!'
    },
    field2: {
      value: 'Monday',
      text: 'awesome!'
    },
    field3: {}
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Formik
          onSubmit={handleChange}
          initialValues={values}
          validate={validate}
        >
          <Form>
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
                  color: 'primary',
                  value: 'radio1'
                },
                {
                  label: 'checked with text input',
                  color: 'primary',
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
                  color: 'primary'
                },
                {
                  label: 'checked with text input',
                  value: 'radio2',
                  color: 'primary',
                  toggleInput: true
                },
                {
                  label: 'checked with text input',
                  value: 'radio3',
                  toggleInput: true
                }
              ]}
            />
            <Button type="submit">Submit</Button>
            <Button type="reset">Reset</Button>
          </Form>
        </Formik>
      </Grid>
      <Grid item xs={6}>
        <Highlight
          code={JSON.stringify(values, null, 4)}
          type="language-json"
        />
      </Grid>
    </Grid>
  );
};
