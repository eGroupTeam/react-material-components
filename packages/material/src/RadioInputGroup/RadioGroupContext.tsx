import * as React from 'react';
import { FormControlLabelProps } from '@material-ui/core';

export type RadioGroupContextProps = {
  name?: string;
  value?: string;
  onChange?: FormControlLabelProps['onChange'];
};

const RadioGroupContext = React.createContext<Partial<RadioGroupContextProps>>(
  {}
);

export default RadioGroupContext;
