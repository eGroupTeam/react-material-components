import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TextField, { TextFieldProps } from '@e-group/material/TextField';
import { Grid } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

export default {
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    variant: {
      control: {
        type: 'radio',
        options: ['standard', 'filled', 'outlined'],
      },
    },
  },
} as Meta;

export const Default: Story<TextFieldProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{
              startAdornment: <PersonIcon />,
            }}
            placeholder="UserName"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text with Hover"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{
              startAdornment: <PersonIcon />,
            }}
            placeholder="UserName"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text with Focused"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            placeholder="Hint Text with Typing"
            defaultValue="Typing "
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            InputProps={{ startAdornment: <PersonIcon /> }}
            defaultValue="Typing "
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            warning
            defaultValue="Warning"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            warning
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            error
            defaultValue="Error"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            error
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            success
            defaultValue="Success"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="TextField"
            success
            InputProps={{ startAdornment: <PersonIcon /> }}
            placeholder="UserName"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
