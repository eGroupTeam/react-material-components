import React, { FC } from 'react';

import Checkbox, { CheckboxProps } from '@e-group/material/Checkbox';
import { FieldProps } from 'formik';

export interface CheckboxFieldProps
  extends Omit<FieldProps, 'form'>,
    CheckboxProps {
  formikForm: FieldProps['form'];
}

const CheckboxField: FC<CheckboxFieldProps> = ({ field, ...other }) => {
  return <Checkbox {...field} checked={Boolean(field.value)} {...other} />;
};

export default CheckboxField;
