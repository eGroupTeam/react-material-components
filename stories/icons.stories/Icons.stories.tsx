import React from 'react';

import { Meta, Story } from '@storybook/react';

import FaceBookIcon from '@material-ui/icons/Facebook';
import GoogleIcon from '@e-group/material-icons/Google';
import LineIcon from '@e-group/material-icons/Line';
import { makeStyles, Divider } from '@material-ui/core';

export default {
  title: 'Icons',
} as Meta;

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: theme.spacing(0.5),
  },
  large: {
    fontSize: 48,
  },
}));

export const Default: Story = () => {
  const classes = useStyles();
  return (
    <>
      <FaceBookIcon style={{ color: '#4267b2' }} />
      <GoogleIcon />
      <LineIcon />
      <Divider />
      <FaceBookIcon className={classes.large} style={{ color: '#4267b2' }} />
      <GoogleIcon className={classes.large} />
      <LineIcon className={classes.large} />
    </>
  );
};
