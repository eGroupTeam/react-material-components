import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Props } from 'react-select/base';

export interface ReactSelectProps extends Props {
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps?: TextFieldProps;
}

declare const ReactSelect: React.ComponentType<ReactSelectProps>;

export default ReactSelect;
