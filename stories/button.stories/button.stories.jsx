import React from 'react';
import { storiesOf } from '@storybook/react';

import buttonMarkdownText from './button.md';
import Button, { styles } from '@e-group/material/Button/Button';
import appendStylesIntro from '../utils/appendStylesIntro';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Button', module)
  .add(
    'default',
    () => (
      <Button
        loading={boolean('Loading', false)}
        success={boolean('Success', false)}
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
