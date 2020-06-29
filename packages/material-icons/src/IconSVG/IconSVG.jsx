import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const styles = theme => ({
  root: {
    display: 'inline-block',
    fontSize: '1.5rem',
    width: '1em',
    height: '1em',
    flexShrink: 0,
    userSelect: 'none'
  }
});

const IconSVG = React.forwardRef(function IconSVG(props, ref) {
  const { classes, className, ...other } = props;
  return (
    <svg
      className={clsx(className, classes.root)}
      ref={ref}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    />
  );
});

IconSVG.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
   * Icon height default is 18.
   */
  height: PropTypes.number,
  /**
   * Icon width default is 18.
   */
  width: PropTypes.number
};

export default withStyles(styles)(IconSVG);
