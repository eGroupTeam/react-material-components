import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  unit3: {
    padding: `${theme.spacing.unit * 3}px`
  },
  unit2: {
    padding: `${theme.spacing.unit * 2}px`
  },
  unit1: {
    padding: `${theme.spacing.unit * 1}px`
  }
});

const PaperContent = ({ classes, className, unit, ...other }) => (
  <div className={classNames(classes[`unit${unit}`], className)} {...other} />
);

PaperContent.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * JSX attribute
   */
  className: PropTypes.node,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The number of PaperContent padding unit.
   */
  unit: PropTypes.number
};

PaperContent.defaultProps = {
  unit: 3
};

export default withStyles(styles)(PaperContent);
