import React, { CSSProperties, forwardRef, ReactNode } from 'react';
import {
  createStyles,
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
  withStyles,
} from '@material-ui/core';

export interface TypographyProps extends MuiTypographyProps {
  /**
   * Font weight
   */
  fontWeight?: CSSProperties['fontWeight'];
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: ReactNode;
}

const styles = () =>
  createStyles({
    h1: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h2: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h3: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h4: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h5: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h6: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
  });

const Typography = forwardRef<HTMLSpanElement, TypographyProps>(
  (props, ref) => <MuiTypography ref={ref} {...props} />
);

export default withStyles(styles)(Typography);
