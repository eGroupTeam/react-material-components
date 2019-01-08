import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class Container extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children, className, classes } = this.props;
    return (
      <div className={classnames(classes.root, className)}>{children}</div>
    );
  }
}

export default withStyles(styles)(Container);