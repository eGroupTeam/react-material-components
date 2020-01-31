import React from 'react';
import { storiesOf } from '@storybook/react';

import positionMarkdownText from './position.md';
import appendStylesIntro from '../utils/appendStylesIntro';

import Position, { styles } from '@e-group/material/Position/Position';
import { select } from '@storybook/addon-knobs';

storiesOf('Position', module).add(
  'default',
  () => {
    const alignItems = select('AlignItems', {
      flexStart: "flex-start",
      Center: "center",
      flexEnd: "flex-end",
      Stretch: "stretch",
      Baseline: "baseline",
    }, "center");

    const justifyContent = select('JustifyContent', {
      flexStart: "flex-start",
      Center: "center",
      flexEnd: "flex-end",
      spaceBetween: "space-between",
      spaceAround: "space-around",
      spaceEvenly: "space-evenly",
    }, "center");

    return (
    <div style={{ height: '100vh' }}>
      <Position alignItems={alignItems} justifyContent={justifyContent} height="100%">
        <div>
          Content
        </div>
      </Position>
    </div>
  )},
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
