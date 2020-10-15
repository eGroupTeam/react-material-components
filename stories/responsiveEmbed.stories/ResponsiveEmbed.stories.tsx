import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import ResponsiveEmbed from '@e-group/material-module/ResponsiveEmbed';

export default {
  title: 'Modules/ResponsiveEmbed',
  component: ResponsiveEmbed,
} as Meta;

export const Default: FC = () => (
  <ResponsiveEmbed ratio="16:9">
    <iframe
      width="100%"
      height="100%"
      src="https://www.youtube.com/embed/1KbauuM9EhY"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="iframe"
    />
  </ResponsiveEmbed>
);
