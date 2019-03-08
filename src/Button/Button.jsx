import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import MUIButton from '@material-ui/core/Button/Button';
import { CircularProgress } from '@material-ui/core';

import styles from './styles';

export const ButtonComponent = ({
  classes,
  className: classNameProp,
  children,
  loading,
  success,
  fullWidth,
  MUIButtonProps,
  CircularProgressProps,
  ...other
}) => {
  const { className: MUIButtonClassNameProp, ...otherMUIButtonProps } =
    MUIButtonProps || {};

  const { className: CircularProgressNameProp, ...otherCircularProgressProps } =
    CircularProgressProps || {};

  const className = classNames(
    classes.root,
    {
      [classes.fullWidth]: fullWidth
    },
    classNameProp
  );

  const ButtonClassName = classNames(
    {
      [classes.success]: success
    },
    MUIButtonClassNameProp
  );

  const CircularProgressClassName = classNames(
    classes.progress,
    CircularProgressNameProp
  );

  return (
    <div className={className} {...other}>
      <MUIButton
        className={ButtonClassName}
        disabled={loading}
        fullWidth={fullWidth}
        {...otherMUIButtonProps}
        children={children}
      />
      {loading && (
        <CircularProgress
          size={24}
          className={CircularProgressClassName}
          {...otherCircularProgressProps}
        />
      )}
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
  fullWidth: PropTypes.bool,
  /**
   * MUI Button Props
   */
  MUIButtonProps: PropTypes.object,
  /**
   * Circular Progress Props
   */
  CircularProgressProps: PropTypes.object
};

ButtonComponent.defaultProps = {
  loading: false,
  success: false
};

const Button = withStyles(styles)(ButtonComponent);

Button.displayName = 'Button';

export default Button;
