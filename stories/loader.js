import React from 'react';
import { storiesOf } from '@storybook/react';

import loaderMarkdownText from './doc/loader.md';
import Loader, { LoaderComponent } from '../src/Loader';

storiesOf('Components', module).add('Loader', () => <Loader />, {
  info: {
    text: loaderMarkdownText,
    propTables: [LoaderComponent],
    propTablesExclude: [Loader]
  }
});
