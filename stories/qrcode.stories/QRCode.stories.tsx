import React, { useRef, useState } from 'react';
import { Meta, Story } from '@storybook/react';
import QRCode, { QRCodeProps } from '@e-group/material-lab/QRCode';
import { Button } from '@material-ui/core';

export default {
  title: 'Lab/QRCode',
  component: QRCode,
  argTypes: {
    value: { control: 'text', defaultValue: 'http://www.micepass.com/' },
  },
} as Meta;

export const Default: Story<QRCodeProps> = (args) => <QRCode {...args} />;

export const WithUseRef: Story<QRCodeProps> = (args) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState('');

  const handleClick = () => {
    if (ref && ref.current) {
      setDataUrl(ref.current.toDataURL());
    }
  };

  return (
    <>
      <QRCode ref={ref} {...args} />
      <Button onClick={handleClick}>Get QR Code DataUrl</Button>
      {dataUrl}
    </>
  );
};
