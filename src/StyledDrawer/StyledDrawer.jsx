import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

const StyledDrawer = props => {
  return <Drawer {...props} />;
};

export default withStyles(styles)(StyledDrawer);
