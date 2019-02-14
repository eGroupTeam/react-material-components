import React from 'react';
import { storiesOf } from '@storybook/react';

import containerMarkdownText from './doc/container.md';
import Container, { ContainerComponent } from '../src/Container';
import styles from '!!raw-loader!../src/Container/styles';
import appendStylesIntro from './utils/appendStylesIntro';

storiesOf('Components', module).add(
  'Container',
  () => (
    <Container>
      <div
        style={{ border: '1px solid #000', height: '200px', padding: '5px' }}
      >
        Container's max width default is 960px.
        <br />
        If you want to change default value please config containerMaxWidth in
        theme provider.
      </div>
    </Container>
  ),
  {
    info: {
      text: appendStylesIntro(containerMarkdownText, styles),
      propTables: [ContainerComponent],
      propTablesExclude: [Container]
    }
  }
);
