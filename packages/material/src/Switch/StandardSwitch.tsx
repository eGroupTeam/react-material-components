import React, { FC } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import SwitchBase, { SwitchBaseProps } from './SwitchBase';

export type StandardSwitchProps = SwitchBaseProps;

const styles = (theme: Theme) =>
  createStyles({
    switchBase: {
      color: 'white',
      borderColor: theme.egPalette.primary[1],
      '&$checked': {
        color: theme.egPalette.primary[1],
      },
      '&.Mui-disabled': {
        color: theme.egPalette.text[4],
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        borderColor: theme.egPalette.text[4],
      },
      '&$checked + $track': {
        backgroundColor: theme.egPalette.primary[1],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        backgroundColor: theme.egPalette.text[1],
        opacity: 0.2,
      },
    },
    thumb: {
      border: `1px solid ${theme.egPalette.primary[1]}`,
    },
    checked: {},
    track: {},
  });

const StandardSwitch: FC<StandardSwitchProps & WithStyles<typeof styles>> = (
  props
) => {
  return <SwitchBase {...props} />;
};

export default withStyles(styles, { name: 'EgStandardSwitch' })(StandardSwitch);
