import React, { FC } from 'react';
import { Grid, Button } from '@material-ui/core';
import CheckboxInputGroupField from '@e-group/material-formik/CheckboxInputGroupField';

import { Form, Formik, Field } from 'formik';
import CheckboxInputGroup from '@e-group/material/CheckboxInputGroup';
import { Meta } from '@storybook/react';
import Highlight from '../components/Highlight';

const validate = (values: any) => {
  const errors: any = {};

  if (Object.keys(values.field3).length === 0) {
    errors.field3 = 'Required';
  } else {
    const checks = Object.keys(values.field3)
      .map((key) => {
        const el = values.field3[key];
        if (el.checked) return true;
        return false;
      })
      .filter(Boolean);
    if (checks.length === 0) {
      errors.field3 = 'Required';
    }
  }

  return errors;
};

export default {
  title: 'Components/CheckboxInputGroup',
  component: CheckboxInputGroup,
} as Meta;

export const WithFormikField: FC = () => {
  const [values, setValues] = React.useState({
    field1: {
      checkbox2: {
        checked: true,
        text: 'awesome!',
      },
    },
    field2: {
      Monday: {
        checked: true,
      },
      Tuesday: {
        checked: true,
      },
    },
    field3: {},
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
              component={CheckboxInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  name: 'checkbox1',
                  label: 'normal checkbox',
                  color: 'primary',
                },
                {
                  key: 'checkbox2',
                  name: 'checkbox2',
                  label: 'checked with text input',
                  color: 'primary',
                  toggleInput: true,
                },
                {
                  key: 'checkbox3',
                  name: 'checkbox3',
                  label: 'checked with text input',
                  toggleInput: true,
                },
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
                  label: 'Monday',
                },
                {
                  key: 'Tuesday',
                  name: 'Tuesday',
                  label: 'Tuesday',
                },
                {
                  key: 'Wednesday',
                  name: 'Wednesday',
                  label: 'Wednesday',
                },
                {
                  key: 'Thursday',
                  name: 'Thursday',
                  label: 'Thursday',
                },
                {
                  key: 'Friday',
                  name: 'Friday',
                  label: 'Friday',
                },
                {
                  key: 'Saturday',
                  name: 'Saturday',
                  label: 'Saturday',
                },
                {
                  key: 'Sunday',
                  name: 'Sunday',
                  label: 'Sunday',
                },
              ]}
            />
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
                  color: 'primary',
                },
                {
                  key: 'checkbox2',
                  name: 'checkbox2',
                  label: 'checked with text input',
                  color: 'primary',
                  toggleInput: true,
                },
                {
                  key: 'checkbox3',
                  name: 'checkbox3',
                  label: 'checked with text input',
                  toggleInput: true,
                },
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
