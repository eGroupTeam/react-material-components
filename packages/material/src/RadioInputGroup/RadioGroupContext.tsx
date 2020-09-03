import * as React from 'react';

export type RadioGroupContextProps = {
  name?: string;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
};

const RadioGroupContext = React.createContext<Partial<RadioGroupContextProps>>(
  {}
);

export default RadioGroupContext;
