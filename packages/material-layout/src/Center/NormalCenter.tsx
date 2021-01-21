import React, { FC, HTMLAttributes } from 'react';

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  classes: any;
  height: number;
  offsetTop?: number;
}

const Center: FC<CenterProps> = ({
  classes,
  height,
  offsetTop = 0,
  style,
  ...other
}) => (
  <div
    className={classes.root}
    style={{
      ...style,
      height: height - offsetTop,
    }}
    {...other}
  />
);

export default Center;
