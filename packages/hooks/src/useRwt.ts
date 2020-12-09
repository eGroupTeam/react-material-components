import { useCallback } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

export type RwtOptions<T> = {
  xl?: T;
  lg?: T;
  sm?: T;
  md?: T;
  xs?: T;
};
/**
 * Responsive web text hook.
 */
export default function useRwt() {
  const theme = useTheme();
  const isDownXl = useMediaQuery(theme.breakpoints.down('xl'));
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg'));
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownXs = useMediaQuery(theme.breakpoints.down('xs'));

  const rwt = useCallback(
    <T>(defaultValue: T, options: RwtOptions<T>) => {
      if (options.xs && isDownXs) {
        return options.xs;
      }
      if (options.sm && isDownSm) {
        return options.sm;
      }
      if (options.md && isDownMd) {
        return options.md;
      }
      if (options.lg && isDownLg) {
        return options.lg;
      }
      if (options.xl && isDownXl) {
        return options.xl;
      }
      return defaultValue;
    },
    [isDownLg, isDownMd, isDownSm, isDownXl, isDownXs]
  );

  return rwt;
}
