import { useCallback } from 'react';
import { useTheme, useMediaQuery } from '@material-ui/core';

export type RwtOptions =
  | {
      defaultValue: string;
      xl?: string;
      lg?: string;
      sm?: string;
      md?: string;
      xs?: string;
    }
  | string;
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
    (options?: RwtOptions) => {
      if (!options) return undefined;
      if (typeof options === 'string') return options;
      if (options.xl && isXl) {
        return options.xl;
      }
      if (options.lg && isLg) {
        return options.lg;
      }
      if (options.md && isMd) {
        return options.md;
      }
      if (options.sm && isSm) {
        return options.sm;
      }
      if (options.xs) {
        return options.xs;
      }
      return options.defaultValue;
    },
    [isXl, isLg, isMd, isSm]
  );

  return rwt;
}
