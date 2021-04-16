import React, { FC } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import SwitchBase, { SwitchBaseProps } from './SwitchBase';

export type RoundedSwitchProps = SwitchBaseProps;

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
        backgroundColor: theme.palette.grey[500],
      },
      '&$checked': {
        transform: 'translateX(26px)',
        color: theme.palette.common.white,
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
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 30 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  });

const RoundedSwitch: FC<RoundedSwitchProps & WithStyles<typeof styles>> = (
  props
) => {
  return <SwitchBase {...props} />;
};

export default withStyles(styles, { name: 'EgRoundedSwitch' })(RoundedSwitch);
