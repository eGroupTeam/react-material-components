import React from 'react';
import { storiesOf } from '@storybook/react';

import StoryRouter from 'storybook-react-router';
import MarkdownElement from '@e-group/material-lab/MarkdownElement';
import 'highlight.js/styles/github.css';

import textmd from './text.md'

storiesOf('MarkdownElement', module)
  .addDecorator(StoryRouter())
  .add(
    'default',
    () => {
      return <MarkdownElement text={textmd}/>
    },
  );
