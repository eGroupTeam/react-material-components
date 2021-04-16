import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import TextArea, { TextAreaProps } from '@e-group/material/TextArea';
import { Grid } from '@material-ui/core';

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as Meta;

export const Default: Story<TextAreaProps> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextArea
            rowsMin={5}
            placeholder="Hint Text for Text Area"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextArea
            rowsMin={5}
            defaultValue="Typing the details in Text Area"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextArea
            rowsMin={5}
            error
            defaultValue="Typing the details in Text Area"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <TextArea
            rowsMin={5}
            success
            defaultValue="Text Area Completed"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
    <Grid item xs={12}>
      <Grid container justify="center" spacing={5}>
        <Grid item xs={4}>
          <TextArea
            rowsMin={5}
            warning
            defaultValue="Typing the details in Text Area"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
