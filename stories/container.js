import React from 'react';
import { storiesOf } from '@storybook/react';

import containerMarkdownText from './doc/container.md';
import Container, { ContainerComponent } from '../src/Container';
import styles from '!!raw-loader!../src/Container/styles';
import appendStylesIntro from './utils/appendStylesIntro';

storiesOf('Components', module).add(
  'Container',
  () => <Container>content...</Container>,
  {
    info: {
      text: appendStylesIntro(containerMarkdownText, styles),
      propTables: [ContainerComponent],
      propTablesExclude: [Container]
    }
  }
);
