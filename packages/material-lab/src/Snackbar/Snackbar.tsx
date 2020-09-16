import React, { FC, MouseEventHandler, ReactNode } from 'react';

import {
  Snackbar as MuiSnackbar,
  SnackbarProps as MuiSnackbarProps,
} from '@material-ui/core';

import SnackbarContent, {
  SnackbarContentProps,
  SnackbarContentVariant,
} from './SnackbarContent';

export interface SnackbarProps extends MuiSnackbarProps {
  handleClose?: () => void;
  isOpen?: boolean;
  message?: ReactNode | string;
  variant?: SnackbarContentVariant;
  SnackbarContentProps?: SnackbarContentProps;
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
}

const Snackbar: FC<SnackbarProps> = ({
  handleClose,
  onClose,
  onCloseClick,
  isOpen = false,
  message,
  variant,
  SnackbarContentProps,
  ...other
}) => {
  const handleSnackbarClose: MuiSnackbarProps['onClose'] = (e, reason) => {
    if (handleClose) {
      handleClose();
    }
    if (onClose) {
      onClose(e, reason);
    }
  };

  const handleCloseClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (handleClose) {
      handleClose();
    }
    if (onCloseClick) {
      onCloseClick(e);
    }
  };

  return (
    <MuiSnackbar open={isOpen} onClose={handleSnackbarClose} {...other}>
      <SnackbarContent
        onCloseClick={handleCloseClick}
        message={message}
        variant={variant}
        {...SnackbarContentProps}
      />
    </MuiSnackbar>
  );
};

export default Snackbar;
