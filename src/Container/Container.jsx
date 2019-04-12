import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import componentPropType from '@material-ui/utils/componentPropType';
import withStyles from '@material-ui/core/styles/withStyles';

import styles from './styles';

export const ContainerComponent = ({
  classes,
  className: classNameProp,
  component: Component,
  maxWidth,
  ...other
}) => {
  const className = classNames(
    classes.root,
    {
      [classes[maxWidth]]: maxWidth !== false
    },
    classNameProp
  );
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
  component: componentPropType,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   */
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false])
};

ContainerComponent.defaultProps = {
  component: 'div',
  maxWidth: 'md'
};

const Container = withStyles(styles)(ContainerComponent);

Container.displayName = 'Container';

export default Container;
