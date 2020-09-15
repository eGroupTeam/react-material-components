import React from 'react';
import { storiesOf } from '@storybook/react';

import FixedCenter from '@e-group/material-layout/FixedCenter';
import { Typography } from '@material-ui/core';

storiesOf('FixedCenter', module).add('default', () => {
  return (
    <FixedCenter>
      <div>
        <Typography>I&apos;m center of the world.</Typography>
      </div>
    </FixedCenter>
  );
});
