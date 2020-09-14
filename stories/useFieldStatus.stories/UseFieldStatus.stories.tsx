import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import useFieldStatus from '@e-group/material-formik/utils/useFieldStatus';
import { Formik, Form, Field, FieldProps } from 'formik';

export default {
  title: 'Utils/useFieldStatus',
} as Meta;

const validate = (values: any) => {
  const errors: any = {};

  if (!values.field1) {
    errors.field1 = 'Required';
  }
  if (!values.field2) {
    errors.field2 = 'Required';
  }

  return errors;
};

const InputField: FC<FieldProps> = ({ field, form }) => {
  const { fieldError, showError } = useFieldStatus(field, form);

  return (
    <>
      Input: <input {...field} />
      {showError && <span style={{ color: 'red' }}>{fieldError}</span>}
    </>
  );
};

export const Default: FC = () => {
  return (
    <Formik initialValues={{}} onSubmit={() => {}} validate={validate}>
      <Form>
        <Field component={InputField} name="field1" />
        <Field component={InputField} name="field2" />
        <br />
        <button type="submit">submit</button>
        <button type="reset">reset</button>
      </Form>
    </Formik>
  );
};
