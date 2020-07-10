import React from 'react';

import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export interface CenterProps extends WithStyles<typeof styles> {
  offsetTop?: number;
  style?: React.CSSProperties;
}

const Center: React.FunctionComponent<CenterProps> = ({
  classes,
  offsetTop = 0,
  style,
  ...other
}) => {
  const [height, setHeight] = React.useState<number>(
    window.innerHeight - offsetTop
  );

  React.useEffect(() => {
    const resizer = () => {
      setHeight(window.innerHeight - offsetTop);
    };
    window.addEventListener('resize', resizer);
    return () => {
      window.removeEventListener('resize', resizer);
    };
  }, [offsetTop]);

  return (
    <div
      className={classes.root}
      style={{
        ...style,
        height
      }}
      {...other}
    />
  );
};

export default withStyles(styles)(Center);
