import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';

export interface TextLoadingProps extends TextFieldProps {
  /**
   * Set TextField in loading status
   */
  loading: boolean;
  /**
   * Customized Loading Adornment
   */
  loadingAdornment: React.ReactNode
}

declare const TextLoading: React.ComponentType<TextLoadingProps>;

export default TextLoading;