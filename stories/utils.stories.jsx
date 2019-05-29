import React from 'react';
import { storiesOf } from '@storybook/react';

// import appendStylesIntro from './utils/appendStylesIntro';

import Position from '../src/Position';

storiesOf('Utils', module).add(
  'Position',
  () => (
    <div style={{ height: '100vh' }}>
      <Position alignItems="center" justifyContent="center" height="100%">
        <div style={{ height: 200, width: 200, background: 'blue' }}>
          <Position alignItems="center" justifyContent="flex-end" height="100%">
            nest position
          </Position>
        </div>
      </Position>
    </div>
  )
  // {
  //   notes: appendStylesIntro(buttonMarkdownText, styles),
  //   info: {
  //     propTables: [Position],
  //   }
  // }
);
