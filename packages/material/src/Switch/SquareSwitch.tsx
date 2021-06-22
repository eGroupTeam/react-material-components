import React, { forwardRef } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import SwitchBase, { SwitchBaseProps } from './SwitchBase';

export type SquareSwitchProps = SwitchBaseProps;

const styles = (theme: Theme) =>
  createStyles({
    thumb: {
      border: ({ color = 'primary' }: SwitchBaseProps) =>
        color !== 'default' ? `1px solid ${theme.egPalette[color][1]}` : `none`,
      borderRadius: 3,
    },
    track: {
      borderRadius: 3,
    },
  });

const SquareSwitch = forwardRef<
  HTMLButtonElement,
  SquareSwitchProps & WithStyles<typeof styles>
>((props, ref) => <SwitchBase ref={ref} {...props} />);

export default withStyles(styles, { name: 'EgSquareSwitch' })(SquareSwitch);
