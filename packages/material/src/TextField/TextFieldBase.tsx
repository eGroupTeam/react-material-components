import React, { FC } from 'react';
import {
  createStyles,
  TextField as MuiTextField,
  StandardTextFieldProps as MuiStandardTextFieldProps,
  FilledTextFieldProps as MuiFilledTextFieldProps,
  OutlinedTextFieldProps as MuiOutlinedTextFieldProps,
  withStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';

export interface StandardTextFieldProps extends MuiStandardTextFieldProps {
  success?: boolean;
  warning?: boolean;
}

export interface FilledTextFieldProps extends MuiFilledTextFieldProps {
  success?: boolean;
  warning?: boolean;
}

export interface OutlinedTextFieldProps extends MuiOutlinedTextFieldProps {
  success?: boolean;
  warning?: boolean;
}

export type TextFieldBaseProps =
  | StandardTextFieldProps
  | FilledTextFieldProps
  | OutlinedTextFieldProps;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputBase-root.Mui-disabled.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input': {
        caretColor: theme.egPalette.text[1],
      },
    },
    success: {
      '& .MuiFormLabel-root': {
        color: theme.egPalette.success[1],
      },
      '& .MuiInputBase-root': {
        color: theme.egPalette.success[1],
        caretColor: theme.egPalette.success[1],
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.egPalette.success[0],
      },
      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        borderBottomColor: theme.egPalette.success[1],
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.egPalette.success[1],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.success[1],
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.success[1],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.success[1],
      },
    },
    warning: {
      '& .MuiFormLabel-root': {
        color: theme.egPalette.warning[1],
      },
      '& .MuiInputBase-root': {
        color: theme.egPalette.warning[1],
        caretColor: theme.egPalette.warning[1],
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.egPalette.warning[0],
      },
      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        borderBottomColor: theme.egPalette.warning[1],
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.egPalette.warning[1],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.warning[1],
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.warning[1],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.warning[1],
      },
    },
    error: {
      '& .MuiFormLabel-root': {
        color: theme.egPalette.error[1],
      },
      '& .MuiInputBase-root': {
        color: theme.egPalette.error[1],
        caretColor: theme.egPalette.error[1],
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.egPalette.error[0],
      },
      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        borderBottomColor: theme.egPalette.error[1],
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.egPalette.error[1],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.error[1],
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.error[1],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.error[1],
      },
    },
  });

const TextFieldBase: FC<TextFieldBaseProps & WithStyles<typeof styles>> = ({
  className,
  classes,
  success,
  warning,
  error,
  ...others
}) => {
  return (
    <MuiTextField
      className={clsx(className, {
        [classes.success]: success,
        [classes.warning]: warning,
        [classes.error]: error,
      })}
      classes={classes}
      {...others}
    />
  );
};

export default withStyles(styles, { name: 'EgTextFieldBase' })(TextFieldBase);
