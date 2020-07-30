import React from 'react';
import { storiesOf } from '@storybook/react';

import Main from '@e-group/material-layout/Main';

storiesOf('Main', module)
  .add(
    'default',
    () => (
      <Main largePaddingBottom>
        Scroll to the bottom and test if button will block last line
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        default
        <button style={{ position: 'fixed', left: 10, bottom: 10 }}>button</button>
      </Main>
    ),
    {
      info: {
        propTables: [Main]
      }
    }
  )
