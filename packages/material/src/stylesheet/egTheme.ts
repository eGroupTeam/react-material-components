import { createMuiTheme } from '@material-ui/core';
import {
  palette,
  typography,
  egPalette,
  egShadows,
  egShape,
} from './themeOptions';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    egPalette: typeof egPalette;
    egShadows: typeof egShadows;
    egShape: typeof egShape;
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    egPalette: typeof egPalette;
    egShadows: typeof egShadows;
    egShape: typeof egShape;
  }
}

const egTheme = createMuiTheme({
  palette,
  typography,
  egPalette,
  egShadows,
  egShape,
});

// for develop
// eslint-disable-next-line no-console
if (process.env.NODE_ENV !== 'production') console.log(egTheme);

export default egTheme;
