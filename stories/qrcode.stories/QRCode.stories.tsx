import React from 'react';
import { Meta, Story } from '@storybook/react';
import QRCode, { QRCodeProps } from '@e-group/material-lab/QRCode';

export default {
  title: 'Lab/QRCode',
  component: QRCode,
  argTypes: {
    value: { control: 'text', defaultValue: 'http://www.micepass.com/' },
  },
} as Meta;

export const Default: Story<QRCodeProps> = (args) => <QRCode {...args} />;
