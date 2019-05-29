import React from 'react';
import { storiesOf } from '@storybook/react';

import loaderMarkdownText from './doc/loader.md';
import appendStylesIntro from './utils/appendStylesIntro';

import Loader, { styles } from '../src/Loader/Loader';
import LinearProgress from '@material-ui/core/LinearProgress';

storiesOf('Loader', module)
  .add(
    'default',
    () => {
      return (
        <div style={{ height: '100vh' }}>
          <Loader alignItems="center" height="100%" />
        </div>
      );
    },
    {
      notes: appendStylesIntro(
        loaderMarkdownText,
        JSON.stringify(styles, null, 4)
      ),
      info: {
        propTables: [Loader]
      }
    }
  )
  .add(
    'with customized component',
    () => {
      return (
        <div style={{ height: '100vh' }}>
          <Loader
            component={LinearProgress}
            MuiLoaderProps={{
              style: { width: 300 }
            }}
          />
        </div>
      );
    },
    {
      notes: appendStylesIntro(
        loaderMarkdownText,
        JSON.stringify(styles, null, 4)
      ),
      info: {
        propTables: [Loader]
      }
    }
  );
