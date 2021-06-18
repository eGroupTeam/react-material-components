import React, { forwardRef } from 'react';
import {
  createStyles,
  withStyles,
  Theme,
  TextareaAutosize as MuiTextareaAutosize,
  TextareaAutosizeProps as MuiTextareaAutosizeProps,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';

export interface TextareaProps extends MuiTextareaAutosizeProps {
  error?: boolean;
  success?: boolean;
  warning?: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      padding: theme.spacing(1),
      borderWidth: 2,
      borderRadius: theme.shape.borderRadius,
      fontSize: '15px',
      borderColor: theme.egPalette.text[4],
      color: theme.egPalette.text[2],
      fontFamily: theme.typography.fontFamily,
      '&:hover, &:focus': {
        borderColor: theme.egPalette.info[1],
        outline: theme.egPalette.info[1],
      },
    },
    success: {
      borderColor: theme.egPalette.success[2],
      '&:hover, &:focus': {
        borderColor: theme.egPalette.success[2],
        outline: theme.egPalette.success[2],
      },
    },
    error: {
      borderColor: theme.egPalette.error[1],
      '&:hover, &:focus': {
        borderColor: theme.egPalette.error[1],
        outline: theme.egPalette.error[1],
      },
    },
    warning: {
      borderColor: theme.egPalette.warning[1],
      '&:hover, &:focus': {
        borderColor: theme.egPalette.warning[1],
        outline: theme.egPalette.warning[1],
      },
    },
  });

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, success, error, warning, ...others } = props;
  return (
    <MuiTextareaAutosize
      ref={ref}
      className={clsx(classes.root, className, {
        [classes.success]: success,
        [classes.error]: error,
        [classes.warning]: warning,
      })}
      {...others}
    />
  );
});

export default withStyles(styles, { name: 'EgTextarea' })(Textarea);
