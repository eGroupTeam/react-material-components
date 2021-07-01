import React, { forwardRef } from 'react';

import useInputActions from '@e-group/hooks/useInputActions';

import { TextField, TextFieldProps } from '..';

export interface CopyTextFieldProps
  extends Omit<TextFieldProps, 'onClick' | 'inputRef'> {
  onCopy?: (e: unknown) => void;
  onClick?: (e: unknown) => void;
}

const CopyTextField = forwardRef<HTMLDivElement, CopyTextFieldProps>(
  (props, ref) => {
    const { onCopy, onClick, ...other } = props;

    const { inputEl, select } = useInputActions();

    const handleCopy = (e: unknown) => {
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

    return (
      <TextField ref={ref} inputRef={inputEl} onClick={handleCopy} {...other} />
    );
  }
);

export default CopyTextField;
