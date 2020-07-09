import React from 'react';
import { storiesOf } from '@storybook/react';

import NavbarBrick from '@e-group/material-layout/NavbarBrick'

storiesOf('NavbarBrick', module)
  .add('default', () => {
    return (
      <NavbarBrick style={{ backgroundColor: '#000' }}/>
    )
  })
  .add('dense', () => {
    return (
      <NavbarBrick style={{ backgroundColor: '#000' }} dense/>
    )
  })