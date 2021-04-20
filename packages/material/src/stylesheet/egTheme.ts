import { createMuiTheme } from '@material-ui/core';
import { palette, typography, egPalette, egShadows } from './themeOptions';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    egPalette: typeof egPalette;
    egShadows: typeof egShadows;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    egPalette: typeof egPalette;
    egShadows: typeof egShadows;
  }
}

const egTheme = createMuiTheme({
  palette,
  typography,
  egPalette,
  egShadows,
});

// for develop
// eslint-disable-next-line no-console
if (process.env.NODE_ENV !== 'production') console.log(egTheme);

export default egTheme;
