import React from 'react';
import { Meta, Story } from '@storybook/react';

import { makeStyles } from '@material-ui/core';
import Grid from '@e-group/material/Grid';
import Button, { ButtonProps } from '@e-group/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icomoon from '@e-group/material/Icomoon';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    rounded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    color: {
      control: {
        type: 'radio',
        options: [
          'inherit',
          'primary',
          'secondary',
          'default',
          'text',
          'white',
          'success',
          'warning',
          'info',
          'error',
        ],
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: ['text', 'outlined', 'contained'],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: ['small', 'medium', 'large'],
      },
    },
  },
} as Meta;

export const Default: Story<ButtonProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12} container spacing={2}>
      <Grid item>
        <Button
          component="div"
          startIcon={<DeleteIcon />}
          {...args}
          color="default"
        >
          Button
        </Button>
      </Grid>
      <Grid item>
        <div style={{ color: 'blueviolet' }}>
          <Button startIcon={<DeleteIcon />} {...args} color="inherit">
            Button
          </Button>
        </div>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="primary">
          Button
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="secondary">
          Button
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="text">
          Button
        </Button>
      </Grid>
      <Grid item>
        <div
          style={{
            padding: 5,
            backgroundColor: 'black',
          }}
        >
          <Button startIcon={<Icomoon type="people-setting_2" color="white" />} {...args} color="white">
            Button
          </Button>
        </div>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="info">
          Button
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="success">
          Button
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="warning">
          Button
        </Button>
      </Grid>
      <Grid item>
        <Button startIcon={<DeleteIcon />} {...args} color="error">
          Button
        </Button>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <div
        style={{
          padding: 5,
          display: 'inline-block',
          backgroundColor: args.color === 'white' ? 'black' : undefined,
        }}
      >
        <Button startIcon={<DeleteIcon />} {...args}>
          Button
        </Button>
      </div>
    </Grid>
  </Grid>
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

export const WithCustomized: Story<ButtonProps> = () => {
  const classes = useStyles();
  return (
    <Button variant="contained" muiButtonClasses={classes}>
      WithCustomized
    </Button>
  );
};
