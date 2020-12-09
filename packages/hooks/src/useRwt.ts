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
      if (isDownXs) {
        return options.xs;
      }
      if (isDownSm) {
        return options.sm;
      }
      if (isDownMd) {
        return options.md;
      }
      if (isDownLg) {
        return options.lg;
      }
      if (isDownXl) {
        return options.xl;
      }
      return defaultValue;
    },
    [isDownLg, isDownMd, isDownSm, isDownXl, isDownXs]
  );

  return rwt;
}
