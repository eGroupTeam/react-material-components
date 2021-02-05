import React, { FC } from 'react';

import { Meta } from '@storybook/react';
import useTab from '@e-group/hooks/useTab';
import { Tab, Tabs, Typography } from '@material-ui/core';

export default {
  title: 'Hooks/useTab',
} as Meta;

export const Default: FC = () => {
  const { value, handleChange } = useTab('demoTab');

  return (
    <>
      <Tabs value={value} onChange={(_, newValue) => handleChange(newValue)}>
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
      {value === 0 && <Typography>Item One</Typography>}
      {value === 1 && <Typography>Item Two</Typography>}
      {value === 2 && <Typography>Item Three</Typography>}
    </>
  );
};
