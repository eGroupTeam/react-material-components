import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import warning from 'warning';

import styles from './styles';

const Main = ({ classes, className, ...other }) => {
  warning(
    true,
    'Main is been deprecated please use new component Container instead.'
  );
  return <main className={classNames(classes.root, className)} {...other} />;
};

export default withStyles(styles)(Main);
