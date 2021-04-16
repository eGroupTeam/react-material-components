import React, { FC } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import SwitchBase, { SwitchBaseProps } from './SwitchBase';

export type SquareSwitchProps = SwitchBaseProps;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: 52,
      height: 26,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.egPalette.primary[1],
        borderColor: theme.egPalette.primary[1],
      },
      '&$checked': {
        transform: 'translateX(26px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.egPalette.info[1],
          borderColor: theme.egPalette.info[1],
        },
        '&.Mui-disabled + $track': {
          opacity: 0.5,
          backgroundColor: theme.egPalette.text[3],
          borderColor: theme.egPalette.text[3],
        },
        '&.Mui-disabled': {
          color: theme.egPalette.text[3],
        },
      },
      '&.Mui-disabled': {
        color: theme.egPalette.text[3],
      },
      '&.MuiSwitch-colorPrimary + $track': {
        backgroundColor: theme.egPalette.error[1],
        borderColor: theme.egPalette.error[1],
      },
      '&.MuiSwitch-colorPrimary$checked': {
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.egPalette.success[1],
          borderColor: theme.egPalette.success[1],
        },
      },
    },
    thumb: {
      width: 22,
      height: 22,
      boxShadow: 'none',
      borderRadius: 3,
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 6 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  });

const SquareSwitch: FC<SquareSwitchProps & WithStyles<typeof styles>> = (
  props
) => {
  return <SwitchBase {...props} />;
};

export default withStyles(styles, { name: 'EgSquareSwitch' })(SquareSwitch);
