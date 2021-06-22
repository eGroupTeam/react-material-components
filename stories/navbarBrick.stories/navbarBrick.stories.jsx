import React from 'react';
import { storiesOf } from '@storybook/react';

import NavbarBrick from '@e-group/material-layout/NavbarBrick'

storiesOf('NavbarBrick', module)
  .add('default', () => (
      <NavbarBrick style={{ backgroundColor: '#000' }}/>
    ))
  .add('dense', () => (
      <NavbarBrick style={{ backgroundColor: '#000' }} dense/>
    ))