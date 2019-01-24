import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

export const PositionCenterComponent = ({
  classes,
  className: classNameProp,
  ...other
}) => {
  const className = classNames(classes.root, classNameProp);
  return <div className={className} {...other} />;
};

PositionCenterComponent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * The content of the component.
   */
  children: PropTypes.node
};

const PositionCenter = withStyles(styles)(PositionCenterComponent);

PositionCenter.displayName = 'PositionCenter';

export default PositionCenter;
