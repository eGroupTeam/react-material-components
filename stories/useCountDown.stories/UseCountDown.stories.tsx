import React from 'react';

import { Meta, Story } from '@storybook/react';
import useCountDown, { UseCountDownOptions } from '@e-group/hooks/useCountDown';

export default {
  title: 'Utils/useCountDown',
  argTypes: {
    min: { control: 'number', defaultValue: 0 },
  },
} as Meta;

export const Default: Story<UseCountDownOptions> = (args) => {
  const [number, setStartCountDown] = useCountDown(10, {
    min: args.min,
  });

  return (
    <>
      <h1>Counter: {number}</h1>
      <button onClick={() => setStartCountDown(true)}>Start count down</button>
      <button onClick={() => setStartCountDown(false)}>Stop count down</button>
    </>
  );
};
