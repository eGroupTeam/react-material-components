import React from 'react';
import { storiesOf } from '@storybook/react';

import buttonMarkdownText from './doc/button.md';
import Button, { ButtonComponent } from '../src/Button';
import styles from '!!raw-loader!../src/Button/styles';
import appendStylesIntro from './utils/appendStylesIntro';

storiesOf('Button', module)
  .add('default', () => <Button>default</Button>, {
    info: {
      text: appendStylesIntro(buttonMarkdownText, styles),
      propTables: [ButtonComponent],
      propTablesExclude: [Button]
    }
  })
  .add('with loading', () => <Button loading>normal</Button>, {
    info: {
      text: appendStylesIntro(buttonMarkdownText, styles),
      propTables: [ButtonComponent],
      propTablesExclude: [Button]
    }
  })
  .add('with success', () => <Button success>normal</Button>, {
    info: {
      text: appendStylesIntro(buttonMarkdownText, styles),
      propTables: [ButtonComponent],
      propTablesExclude: [Button]
    }
  });
