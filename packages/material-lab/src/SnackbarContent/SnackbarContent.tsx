import React, { FC, MouseEventHandler, ReactNode } from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

import {
  SnackbarContent as MuiSnackbarContent,
  SnackbarContentProps as MuiSnackbarContentProps,
  IconButton,
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const variantIcon = {
  default: undefined,
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export type SnackbarContentVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface SnackbarContentProps
  extends Omit<MuiSnackbarContentProps, 'variant'> {
  className?: string | undefined;
  message?: ReactNode | string;
  onCloseClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: SnackbarContentVariant;
}

const SnackbarContent: FC<SnackbarContentProps> = (props) => {
  const {
    className,
    message: messageProp,
    onCloseClick,
    variant = 'default',
    ...other
  } = props;
  const classes = useStyles(props);

  const Icon = variantIcon[variant];
  const message =
    typeof messageProp === 'string' ? (
      <span className={classes.messageContainer}>
        {Icon && <Icon className={clsx(classes.icon, classes.iconVariant)} />}
        {messageProp}
      </span>
    ) : (
      messageProp
    );
  const action: ReactNode[] = [
    <IconButton key="close" color="inherit" onClick={onCloseClick}>
      <CloseIcon className={classes.icon} />
    </IconButton>,
  ];

  return (
    <MuiSnackbarContent
      className={clsx(classes[variant], className)}
      message={message}
      action={action}
      {...other}
    />
  );
};

export default SnackbarContent;
