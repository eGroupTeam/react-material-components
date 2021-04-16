import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import { Grid, Typography } from '@material-ui/core';
import ColorPattle, { ColorPattleProps } from './ColorPattle';

export default {
  title: 'Styles/ColorPattle',
  component: ColorPattle,
} as Meta;

export const Default: Story<ColorPattleProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6" color="textSecondary">
        - Base Colors
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Grid container spacing={2}>
        <Grid item>
          <ColorPattle
            color="text"
            shape={1}
            style={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item>
          <ColorPattle
            color="text"
            shape={2}
            style={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item>
          <ColorPattle
            color="text"
            shape={3}
            style={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item>
          <ColorPattle
            color="text"
            shape={4}
            style={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item>
          <ColorPattle
            color="text"
            shape={5}
            style={{ width: 120, height: 120 }}
          />
        </Grid>
        <Grid item>
          <ColorPattle
            color="text"
            shape={6}
            style={{ width: 120, height: 120 }}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6" color="textSecondary">
        - Primary Colors
      </Typography>
    </Grid>
    <Grid item xs={12}>
      {Array.from({ length: 7 }).map((el, index) => (
        <Grid container spacing={3} key={index as any}>
          <Grid item>
            <ColorPattle
              color="primary"
              shape={index as any}
              style={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item>
            <ColorPattle
              color="info"
              shape={index as any}
              style={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item>
            <ColorPattle
              color="success"
              shape={index as any}
              style={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item>
            <ColorPattle
              color="error"
              shape={index as any}
              style={{ width: 60, height: 60 }}
            />
          </Grid>
          <Grid item>
            <ColorPattle
              color="warning"
              shape={index as any}
              style={{ width: 60, height: 60 }}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Grid>
);
