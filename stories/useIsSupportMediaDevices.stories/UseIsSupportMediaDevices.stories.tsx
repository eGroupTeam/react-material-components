import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import useIsSupportMediaDevices from '@e-group/hooks/useIsSupportMediaDevices';

export default {
  title: 'Utils/useIsSupportMediaDevices',
} as Meta;

export const Default: FC = () => {
  const [isSupportMediaDevices, info] = useIsSupportMediaDevices();
  return (
    <>
      isSupportMediaDevices: {String(isSupportMediaDevices)}
      <br />
      info: {JSON.stringify(info)}
    </>
  );
};
