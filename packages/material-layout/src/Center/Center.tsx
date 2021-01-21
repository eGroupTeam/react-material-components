import React, { FC, HTMLAttributes, useEffect, useState } from 'react';

import { WithStyles, withStyles, createStyles } from '@material-ui/core';

const styles = () =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export interface CenterProps
  extends HTMLAttributes<HTMLDivElement>,
    WithStyles<typeof styles> {
  offsetTop?: number;
}

const Center: FC<CenterProps> = ({
  classes,
  offsetTop = 0,
  style,
  ...other
}) => {
  const [height, setHeight] = useState<number>(window.innerHeight - offsetTop);

  useEffect(() => {
    const resizer = () => {
      setHeight(window.innerHeight - offsetTop);
    };
    window.addEventListener('resize', resizer);
    return () => {
      window.removeEventListener('resize', resizer);
    };
  }, [offsetTop]);

  useEffect(() => {
    setHeight(window.innerHeight - offsetTop);
  }, [offsetTop]);

  return (
    <div
      className={classes.root}
      style={{
        height,
        ...style,
      }}
      {...other}
    />
  );
};

export default withStyles(styles)(Center);
