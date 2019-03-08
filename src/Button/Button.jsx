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
  MUIButtonProps,
  CircularProgressProps,
  ...other
}) => {
  const {
    className: MUIButtonClassNameProp,
    fullWidth,
    ...otherMUIButtonProps
  } = MUIButtonProps || {};

  const { className: CircularProgressNameProp, ...otherCircularProgressProps } =
    CircularProgressProps || {};

  return (
    <div
      className={classNames(
        classes.root,
        {
          [classes.fullWidth]: fullWidth
        },
        classNameProp
      )}
      {...other}
    >
      <MUIButton
        className={classNames(
          {
            [classes.success]: success
          },
          MUIButtonClassNameProp
        )}
        disabled={loading}
        fullWidth={fullWidth}
        {...otherMUIButtonProps}
        children={children}
      />
      {loading && (
        <CircularProgress
          size={24}
          className={classNames(classes.progress, CircularProgressNameProp)}
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
