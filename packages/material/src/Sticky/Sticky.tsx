import React, { FC, HTMLAttributes } from 'react';

import { makeStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles<Theme, StickyProps>(() => ({
  root: {
    top: (props) => props.top ?? 0,
    // Fix IE11 position sticky issue.
    marginTop: (props) => props.top ?? 0,
    position: 'sticky',
  },
}));

export interface StickyProps extends HTMLAttributes<HTMLDivElement> {
  top?: number;
}

const Sticky: FC<StickyProps> = (props) => {
  const { className, ...other } = props;
  const classes = useStyles(props);

  return <div className={clsx(classes.root, className)} {...other} />;
};

export default Sticky;
