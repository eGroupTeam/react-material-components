import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

export const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  }
});

const EditableFieldActions = React.forwardRef(function EditableFieldActions(
  props,
  ref
) {
  const { className, classes, ...other } = props;

  return <div ref={ref} className={clsx(classes.root, className)} {...other} />;
});

EditableFieldActions.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditableFieldActions);
