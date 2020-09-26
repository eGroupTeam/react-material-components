import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import YoutubePlayer from '@e-group/material-module/YoutubePlayer';

export default {
  title: 'Modules/YoutubePlayer',
  component: YoutubePlayer,
} as Meta;

export const Default: FC = () => (
  <div style={{ width: 600 }}>
    <YoutubePlayer
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/WHiQXDusD0M"
      iframeTitle="eGroupAI │刷臉打卡系統 V2【人臉辨識 Demo】"
    />
    <YoutubePlayer
      variant="lightbox"
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/4nZMg3s9VGQ?start=2646"
      iframeTitle="公共電視新聞採訪 eGroupAI"
    />
  </div>
);
