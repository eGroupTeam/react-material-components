import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const Main = ({ classes, className, ...other }) => {
  console.warn(
    "Main is been deprecated please use new component Container instead. It'll be removed in next major release."
  );
  return <main className={classNames(classes.root, className)} {...other} />;
};

export default withStyles(styles)(Main);
