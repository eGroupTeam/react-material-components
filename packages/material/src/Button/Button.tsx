import React, { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
  CircularProgressProps,
  createStyles,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import green from '@material-ui/core/colors/green';

export const styles = () =>
  createStyles({
    root: {
      display: 'inline-flex',
      position: 'relative',
    },
    fullWidth: {
      width: '100%',
    },
    success: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
    progress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });

export interface ButtonProps
  extends Omit<MuiButtonProps, 'classes'>,
    WithStyles<typeof styles> {
  /**
   * The button's loading status
   */
  loading?: boolean;
  /**
   * The button's success status
   */
  success?: boolean;
  /**
   * Circular Progress Props
   */
  MuiCircularProgressProps?: CircularProgressProps;
  /**
   * Mui `Button` className
   */
  muiButtonClassName?: string;
  /**
   * Mui `Button` className
   */
  muiButtonStyle?: CSSProperties;
  /**
   * Mui `Button` classes
   */
  muiButtonClasses?: MuiButtonProps['classes'];
}

const Button: FC<ButtonProps> = (props) => {
  const {
    classes,
    className,
    style,
    muiButtonClassName,
    muiButtonStyle,
    muiButtonClasses,
    fullWidth,
    loading = false,
    success = false,
    MuiCircularProgressProps,
    disabled: disabledProp,
    ...other
  } = props;

  const disabled = disabledProp ?? loading;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.fullWidth]: fullWidth,
        },
        className
      )}
      style={style}
    >
      <MuiButton
        classes={muiButtonClasses}
        className={clsx(
          {
            [classes.success]: success,
          },
          muiButtonClassName
        )}
        style={muiButtonStyle}
        disabled={disabled}
        fullWidth={fullWidth}
        {...other}
      />
      {loading && (
        <CircularProgress
          size={24}
          className={clsx(
            classes.progress,
            MuiCircularProgressProps?.className
          )}
          {...MuiCircularProgressProps}
        />
      )}
    </div>
  );
};

export default withStyles(styles, {
  name: 'EgButton',
})(Button);
