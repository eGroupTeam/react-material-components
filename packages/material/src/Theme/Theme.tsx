import React, { FC, ReactNode } from 'react';

import {
  ThemeProvider,
  ThemeProviderProps,
  CssBaseline,
} from '@material-ui/core';

export interface ThemeProps extends ThemeProviderProps {
  children: ReactNode;
}

const Theme: FC<ThemeProps> = ({ theme, children, ...other }) => {
  return (
    <ThemeProvider theme={theme} {...other}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
