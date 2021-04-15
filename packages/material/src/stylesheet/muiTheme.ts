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

const muiTheme = createMuiTheme({
  palette,
  typography,
  egPalette,
  egShadows,
  overrides: {
    MuiTextField: {
      root: {
        '&.MuiInput-Rounded .MuiInputBase-root, &.MuiInput-Rounded .MuiInputBase-root .MuiOutlinedInput-input.Mui-disabled': {
          borderRadius: '30px',
        },
      },
    },
    MuiInputBase: {
      root: {
        '&.Mui-focused .MuiInputBase-input': {
          caretColor: palette.primary.main,
        },
        '&.Mui-error .MuiInputBase-input': {
          color: palette.secondary.main,
        },
        '& .MuiInputBase-input': {
          padding: '15px 0',
        },
        '& .MuiOutlinedInput-input': {
          padding: '15px',
        },
        '& .MuiOutlinedInput-input.Mui-disabled': {
          color: 'white',
          backgroundColor: palette.action.disabledBackground,
          borderColor: 'transparent',
          borderRadius: '4px',
        },
        '& .MuiOutlinedInput-notchedOutline, &.Mui-disabled.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          borderColor: 'transparent',
          boxShadow: egShadows[2],
        },
      },
    },
  },
});

// for develop
// eslint-disable-next-line no-console
if (process.env.NODE_ENV !== 'production') console.log(muiTheme);

export default muiTheme;
