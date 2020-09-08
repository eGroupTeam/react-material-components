import React from 'react';

import DateFnsUtils from '@date-io/date-fns';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import PickerField from '@e-group/material-formik/PickerField';
import { Grid, Button } from '@material-ui/core';
import Highlight from '../components/Highlight';
import { Formik, Form, Field } from 'formik';

const validate = (values: any) => {
  const errors: any = {};

  if (!values.field1) {
    errors.field1 = 'Required';
  }
  if (!values.field4) {
    errors.field4 = 'Required';
  }

  return errors;
};

export const WithFormikField = () => {
  const [values, setValues] = React.useState({
    field1: null,
    field2: new Date(),
    field3: new Date(),
    field4: null,
    field5: new Date(),
    field6: new Date(),
    field7: new Date()
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <Grid item xs={6}>
          <Formik
            onSubmit={handleChange}
            initialValues={values}
            validate={validate}
          >
            <Form>
              <Field
                label="date picker"
                name="field1"
                margin="normal"
                pickerFormat="yyyy-MM-dd"
                component={PickerField}
                fullWidth
                okLabel="確認"
                cancelLabel="取消"
              />
              <Field
                label="keyboard date picker"
                name="field2"
                margin="normal"
                component={PickerField}
                picker="keyboardDate"
                pickerFormat="yyyy-MM-dd"
                fullWidth
              />
              <Field
                label="time picker"
                name="field3"
                margin="normal"
                component={PickerField}
                picker="time"
                fullWidth
              />
              <Field
                label="keyboard time picker"
                name="field4"
                margin="normal"
                component={PickerField}
                picker="keyboardTime"
                mask="__:__ _M"
                fullWidth
              />
              <Field
                label="datetime picker"
                name="field5"
                margin="normal"
                component={PickerField}
                picker="dateTime"
                fullWidth
              />
              <Field
                label="keyboard datetime picker"
                name="field6"
                ampm={false}
                variant="inline"
                margin="normal"
                component={PickerField}
                picker="keyboardDateTime"
                fullWidth
                pickerFormat="yyyy/MM/dd HH:mm"
              />
              <Field
                label="Year only"
                name="field7"
                views={['year']}
                variant="inline"
                margin="normal"
                component={PickerField}
                fullWidth
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
    </MuiPickersUtilsProvider>
  );
};
