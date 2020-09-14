import React, { Component } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';
import clsx from 'clsx';
import hljs from 'highlight.js';

import 'highlight.js/styles/github.css';

const styles = createStyles({
  code: {
    display: 'block',
    padding: '.5em',
    overflowX: 'auto',
    background: '#f8f8f8',
  },
});

export interface HighlightProps extends WithStyles<typeof styles> {
  code: string;
  type: string;
}

class Highlight extends Component<HighlightProps> {
  highlightCode = (code: string) => hljs.highlightAuto(code).value;

  render() {
    const { classes, code, type } = this.props;
    return (
      <pre>
        <code
          className={clsx(type, classes.code)}
          dangerouslySetInnerHTML={{ __html: this.highlightCode(code) }}
        />
      </pre>
    );
  }
}

export default withStyles(styles)(Highlight);
