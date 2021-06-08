import React, { FC } from 'react';

import useInputActions from '@e-group/hooks/useInputActions';

import { TextField, TextFieldProps } from '@material-ui/core';

export interface CopyTextFieldProps
  extends Omit<TextFieldProps, 'onClick' | 'inputRef'> {
  onCopy?: (e: any) => void;
  onClick?: (e: any) => void;
}

const CopyTextField: FC<CopyTextFieldProps> = ({
  onCopy,
  onClick,
  ...other
}) => {
  const { inputEl, select } = useInputActions();

  const handleCopy = (e: any) => {
    /* Select the text field */
    select();

    /* Copy the text inside the text field */
    document.execCommand('copy');

    if (onClick) {
      onClick(e);
    }

    if (onCopy) {
      onCopy(e);
    }
  };

  return <TextField inputRef={inputEl} onClick={handleCopy} {...other} />;
};

export default CopyTextField;
