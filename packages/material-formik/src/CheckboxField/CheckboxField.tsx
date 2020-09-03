import React, { FC } from 'react';

import Checkbox, { CheckboxProps } from '@e-group/material/Checkbox';
import { FieldProps } from 'formik';

export interface CheckboxFieldProps
  extends Omit<FieldProps, 'form'>,
    CheckboxProps {
  formikForm: FieldProps['form'];
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  field,
  formikForm: { isSubmitting },
  disabled,
  ...other
}) => {
  return (
    <Checkbox
      checked={Boolean(field.value)}
      disabled={disabled ?? isSubmitting}
      {...field}
      {...other}
    />
  );
};

export default CheckboxField;
