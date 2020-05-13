import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';

import MuiSnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const SnackbarContent = props => {
  const { className, message, onClose, variant, ...other } = props;
  const classes = useStyles(props);

  if (variant === 'default') {
    return (
      <MuiSnackbarContent
        className={className}
        message={<span className={classes.message}>{message}</span>}
        action={[
          <IconButton key="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
        {...other}
      />
    );
  }

  const Icon = variantIcon[variant];

  return (
    <MuiSnackbarContent
      className={clsx(classes[variant], className)}
      message={
        <span className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
};

SnackbarContent.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'error', 'info'])
    .isRequired
};

SnackbarContent.defaultProps = {
  variant: 'default'
};

export default SnackbarContent;
