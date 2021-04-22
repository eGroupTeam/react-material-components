import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import IconButton, { IconButtonProps } from '@e-group/material/IconButton';
import Grid from '@e-group/material/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import Icomoon from '@e-group/material/Icomoon';

export default {
  title: 'Components/IconButton',
  component: IconButton,
  argTypes: {
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
        options: ['standard', 'rounded'],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: ['medium', 'small'],
      },
    },
    disabled: {
      control: 'boolean',
    },
  },
} as Meta;

export const Default: Story<IconButtonProps> = (args) => (
  <Grid container spacing={1}>
    <Grid item>
      <IconButton {...args}>
        <Icomoon type="academic" />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="primary" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="secondary" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="text" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <div style={{ background: 'black', padding: 5 }}>
        <IconButton color="white" {...args}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Grid>
    <Grid item>
      <IconButton color="info" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="success" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="warning" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="error" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <div style={{ color: 'paleturquoise' }}>
        <IconButton color="inherit" {...args}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Grid>
  </Grid>
);
