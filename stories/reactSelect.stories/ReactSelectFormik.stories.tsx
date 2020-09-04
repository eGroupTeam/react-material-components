import React from 'react';

import ReactSelectField from '@e-group/material-formik/ReactSelectField';
import { Grid, Button } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import Highlight from '../components/Highlight';

const validate = (values: any) => {
  const errors: any = {};

  if (!values.field2) {
    errors.field2 = 'Required';
  }

  return errors;
};

export const WithFormikField: React.FC<{}> = () => {
  const initialValues = {
    field1: {
      label: 'I am label',
      value: 'value'
    },
    field3: {
      label: 'I am label',
      value: 'value'
    },
    field4: [
      {
        label: 'label4',
        value: 'value2'
      },
      {
        label: 'label5',
        value: 'value3'
      }
    ],
    field5: [
      {
        label: 'label4',
        value: 'value2'
      },
      {
        label: 'label5',
        value: 'value3'
      }
    ]
  };
  const [values, setValues] = React.useState(initialValues);
  const options = [
    {
      label: 'label',
      value: 'value2'
    },
    {
      label: 'label2',
      value: 'value3'
    },
    {
      label: 'label3',
      value: 'value4'
    },
    {
      label: 'label4',
      value: 'value5'
    },
    {
      label: 'label5',
      value: 'value6'
    }
  ];
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Formik
          onSubmit={handleChange}
          initialValues={initialValues}
          validate={validate}
        >
          <Form>
            <Field
              name="field1"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false
                },
                margin: 'normal',
                helperText: 'customized helperText'
              }}
            />
            <Field
              name="field2"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Error Message',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false
                },
                margin: 'normal'
              }}
            />
            <Field
              variant="creatable"
              name="field3"
              component={ReactSelectField}
              options={options}
              isClearable
              MuiTextFieldProps={{
                label: 'Creatable Single Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false
                },
                margin: 'normal'
              }}
            />
            <Field
              name="field4"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              MuiTextFieldProps={{
                label: 'Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false
                }
              }}
            />
            <Field
              variant="creatable"
              name="field5"
              component={ReactSelectField}
              options={options}
              isClearable
              isMulti
              MuiTextFieldProps={{
                label: 'Creatable Multi Select',
                fullWidth: true,
                InputProps: {
                  disableUnderline: false
                }
              }}
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
  );
};
