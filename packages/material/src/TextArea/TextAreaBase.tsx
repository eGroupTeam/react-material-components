import React, { FC } from 'react';
import {
  createStyles,
  withStyles,
  Theme,
  TextareaAutosize as MuiTextAreaAutosize,
  TextareaAutosizeProps as MuiTextAreaAutosizeProps,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';

export interface TextAreaBaseProps extends MuiTextAreaAutosizeProps {
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

const TextareaAutosize: FC<TextAreaBaseProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  success,
  error,
  warning,
  ...others
}) => {
  return (
    <MuiTextAreaAutosize
      className={clsx(classes.root, className, {
        [classes.success]: success,
        [classes.error]: error,
        [classes.warning]: warning,
      })}
      {...others}
    />
  );
};

export default withStyles(styles)(TextareaAutosize);
