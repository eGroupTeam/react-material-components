import React from 'react';
import Highlight from '../components/Highlight';
import {Grid, Button} from '@material-ui/core';
import RadioInputGroup from '@e-group/material/RadioInputGroup';
import RadioInputGroupField from '@e-group/material-formik/RadioInputGroupField';

import { Meta } from '@storybook/react';
import { Form, Formik, Field } from 'formik';

export default {
  title: 'Components/RadioInputGroup',
  component: RadioInputGroup,
} as Meta;

export const WithFormikField: React.FC<{}> = () => {
  const [values, setValues] = React.useState({
    field1: {
      value: 'radio2',
      text: 'awesome!'
    },
    field2: {
      value: 'Monday',
      text: 'awesome!'
    }
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
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'normal radio',
                  MuiRadioProps: {
                    color: 'primary'
                  },
                  value: "radio1"
                },
                {
                  label: 'checked with text input',
                  MuiRadioProps: {
                    color: 'primary'
                  },
                  value: "radio2",
                  toggleInput: true
                },
                {
                  label: 'checked with text input',
                  value: "radio3",
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
                  value: "Monday"
                },
                {
                  label: 'Tuesday',
                  value: "Tuesday"
                },
                {
                  label: 'Wednesday',
                  value: "Wednesday"
                },
                {
                  label: 'Thursday',
                  value: "Thursday"
                },
                {
                  label: 'Friday',
                  value: "Friday"
                },
                {
                  label: 'Saturday',
                  value: "Saturday"
                },
                {
                  label: 'Sunday',
                  value: "Sunday"
                }
              ]}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
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
                  value: "radio1",
                  MuiRadioProps: {
                    color: 'primary'
                  }
                },
                {
                  label: 'checked with text input',
                  value: "radio2",
                  MuiRadioProps: {
                    color: 'primary'
                  },
                  toggleInput: true
                },
                {
                  label: 'checked with text input',
                  value: "radio3",
                  toggleInput: true
                }
              ]}
              meta={{
                invalid: true,
                touched: true,
                error: 'fill in this option is required!'
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
}
