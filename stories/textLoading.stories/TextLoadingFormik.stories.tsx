import React, { FC } from 'react';

import { Formik, Form, Field } from 'formik';
import { Grid, MenuItem, Button, InputAdornment } from '@material-ui/core';
import TextLoadingField from '@e-group/material-formik/TextLoadingField';
import TextLoading from '@e-group/material/TextLoading';
import { Meta } from '@storybook/react';
import Highlight from '../components/Highlight';

export default {
  title: 'Components/TextLoading',
  component: TextLoading,
} as Meta;

const validate = (values: any) => {
  const errors: any = {};

  if (!values.field2) {
    errors.field2 = 'Required';
  }
  if (!values.field3) {
    errors.field3 = 'Required';
  }

  return errors;
};

export const WithFormikField: FC = () => {
  const [values, setValues] = React.useState({
    field1: 'admin@gmail.com',
    field4: [],
  });
  const handleSubmit = (values: any) => {
    setValues(values);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Formik
          onSubmit={handleSubmit}
          initialValues={values}
          validate={validate}
        >
          <Form>
            <Field
              label="default"
              name="field1"
              margin="normal"
              component={TextLoadingField}
              fullWidth
            />
            <Field
              label="error"
              name="field2"
              margin="normal"
              component={TextLoadingField}
              fullWidth
            />
            <Field
              label="select"
              name="field3"
              fullWidth
              loading
              component={TextLoadingField}
              select
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
            <Field
              label="multiple select"
              name="field4"
              SelectProps={{
                multiple: true,
              }}
              fullWidth
              loading
              component={TextLoadingField}
              select
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
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
