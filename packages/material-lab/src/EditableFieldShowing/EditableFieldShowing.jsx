import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1),
    flexWrap: props => (props.noWrap ? 'nowrap' : 'wrap')
  }
});

const EditableFieldShowing = React.forwardRef(function EditableFieldShowing(
  props,
  ref
) {
  const { className, classes, ...other } = props;

  return <div ref={ref} className={clsx(classes.root, className)} {...other} />;
});

EditableFieldShowing.propTypes = {
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
   * If true, flex wrap will set to nowrap.
   */
  noWrap: PropTypes.bool
};

export default withStyles(styles)(EditableFieldShowing);
