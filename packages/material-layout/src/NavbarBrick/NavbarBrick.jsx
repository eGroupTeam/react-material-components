import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.toolbar
  }
}));

const NavbarBrick = ({ className, ...other }) => {
  const classes = useStyles();

  return <div className={clsx(classes.root, className)} {...other} />;
};

NavbarBrick.propTypes = {
  // JSX Attribute.
  className: PropTypes.string
};

export default NavbarBrick;
