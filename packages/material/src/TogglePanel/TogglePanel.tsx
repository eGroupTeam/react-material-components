import React, { ElementType, forwardRef, HTMLAttributes } from 'react';

import clsx from 'clsx';
import { withStyles, createStyles, WithStyles } from '@material-ui/core';

const styles = createStyles({
  /* Styles applied to the root element if `index !== value`. */
  hide: {
    display: 'none',
  },
});

export interface TogglePanelProps
  extends HTMLAttributes<HTMLDivElement>,
    WithStyles<typeof styles> {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component?: ElementType;
  /**
   * Step index.
   */
  index: number;
  /**
   * value.
   */
  value: number;
  /**
   * How to implementation hide.
   */
  implementation?: 'css' | 'js';
}

const TogglePanel = forwardRef<HTMLDivElement, TogglePanelProps>(
  (props, ref) => {
    const {
      className,
      component: Component = 'div',
      classes,
      index,
      value,
      implementation = 'css',
      ...other
    } = props;

    if (implementation === 'js') {
      if (index !== value) {
        return null;
      }
      return <Component className={className} ref={ref} {...other} />;
    }

    return (
      <Component
        className={clsx(className, {
          [classes.hide]: index !== value,
        })}
        ref={ref}
        {...other}
      />
    );
  }
);

export default withStyles(styles)(TogglePanel);
