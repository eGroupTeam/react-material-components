import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import componentPropType from '@material-ui/utils/componentPropType';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './styles';

export const LoaderComponent = ({
  classes,
  className: classNameProp,
  loader: Loader,
  LoaderProps,
  align,
  ...other
}) => {
  const className = classNames(classes.root, classes[align], classNameProp);
  return (
    <div className={className} {...other}>
      <Loader {...LoaderProps} />
    </div>
  );
};

LoaderComponent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * JSX attribute
   */
  className: PropTypes.string,
  /**
   * The loader component.
   * Either a string to use a DOM element or a component.
   */
  loader: componentPropType,
  /**
   * Default loader component is Mui's CircularProgress component
   * Please read [official doc](https://material-ui.com/api/circular-progress/)
   */
  LoaderProps: PropTypes.object,
  /**
   * Defined the loader position.
   * enum: 'stretch' | 'center'
   */
  align: PropTypes.string
};

LoaderComponent.defaultProps = {
  loader: CircularProgress,
  align: 'stretch'
};

const Loader = withStyles(styles)(LoaderComponent);

Loader.displayName = 'Loader';

export default Loader;
