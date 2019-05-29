import React from 'react';
import { storiesOf } from '@storybook/react';

import positionMarkdownText from './doc/position.md';
import appendStylesIntro from './utils/appendStylesIntro';

import Position, { styles } from '../src/Position/Position';

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
  ),
  {
    notes: appendStylesIntro(
      positionMarkdownText,
      JSON.stringify(styles, null, 4)
    ),
    info: {
      propTables: [Position]
    }
  }
);
