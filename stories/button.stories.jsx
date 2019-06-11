import React from 'react';
import { storiesOf } from '@storybook/react';

import buttonMarkdownText from './doc/button.md';
import Button, { styles } from '@e-group/material/Button/Button';
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
      notes: appendStylesIntro(
        buttonMarkdownText,
        JSON.stringify(styles, null, 4)
      ),
      info: {
        propTables: [Button]
      }
    }
  )
  .add('with loading', () => <Button loading>normal</Button>, {
    notes: appendStylesIntro(
      buttonMarkdownText,
      JSON.stringify(styles, null, 4)
    ),
    info: {
      propTables: [Button]
    }
  })
  .add('with success', () => <Button success>normal</Button>, {
    notes: appendStylesIntro(
      buttonMarkdownText,
      JSON.stringify(styles, null, 4)
    ),
    info: {
      propTables: [Button]
    }
  });
