import React from 'react';

import { useTheme, useMediaQuery } from '@material-ui/core';

/**
 * Responsive web text hook.
 */
export default function useRwt() {
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

  const rwt = React.useCallback(
    (defaultValue, options) => {
      if (isDownSm) {
        return options.sm;
      }
      return defaultValue;
    },
    [isDownSm]
  );

  return rwt;
}
