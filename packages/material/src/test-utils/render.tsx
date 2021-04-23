import React, { ComponentType, FC, ReactElement } from 'react';
import {
  render as testingRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { CssBaseline, StylesProvider, ThemeProvider } from '@material-ui/core';
import { GenerateId } from 'jss';
import egTheme from '../stylesheet/egTheme';

const generateClassName: GenerateId = (rule, sheet) =>
  `${sheet?.options.classNamePrefix}-${rule.key}`;

export default function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  const AllProviders: FC = ({ children }) => {
    return (
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={egTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StylesProvider>
    );
  };

  return testingRender(ui, {
    wrapper: AllProviders as ComponentType,
    ...options,
  });
}
