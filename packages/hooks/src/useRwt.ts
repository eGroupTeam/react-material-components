import { ReactNode, useCallback } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

export type RwtValue = string | number | ReactNode;

export type RwtOptions = {
  xl?: RwtValue;
  lg?: RwtValue;
  sm?: RwtValue;
  md?: RwtValue;
  xs?: RwtValue;
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
    (defaultValue: RwtValue, options: RwtOptions) => {
      if (isDownXl) {
        return options.xl;
      }
      if (isDownLg) {
        return options.lg;
      }
      if (isDownSm) {
        return options.sm;
      }
      if (isDownMd) {
        return options.md;
      }
      if (isDownXs) {
        return options.xs;
      }
      return defaultValue;
    },
    [isDownLg, isDownMd, isDownSm, isDownXl, isDownXs]
  );

  return rwt;
}
