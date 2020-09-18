import React, { FC } from 'react';

import { WrappedFieldProps } from 'redux-form';
import Switch from '@e-group/material/Switch';

export interface SwitchFieldProps extends WrappedFieldProps {
  switchValue?: unknown;
}

const SwitchField: FC<SwitchFieldProps> = (props) => {
  const {
    switchValue,
    meta,
    input: { onChange, value },
    ...other
  } = props;

  const handleChange = (event) => {
    if (event.target.checked) {
      onChange(event.target.value);
    } else {
      onChange(null);
    }
  };

  return (
    <Switch
      value={switchValue}
      checked={Boolean(value)}
      onChange={handleChange}
      {...other}
    />
  );
};

export default SwitchField;
