import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackAppbar = ({ history, location, title }) => {
  const [pointer, setPointer] = React.useState(0);

  React.useEffect(() => {
    setPointer(val => val + 1);
  }, [location]);

  return (
    <Fade in>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Box mr={2}>
            <IconButton
              onClick={() => {
                history.go(-pointer);
              }}
              color="inherit"
              edge="start"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
    </Fade>
  );
};

BackAppbar.propTypes = {
  // react router
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  // customized title
  title: PropTypes.string
};

export default BackAppbar;
