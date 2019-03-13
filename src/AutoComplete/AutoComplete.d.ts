import * as React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Props } from 'react-select/lib/Select'

export interface AutoCompleteProps extends Props {
  TextFieldProps: TextFieldProps
}

declare const AutoComplete: React.ComponentType<AutoCompleteProps>;

export default AutoComplete;