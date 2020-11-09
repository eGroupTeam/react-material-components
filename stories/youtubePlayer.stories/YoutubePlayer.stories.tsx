import React from 'react';

import { Meta, Story } from '@storybook/react';

import YoutubePlayer, {
  YoutubePlayerProps,
} from '@e-group/material-module/YoutubePlayer';

export default {
  title: 'Modules/YoutubePlayer',
  component: YoutubePlayer,
  argTypes: {
    isPlay: { control: 'boolean' },
    hidePlayButton: { control: 'boolean' },
    ratio: { control: 'text' },
  },
} as Meta;

export const Default: Story<YoutubePlayerProps> = () => (
  <div style={{ width: 600 }}>
    <YoutubePlayer
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/WHiQXDusD0M"
      iframeTitle="eGroupAI │刷臉打卡系統 V2【人臉辨識 Demo】"
    />
    <br />
    <YoutubePlayer
      variant="lightbox"
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/4nZMg3s9VGQ?start=2646"
      iframeTitle="公共電視新聞採訪 eGroupAI"
    />
    <br />
    <YoutubePlayer
      ratio="1905:702"
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/4nZMg3s9VGQ?start=2646"
      iframeTitle="公共電視新聞採訪 eGroupAI"
    />
  </div>
);

export const WithControled: Story<YoutubePlayerProps> = ({
  placeholder,
  iframeSrc,
  iframeTitle,
  isPlay = false,
  ...other
}) => (
  <div style={{ width: 600 }}>
    <YoutubePlayer
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/WHiQXDusD0M"
      iframeTitle="eGroupAI │刷臉打卡系統 V2【人臉辨識 Demo】"
      isPlay={isPlay}
      {...other}
    />
    <br />
    <YoutubePlayer
      variant="lightbox"
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/4nZMg3s9VGQ?start=2646"
      iframeTitle="公共電視新聞採訪 eGroupAI"
      isPlay={isPlay}
      {...other}
    />
    <br />
    <YoutubePlayer
      ratio="1905:702"
      placeholder="/thumb.jpg"
      iframeSrc="https://www.youtube.com/embed/4nZMg3s9VGQ?start=2646"
      iframeTitle="公共電視新聞採訪 eGroupAI"
      isPlay={isPlay}
      {...other}
    />
  </div>
);
