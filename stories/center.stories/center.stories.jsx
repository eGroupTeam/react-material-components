import React from 'react';
import { storiesOf } from '@storybook/react';

import Center from '@e-group/material-layout/Center'
import { AppBar, Typography, Toolbar } from '@material-ui/core';

storiesOf('Center', module)
  .add('default', () => {
    return (
      <>
        <AppBar>
          <Toolbar>eGroupAI</Toolbar>
        </AppBar>
        <Center>
          <div>
            <Typography>I'm center of the world.</Typography>
          </div>
        </Center>
      </>
    )
  })