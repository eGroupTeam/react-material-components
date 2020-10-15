import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import RatioImage from '@e-group/material/RatioImage';

export default {
  title: 'Components/RatioImage',
  component: RatioImage,
} as Meta;

export const Default: FC = () => (
  <div style={{ maxWidth: 800 }}>
    <RatioImage src="/thumb.jpg" ratio="5:4" alt="thumb" />
  </div>
);

export const withCoverCentralized: FC = () => (
  <div style={{ maxWidth: 800 }}>
    <RatioImage src="/thumb.jpg" fit="cover" ratio="16:5" alt="thumb" />
  </div>
);
