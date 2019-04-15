import React from 'react';
import { storiesOf } from '@storybook/react';

import loaderMarkdownText from './doc/loader.md';
import Loader, { LoaderComponent } from '../src/Loader';
import styles from '!!raw-loader!../src/Loader/styles';
import appendStylesIntro from './utils/appendStylesIntro';

storiesOf('Components', module).add(
  'Loader',
  () => (
    <div style={{ height: '100vh' }}>
      <Loader align="center" />
    </div>
  ),
  {
    notes: appendStylesIntro(loaderMarkdownText, styles),
    info: {
      propTables: [LoaderComponent],
      propTablesExclude: [Loader]
    }
  }
);
