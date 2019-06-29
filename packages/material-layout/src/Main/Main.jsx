import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(9.5),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: theme.spacing(20)
    }
  }
}));

const Main = ({ className, ...other }) => {
  const classes = useStyles();

  return <main className={clsx(classes.root, className)} {...other} />;
};

Main.propTypes = {
  // JSX Attribute.
  className: PropTypes.string
};

export default Main;
