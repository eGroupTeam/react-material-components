import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import Select from 'react-select/base';

export interface ReactSelectProps extends Select {
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps?: TextFieldProps;
}

declare const ReactSelect: React.ComponentType<ReactSelectProps>;

export default ReactSelect;
