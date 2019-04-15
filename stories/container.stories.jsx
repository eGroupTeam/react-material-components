import React from 'react';
import { storiesOf } from '@storybook/react';

import containerMarkdownText from './doc/container.md';
import Container, { ContainerComponent } from '../src/Container';
import styles from '!!raw-loader!../src/Container/styles';
import appendStylesIntro from './utils/appendStylesIntro';

storiesOf('Components', module).add(
  'Container',
  () => (
    <Container maxWidth={false}>
      <div
        style={{
          border: '1px solid #000',
          backgroundColor: 'rgb(255, 255, 255)',
          height: '100vh'
        }}
      >
        The container centers your content horizontally.
        <br />
        It's the most basic layout element.
        <br />
        While containers can be nested, most layouts do not require a nested
        container.
      </div>
    </Container>
  ),
  {
    notes: appendStylesIntro(containerMarkdownText, styles),
    info: {
      propTables: [ContainerComponent],
      propTablesExclude: [Container]
    }
  }
);
