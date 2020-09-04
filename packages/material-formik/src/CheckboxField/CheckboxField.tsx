import React, { FC } from 'react';

import Checkbox, { CheckboxProps } from '@e-group/material/Checkbox';
import { FieldProps } from 'formik';

export interface CheckboxFieldProps
  extends Omit<CheckboxProps, 'form'>,
    FieldProps {
  /**
   * ButtonHTMLAttributes form to avoid conflict with FieldProps form.
   */
  buttonForm?: string;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  field,
  buttonForm,
  form: { isSubmitting },
  disabled,
  ...other
}) => {
  return (
    <Checkbox
      form={buttonForm}
      checked={Boolean(field.value)}
      disabled={disabled ?? isSubmitting}
      {...field}
      {...other}
    />
  );
};

export default CheckboxField;
