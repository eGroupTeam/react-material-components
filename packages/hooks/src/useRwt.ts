import { useCallback } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

export type Options<T> = {
  defaultValue: T;
  xl?: T;
  lg?: T;
  sm?: T;
  md?: T;
  xs?: T;
};

function isOptions<T>(value?: Options<T> | T): value is Options<T> {
  return typeof value === 'object';
}
/**
 * Responsive web text hook.
 */
export default function useRwt() {
  const theme = useTheme();
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isSm = useMediaQuery(theme.breakpoints.up('sm'));

  const rwt = useCallback(
    <T>(value?: Options<T> | T) => {
      if (!value) return undefined;
      if (!isOptions(value)) return value;
      if (value.xl && isXl) {
        return value.xl;
      }
      if (value.lg && isLg) {
        return value.lg;
      }
      if (value.md && isMd) {
        return value.md;
      }
      if (value.sm && isSm) {
        return value.sm;
      }
      if (value.xs) {
        return value.xs;
      }
      return value.defaultValue;
    },
    [isXl, isLg, isMd, isSm]
  );

  return rwt;
}
