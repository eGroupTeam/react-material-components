import React, { FC } from 'react';
import { Grid, Button } from '@material-ui/core';
import CheckboxField from '@e-group/material-formik/CheckboxField';

import { Form, Formik, Field } from 'formik';
import Highlight from '../components/Highlight';

export const WithFormikField: FC = () => {
  const [values, setValues] = React.useState({
    field1: true,
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Formik onSubmit={handleChange} initialValues={values}>
          <Form>
            <Field
              name="field1"
              component={CheckboxField}
              label="checkbox with Field"
            />
            <Field
              name="field2"
              component={CheckboxField}
              label="checkbox with Field2"
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
