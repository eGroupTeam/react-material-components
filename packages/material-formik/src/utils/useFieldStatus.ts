import * as React from 'react';
import { getIn, FieldInputProps, FormikProps } from 'formik';

export default function useFieldStatus(
  field: FieldInputProps<any>,
  form: FormikProps<any>,
  disabledProp?: boolean
) {
  const { isSubmitting, touched, errors, submitCount, setFieldTouched } = form;
  const fieldError = getIn(errors, field.name);
  const showError = getIn(touched, field.name) && !!fieldError;
  const disabled = disabledProp ?? isSubmitting;
  // Equals to field.value !== undefined && field.value !== null
  const hasValue = !(field.value == null);

  // Need this to solve touched issue.
  // https://github.com/formium/formik/issues/445
  React.useEffect(() => {
    if (submitCount > 0) {
      setFieldTouched(field.name);
    }
  }, [field.name, setFieldTouched, submitCount]);

  return {
    fieldError,
    showError,
    disabled,
    hasValue
  };
}
