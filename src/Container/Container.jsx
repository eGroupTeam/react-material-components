import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles'

export const ContainerComponent = ({ children, className, classes, ...rest }) => {
  return (
    <div className={classnames(classes.root, className)} {...rest}>{children}</div>
  )
}

ContainerComponent.propTypes = {
  /** JSS props */
  classes: PropTypes.object.isRequired,
  /** children node */
  children: PropTypes.node.isRequired
};

const Container = withStyles(styles)(ContainerComponent)

Container.displayName = "Container";

export default Container;