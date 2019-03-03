import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button as MUIButton, CircularProgress } from '@material-ui/core';

import styles from './styles';

export const ButtonComponent = ({
  classes,
  className: classNameProp,
  loading,
  success,
  fullWidth,
  ...other
}) => {
  const className = classNames(
    {
      [classes.success]: success
    },
    classNameProp
  );
  return (
    <div
      className={classNames(classes.root, {
        [classes.fullWidth]: fullWidth
      })}
    >
      <MUIButton
        className={className}
        disabled={loading}
        fullWidth={fullWidth}
        {...other}
      />
      {loading && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
};

ButtonComponent.propTypes = {
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
   * The button's loading status
   */
  loading: PropTypes.bool,
  /**
   * The button's success status
   */
  success: PropTypes.bool,
  /**
   * Stretch button width.
   */
  fullWidth: PropTypes.bool
};

ButtonComponent.defaultProps = {
  loading: false,
  success: false
};

const Button = withStyles(styles)(ButtonComponent);

Button.displayName = 'Button';

export default Button;
