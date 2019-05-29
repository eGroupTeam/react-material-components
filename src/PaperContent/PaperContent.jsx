import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  root: {
    padding: props => theme.spacing(props.spacing)
  }
});

const useStyles = makeStyles(styles);

const PaperContent = props => {
  const { className: classNameProp, ...other } = props;
  const classes = useStyles(props);
  const className = clsx(classes.root, classNameProp);
  return <div className={className} {...other} />;
};

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
   * The spacing of PaperContent padding.
   */
  spacing: PropTypes.number
};

PaperContent.defaultProps = {
  spacing: 3
};

export default PaperContent;
