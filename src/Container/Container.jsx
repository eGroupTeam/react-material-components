import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { componentPropType } from '@material-ui/utils';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

export const ContainerComponent = ({
  classes,
  className: classNameProp,
  component: Component,
  ...other
}) => {
  const className = classNames(classes.root, classNameProp);
  return <Component className={className} {...other} />;
};

ContainerComponent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * JSX attribute
   */
  className: PropTypes.string,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: componentPropType
};

ContainerComponent.defaultProps = {
  component: 'div'
};

const Container = withStyles(styles)(ContainerComponent);

Container.displayName = 'Container';

export default Container;
