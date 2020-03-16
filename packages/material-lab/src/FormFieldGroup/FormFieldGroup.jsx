import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(3)
  },
  disableMarginBottom: {
    marginBottom: 0
  },
  labelContainer: {
    marginBottom: theme.spacing(1)
  },
  label: {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightBold
  }
});

const FormFieldGroup = React.forwardRef(function FormFieldGroup(props, ref) {
  const {
    children,
    className,
    classes,
    required,
    label,
    disableMarginBottom,
    MuiInputLabelProps
  } = props;

  return (
    <div
      ref={ref}
      className={clsx(
        classes.root,
        {
          [classes.disableMarginBottom]: disableMarginBottom
        },
        className
      )}
    >
      <div className={classes.labelContainer}>
        <InputLabel
          className={classes.label}
          required={required}
          {...MuiInputLabelProps}
        >
          {label}
        </InputLabel>
      </div>
      {children}
    </div>
  );
});

FormFieldGroup.propTypes = {
  /**
   * The contents of the `FormFieldGroup`.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * if `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool,
  /**
   * if `true`, disable the margin bottom.
   */
  disableMarginBottom: PropTypes.bool,
  /**
   * The contents of the `InputLabel`.
   */
  label: PropTypes.string,
  /**
   * Props applied to the Mui `InputLabel` element.
   */
  MuiInputLabelProps: PropTypes.object
};

export default withStyles(styles)(FormFieldGroup);
