import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.toolbar
  }
}));

const NavbarBrick = props => {
  const { className, ...other } = props;
  const classes = useStyles(props);

  return <div className={clsx(classes.root, className)} {...other} />;
};

NavbarBrick.propTypes = {
  // JSX Attribute.
  className: PropTypes.string
};

export default NavbarBrick;
