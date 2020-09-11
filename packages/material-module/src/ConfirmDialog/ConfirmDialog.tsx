import React, { FC, MouseEvent, ReactNode } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  ButtonProps,
  DialogActionsProps,
  DialogContentProps,
  DialogTitleProps,
  DialogContentTextProps
} from '@material-ui/core';

export interface ConfirmDialogProps {
  handleClose?: () => void;
  isOpen?: boolean;
  title?: ReactNode | string;
  message?: ReactNode | string;
  children?: ReactNode;
  onCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
  onConfirm?: (event: MouseEvent<HTMLButtonElement>) => void;
  disableCloseOnConfirm?: boolean;
  MuiDialogTitleProps?: DialogTitleProps;
  MuiDialogContentProps?: DialogContentProps;
  MuiDialogContentTextProps?: DialogContentTextProps;
  MuiDialogActionsProps?: DialogActionsProps;
  MuiCancelButtonProps?: ButtonProps;
  MuiConfirmButtonProps?: ButtonProps;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen = false,
  title,
  message,
  children,
  handleClose,
  onCancel,
  onConfirm,
  disableCloseOnConfirm,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiCancelButtonProps = {},
  MuiConfirmButtonProps = {},
  ...other
}) => {
  const handleCancelClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (handleClose) {
      handleClose();
    }
    if (onCancel) {
      onCancel(e);
    }
  };

  const handleConfirmClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (!disableCloseOnConfirm && handleClose) {
      handleClose();
    }
    if (onConfirm) {
      onConfirm(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} {...other}>
      <DialogTitle {...MuiDialogTitleProps}>{title}</DialogTitle>
      <DialogContent {...MuiDialogContentProps}>
        {message && (
          <DialogContentText {...MuiDialogContentTextProps}>
            {message}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions {...MuiDialogActionsProps}>
        <Button
          onClick={handleCancelClick}
          color="primary"
          {...MuiCancelButtonProps}
        >
          取消
        </Button>
        <Button
          onClick={handleConfirmClick}
          color="primary"
          {...MuiConfirmButtonProps}
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
