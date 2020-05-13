import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(20)
    }
  }
}));

const Main = props => {
  const { className, ...other } = props;
  const classes = useStyles(props);

  return (
    <Box
      component="main"
      className={clsx(classes.root, className)}
      {...other}
    />
  );
};

Main.propTypes = {
  // JSX Attribute.
  className: PropTypes.string
};

export default Main;
