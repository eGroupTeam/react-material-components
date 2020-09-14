import React, { FC } from 'react';

import { TextField, TextFieldProps } from '@material-ui/core';
import { WrappedFieldInputProps, WrappedFieldProps } from 'redux-form';
import { Dist } from './types';

export interface PostalCodeFieldProps {
  MuiTextFieldProps?: TextFieldProps;
  postalCodeProps?: TextFieldProps;
  dists: Dist[];
  otherAreaInput: Omit<WrappedFieldInputProps, 'onChange'>;
  postalCodeInputOnChange: (value: string) => void;
  otherPostalCodeInput: Omit<WrappedFieldInputProps, 'onChange'>;
  postalCodeFormProps: WrappedFieldProps;
}

const PostalCodeField: FC<PostalCodeFieldProps> = ({
  MuiTextFieldProps,
  postalCodeProps,
  dists,
  otherAreaInput,
  postalCodeInputOnChange,
  otherPostalCodeInput,
  postalCodeFormProps,
}) => {
  const {
    helperText: postalCodeHelperText,
    onChange: postalCodeOnChange,
    ...otherPostalCodeProps
  } = {
    ...(MuiTextFieldProps || {}),
    ...(postalCodeProps || {}),
  };
  const postalCodeMeta = postalCodeFormProps.meta;
  const isPostalCodeError = postalCodeMeta.touched && postalCodeMeta.invalid;

  const handlePostalCodeChange = (e: any) => {
    if (postalCodeOnChange) {
      postalCodeOnChange(e);
    }
    postalCodeInputOnChange(e.target.value);
  };

  React.useEffect(() => {
    const findPostalCode = dists.find((el) => el.name === otherAreaInput.value);
    let postalCode = '';
    if (findPostalCode) {
      postalCode = findPostalCode.postalCode;
    }
    postalCodeInputOnChange(postalCode);
  }, [
    dists,
    otherAreaInput.value,
    otherPostalCodeInput,
    postalCodeInputOnChange,
  ]);

  return (
    <TextField
      error={isPostalCodeError}
      helperText={
        isPostalCodeError ? postalCodeMeta.error : postalCodeHelperText
      }
      onChange={handlePostalCodeChange}
      {...otherPostalCodeProps}
      {...otherPostalCodeInput}
    />
  );
};

export default PostalCodeField;
