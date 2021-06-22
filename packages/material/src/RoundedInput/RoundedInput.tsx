import React, { forwardRef } from 'react';
import {
  createStyles,
  InputBaseProps,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import InputBase from '../InputBase';
import Outline from './Outline';

export const styles = (theme: Theme) => {
  const borderColor =
    theme.palette.type === 'light'
      ? 'rgba(0, 0, 0, 0.23)'
      : 'rgba(255, 255, 255, 0.23)';

  return createStyles({
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      borderRadius: theme.egShape.borderRadius,
      '&:hover $notchedOutline': {
        borderColor: theme.palette.text.primary,
      },
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        '&:hover $notchedOutline': {
          borderColor,
        },
      },
      '&$focused $notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 2,
      },
      '&$error $notchedOutline': {
        borderColor: theme.palette.error.main,
      },
      '&$disabled $notchedOutline': {
        borderColor: theme.palette.action.disabled,
      },
    },
    /* Styles applied to the root element if the color is secondary. */
    colorSecondary: {
      '&$focused $notchedOutline': {
        borderColor: theme.palette.secondary.main,
      },
    },
    /* Styles applied to the root element if the component is focused. */
    focused: {},
    /* Styles applied to the root element if `disabled={true}`. */
    disabled: {},
    /* Styles applied to the root element if `startAdornment` is provided. */
    adornedStart: {
      paddingLeft: 14,
    },
    /* Styles applied to the root element if `endAdornment` is provided. */
    adornedEnd: {
      paddingRight: 14,
    },
    /* Pseudo-class applied to the root element if `error={true}`. */
    error: {},
    /* Styles applied to the `input` element if `margin="dense"`. */
    marginDense: {},
    /* Styles applied to the root element if `multiline={true}`. */
    multiline: {
      padding: '18.5px 14px',
      '&$marginDense': {
        paddingTop: 10.5,
        paddingBottom: 10.5,
      },
    },
    /* Styles applied to the `NotchedOutline` element. */
    notchedOutline: {
      borderColor,
    },
    /* Styles applied to the `input` element. */
    input: {
      paddingLeft: '14px',
      paddingRight: '14px',
      paddingTop: '17.5px ',
      paddingBottom: '19.5px ',
      '&:-webkit-autofill': {
        WebkitBoxShadow:
          theme.palette.type === 'light' ? null : '0 0 0 100px #266798 inset',
        WebkitTextFillColor: theme.palette.type === 'light' ? null : '#fff',
        caretColor: theme.palette.type === 'light' ? null : '#fff',
        borderRadius: 'inherit',
      },
    },
    /* Styles applied to the `input` element if `margin="dense"`. */
    inputMarginDense: {
      paddingTop: 10.5,
      paddingBottom: 10.5,
    },
    /* Styles applied to the `input` element if `multiline={true}`. */
    inputMultiline: {
      padding: 0,
    },
    /* Styles applied to the `input` element if `startAdornment` is provided. */
    inputAdornedStart: {
      paddingLeft: 0,
    },
    /* Styles applied to the `input` element if `endAdornment` is provided. */
    inputAdornedEnd: {
      paddingRight: 0,
    },
  });
};

export type RoundedInputProps = InputBaseProps;

const RoundedInput = forwardRef<
  unknown,
  RoundedInputProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    classes,
    fullWidth = false,
    inputComponent = 'input',
    multiline = false,
    type = 'text',
    ...other
  } = props;

  return (
    <InputBase
      renderSuffix={() => <Outline className={classes.notchedOutline} />}
      classes={{
        ...classes,
        root: classes.root,
      }}
      fullWidth={fullWidth}
      inputComponent={inputComponent}
      multiline={multiline}
      ref={ref}
      type={type}
      {...other}
    />
  );
});

export default withStyles(styles, { name: 'EgRoundedInput' })(RoundedInput);
