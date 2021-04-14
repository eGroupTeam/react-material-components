import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import IconButton, { IconButtonProps } from '@e-group/material/IconButton';
import Grid from '@e-group/material/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

export default {
  title: 'Components/IconButton',
  component: IconButton,
} as Meta;

export const Default: Story<IconButtonProps> = (args) => (
  <Grid container spacing={1}>
    <Grid item>
      <IconButton {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="inherit" {...args}>
        <DeleteIcon />
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
      <IconButton color="info" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
    <Grid item>
      <IconButton color="error" {...args}>
        <DeleteIcon />
      </IconButton>
    </Grid>
  </Grid>
);
