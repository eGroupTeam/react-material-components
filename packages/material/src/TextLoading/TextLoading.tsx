import React, { forwardRef } from 'react';
import {
  StandardTextFieldProps,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  CircularProgress,
  InputAdornment,
  TextField,
} from '@material-ui/core';

export interface BaseTextLoadingProps {
  /**
   * Set TextField in loading status
   */
  loading?: boolean;
  /**
   * Customized Loading Adornment
   */
  loadingAdornment?: React.ReactNode;
}

export type StandardTextLoadingProps = BaseTextLoadingProps &
  StandardTextFieldProps;
export type FilledTextLoadingProps = BaseTextLoadingProps &
  FilledTextFieldProps;
export type OutlinedTextLoadingProps = BaseTextLoadingProps &
  OutlinedTextFieldProps;

export type TextLoadingProps =
  | StandardTextLoadingProps
  | FilledTextLoadingProps
  | OutlinedTextLoadingProps;

const TextLoading = forwardRef<any, TextLoadingProps>((
  props,
  ref
) => {
  const {
    loading,
    loadingAdornment: loadingAdornmentProp,
    InputProps,
    ...other
  } = props;

  const { endAdornment: endAdornmentProp, ...otherInputProps } =
    InputProps || {};
  // set default loading endAdornment
  const loadingAdornment = loadingAdornmentProp || (
    <InputAdornment position="end">
      <CircularProgress size={20} />
    </InputAdornment>
  );
  const endAdornment = loading ? loadingAdornment : endAdornmentProp;
  return (
    <TextField
      ref={ref}
      InputProps={{
        endAdornment,
        ...otherInputProps,
      }}
      {...other}
    />
  );
});

export default TextLoading;
