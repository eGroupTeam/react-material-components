import * as React from 'react';
import { BaseTextFieldProps } from '@material-ui/core/TextField';

export interface TextLoadingProps extends BaseTextFieldProps {
  /**
   * Set TextField in loading status
   */
  loading?: boolean;
  /**
   * Customized Loading Adornment
   */
  loadingAdornment?: React.ReactNode;
}

declare const TextLoading: React.ComponentType<TextLoadingProps>;

export default TextLoading;
