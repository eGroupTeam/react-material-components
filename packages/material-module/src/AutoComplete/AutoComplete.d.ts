import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import Select from 'react-select/base';

export interface AutoCompleteProps extends Select {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: object;
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps: TextFieldProps;
}

declare const AutoComplete: React.ComponentType<AutoCompleteProps>;

export default AutoComplete;
