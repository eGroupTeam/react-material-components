import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

const Main = ({ classes, className, ...other }) => (
  <main className={classNames(classes.root, className)} {...other} />
);

export default withStyles(styles)(Main);
