import React from 'react';

import { Meta } from '@storybook/react';

import { Formik, Form, Field } from 'formik';
import Highlight from '../components/Highlight';
import { Grid, MenuItem, Button, InputAdornment } from '@material-ui/core';
import TextLoading from '@e-group/material/TextLoading';
import TextLoadingField from '@e-group/material-formik/TextLoadingField';

export default {
  title: 'Components/TextLoading',
  component: TextLoading
} as Meta;

export const WithFormikField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: 'admin@gmail.com',
    field3: '',
    field4: '',
    field5: []
  });
  const handleSubmit = (values: any) => {
    setValues(values);
  };

  return (
    <Grid container>
      <Grid item xs={6}>
        <Formik onSubmit={handleSubmit} initialValues={values}>
          <Form>
            <Field
              label="default"
              name="field1"
              margin="normal"
              component={TextLoadingField}
              fullWidth
            />
            {/* Pass form props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="error"
              name="field3"
              margin="normal"
              component={TextLoadingField}
              fullWidth
              form={{
                touched: true,
                errors: {
                  field3: 'error message'
                }
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
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
            <Button type="submit">Submit</Button>
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
