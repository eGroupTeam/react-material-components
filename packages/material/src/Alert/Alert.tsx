import React, { FC } from 'react';
import { AlertProps as MuiAlertProps } from '@material-ui/lab';
import AlertBase from '../AlertBase';
import AlertDialog from '../AlertDialog';

export interface AlertProps extends Omit<MuiAlertProps, 'shape'> {
  shape?: 'dialog';
}

const Alert: FC<AlertProps> = ({ shape, ...other }) => {
  if (shape === 'dialog') {
    return <AlertDialog {...other} />;
  }
  return <AlertBase {...other} />;
};

export default Alert;
