import React from 'react';
import { storiesOf } from '@storybook/react';

import Button, { styles } from '@e-group/material/Button/Button';
import { boolean } from '@storybook/addon-knobs';
import buttonMarkdownText from './button.md';

storiesOf('Button', module).add(
  'default',
  () => (
    <Button
      loading={boolean('Loading', false)}
      success={boolean('Success', false)}
      MuiButtonProps={{
        variant: 'contained',
      }}
    >
      default
    </Button>
  ),
  {
    info: {
      propTables: [Button],
    },
  }
);
