import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { defaultProps } from 'react-select/lib/Select'

export interface AutoCompleteProps extends defaultProps {
  TextFieldProps: TextFieldProps
}

declare const AutoComplete: React.ComponentType<AutoCompleteProps>;

export default AutoComplete;