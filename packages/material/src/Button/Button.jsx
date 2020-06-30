import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import green from '@material-ui/core/colors/green';
import clsx from 'clsx';
import MuiButton from '@material-ui/core/Button/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = {
  root: {
    display: 'inline-flex',
    position: 'relative'
  },
  fullWidth: {
    width: '100%'
  },
  success: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  progress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
};

const useStyles = makeStyles(styles, {
  name: 'EgButton'
});

const Button = props => {
  const {
    className: classNameProp,
    children,
    loading,
    success,
    MuiButtonProps,
    MuiCircularProgressProps,
    ...other
  } = props;
  const classes = useStyles(props);
  const {
    className: MuiButtonClassNameProp,
    fullWidth,
    ...otherMuiButtonProps
  } = MuiButtonProps || {};

  const { className: CircularProgressNameProp, ...otherCircularProgressProps } =
    MuiCircularProgressProps || {};

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.fullWidth]: fullWidth
        },
        classNameProp
      )}
      {...other}
    >
      <MuiButton
        className={clsx(
          {
            [classes.success]: success
          },
          MuiButtonClassNameProp
        )}
        disabled={loading}
        fullWidth={fullWidth}
        {...otherMuiButtonProps}
        children={children}
      />
      {loading && (
        <CircularProgress
          size={24}
          className={clsx(classes.progress, CircularProgressNameProp)}
          {...otherCircularProgressProps}
        />
      )}
    </div>
  );
};

Button.propTypes = {
  /**
   * @ignore
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
   * Mui Button Props
   */
  MuiButtonProps: PropTypes.object,
  /**
   * Circular Progress Props
   */
  MuiCircularProgressProps: PropTypes.object
};

Button.defaultProps = {
  loading: false,
  success: false
};

export default Button;
