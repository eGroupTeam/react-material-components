import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import Select from 'react-select/base';

export interface AutoCompleteProps extends Select {
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps?: TextFieldProps;
}

declare const AutoComplete: React.ComponentType<AutoCompleteProps>;

export default AutoComplete;
