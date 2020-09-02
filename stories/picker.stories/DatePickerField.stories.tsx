import React from 'react';
import { Meta } from '@storybook/react';

import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DatePickerField from '@e-group/material-formik/DatePickerField';
import { Grid, Button } from '@material-ui/core';
import Highlight from '../components/Highlight';
import { Formik, Form, Field} from 'formik'

export default {
  title: 'Formik/DatePicker',
  component: DatePickerField,
} as Meta;

export const Default = () => {
  const [values, setValues] = React.useState({
    field1: new Date(),
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <Grid item xs={6}>
          <Formik onSubmit={handleChange} initialValues={values}>
            <Form>
              <Field
                label="date picker"
                name="field1"
                margin="normal"
                pickerFormat="yyyy-MM-dd"
                component={DatePickerField}
                fullWidth
              />
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
    </MuiPickersUtilsProvider>
  )
}