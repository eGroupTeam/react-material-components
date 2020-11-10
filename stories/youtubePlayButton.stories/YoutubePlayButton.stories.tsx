import React from 'react';

import { Meta, Story } from '@storybook/react';
import WebIcon from '@material-ui/icons/Web';

import {
  YoutubePlayButton,
  YoutubePlayButtonProps,
} from '@e-group/material-module/YoutubePlayer';
import { createStyles, Theme, withStyles } from '@material-ui/core';

export default {
  title: 'Modules/YoutubePlayButton',
  component: YoutubePlayButton,
} as Meta;

export const Default: Story<YoutubePlayButtonProps> = () => (
  <YoutubePlayButton />
);

export const WithCustomizedIcon: Story<YoutubePlayButtonProps> = () => (
  <YoutubePlayButton icon={<WebIcon />} />
);

export const WithCustomizedStyle: Story<YoutubePlayButtonProps> = () => {
  const styles = (theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.primary.light,

        '&:hover': {
          backgroundColor: theme.palette.primary.main,
        },
      },
    });
  const StyledYoutubePlayButton = withStyles(styles)(YoutubePlayButton);
  return <StyledYoutubePlayButton icon={<WebIcon />} />;
};
