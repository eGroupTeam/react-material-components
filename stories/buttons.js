import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Button } from '../src';

storiesOf('Components', module).add('Button', () => (
  <React.Fragment>
    Inherit from{' '}
    <a
      href="https://material-ui.com/api/button/"
      target="_blank"
      rel="noopener noreferrer"
    >
      react-material's button
    </a>
    <Button onClick={action('clicked')}>Button</Button>
    <Button onClick={action('clicked')} disabled>
      Button
    </Button>
    <Button onClick={action('clicked')} loading>
      Button
    </Button>
    <Button onClick={action('clicked')} variant="contained">
      Button
    </Button>
    <Button onClick={action('clicked')} variant="contained" fullWidth>
      Button
    </Button>
    <Button onClick={action('clicked')} variant="contained" fullWidth loading>
      Button
    </Button>
    <Button
      onClick={action('clicked')}
      variant="contained"
      fullWidth
      style={{ marginTop: '20px', marginBottom: '20px' }}
    >
      Button
    </Button>
  </React.Fragment>
));
