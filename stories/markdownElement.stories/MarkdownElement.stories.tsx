import React from 'react';
import { Meta, Story } from '@storybook/react';

import MarkdownElement from '@e-group/material-lab/MarkdownElement';
import 'highlight.js/styles/github.css';

import textmd from './text.md';

export default {
  title: 'Lab/MarkdownElement',
  component: MarkdownElement,
} as Meta;

export const Default: Story = () => <MarkdownElement text={textmd} />;
