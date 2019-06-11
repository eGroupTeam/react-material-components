import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import makeStyles from '@material-ui/core/styles/makeStyles';

export const styles = {
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%'
    }
  },
  root: {
    display: 'flex',
    height: props => props.height,
    alignItems: props => props.alignItems,
    justifyContent: props => props.justifyContent
  }
};

const useStyles = makeStyles(styles);

export const Position = props => {
  const {
    className: classNameProp,
    height,
    alignItems,
    justifyContent,
    ...other
  } = props;
  const classes = useStyles(props);
  const className = clsx(classes.root, classNameProp);
  return <div className={className} {...other} />;
};

Position.propTypes = {
  /**
   * Defined the container height.
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Defined the container alignItems.
   */
  alignItems: PropTypes.string,
  /**
   * Defined the container justifyContent.
   */
  justifyContent: PropTypes.string
};

export default Position;
