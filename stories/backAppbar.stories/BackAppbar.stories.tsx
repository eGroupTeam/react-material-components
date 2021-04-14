import React from 'react';

import { Meta, Story } from '@storybook/react';
import {
  BrowserRouter as Router,
  useHistory,
  useLocation,
} from 'react-router-dom';
import clsx from 'clsx';

import BackAppbar from '@e-group/material-module/BackAppbar';
import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export default {
  title: 'Modules/BackAppbar',
  component: BackAppbar,
} as Meta;

const useStyles = makeStyles(() => ({
  icon: {
    transform: 'rotate(90deg)',
    transition: 'transform cubic-bezier(0.4,0.0,0.2,1) 400ms',
  },
  rotate: {
    transform: 'rotate(0)',
  },
}));

const Demo = () => {
  const location = useLocation();
  const history = useHistory();
  const [entered, setEntered] = React.useState(false);
  const classes = useStyles();
  return (
    <BackAppbar
      push={history.push}
      go={history.go}
      pointerTrigger={location}
      fadeIn
      position="fixed"
      elevation={0}
      backIcon={
        <ArrowBackIcon
          className={clsx(classes.icon, {
            [classes.rotate]: entered,
          })}
        />
      }
      MuiFadeProps={{
        onEntered: () => {
          setEntered(true);
        },
      }}
    >
      <Typography variant="h6">Title</Typography>
      <Box flexGrow={1} />
      <Button color="inherit">Login</Button>
    </BackAppbar>
  );
};

export const Default: Story = () => (
  <Router>
    <Demo />
  </Router>
);
