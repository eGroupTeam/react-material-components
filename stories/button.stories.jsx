import React from 'react';
import { storiesOf } from '@storybook/react';

import buttonMarkdownText from './doc/button.md';
import Button, { ButtonComponent } from '../src/Button';
import styles from '!!raw-loader!../src/Button/styles';
import appendStylesIntro from './utils/appendStylesIntro';

storiesOf('Button', module)
  .add(
    'default',
    () => (
      <Button
        MuiButtonProps={{
          variant: 'contained'
        }}
      >
        default
      </Button>
    ),
    {
      notes: appendStylesIntro(buttonMarkdownText, styles),
      info: {
        propTables: [ButtonComponent],
        propTablesExclude: [Button]
      }
    }
  )
  .add('with loading', () => <Button loading>normal</Button>, {
    notes: appendStylesIntro(buttonMarkdownText, styles),
    info: {
      propTables: [ButtonComponent],
      propTablesExclude: [Button]
    }
  })
  .add('with success', () => <Button success>normal</Button>, {
    notes: appendStylesIntro(buttonMarkdownText, styles),
    info: {
      propTables: [ButtonComponent],
      propTablesExclude: [Button]
    }
  });
