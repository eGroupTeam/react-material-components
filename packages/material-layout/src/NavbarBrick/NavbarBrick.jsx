import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.toolbar
  },
  dense: {
    minHeight: theme.spacing(6)
  }
}));

const NavbarBrick = props => {
  const { className, dense, ...other } = props;
  const classes = useStyles(props);

  return (
    <div
      className={clsx(classes.root, dense && classes.dense, className)}
      {...other}
    />
  );
};

NavbarBrick.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  dense: PropTypes.bool
};

export default NavbarBrick;
