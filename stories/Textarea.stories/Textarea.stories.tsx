import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Textarea, { TextareaProps } from '@e-group/material/Textarea';
import { Grid } from '@material-ui/core';

export default {
  title: 'Components/Textarea',
  component: Textarea,
} as Meta;

export const Default: Story<TextareaProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <Textarea
            rowsMin={5}
            placeholder="Hint Text for Textarea"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <Textarea
            rowsMin={5}
            defaultValue="Typing the details in Textarea"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <Textarea
            rowsMin={5}
            error
            defaultValue="Typing the details in Textarea"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <Textarea
            rowsMin={5}
            success
            defaultValue="Textarea Completed"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <Textarea
            rowsMin={5}
            warning
            defaultValue="Typing the details in Textarea"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
