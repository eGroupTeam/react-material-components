import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import Button from '@e-group/material/Button';
import { boolean } from '@storybook/addon-knobs';
import { makeStyles } from '@material-ui/core';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

export const Default: FC = () => (
  <Button
    loading={boolean('Loading', false)}
    success={boolean('Success', false)}
    variant="contained"
  >
    default
  </Button>
);

export const WithLoading: FC = () => (
  <Button loading variant="contained">
    default
  </Button>
);

export const WithSuccess: FC = () => (
  <Button success variant="contained">
    default
  </Button>
);

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
}));

export const WithCustomized: FC = () => {
  const classes = useStyles();
  return (
    <Button success variant="contained" muiButtonClasses={classes}>
      default
    </Button>
  );
};
