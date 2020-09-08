import React, { FC } from 'react';

import Checkbox, { CheckboxProps } from '@e-group/material/Checkbox';
import { FieldProps } from 'formik';
import useFieldStatus from '../utils/useFieldStatus';

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
  form,
  disabled: disabledProp,
  ...other
}) => {
  const { disabled } = useFieldStatus(field, form, disabledProp);

  return (
    <Checkbox
      form={buttonForm}
      checked={Boolean(field.value)}
      disabled={disabled}
      {...field}
      {...other}
    />
  );
};

export default CheckboxField;
