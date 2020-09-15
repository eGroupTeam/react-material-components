import React, { ComponentType, FC, ReactElement } from 'react';
import {
  render as testingRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { StylesProvider } from '@material-ui/core';
import { GenerateId } from 'jss';

const generateClassName: GenerateId = (rule, sheet) =>
  `${sheet?.options.classNamePrefix}-${rule.key}`;

export default function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult {
  const AllProviders: FC = ({ children }) => {
    return (
      <StylesProvider generateClassName={generateClassName}>
        {children}
      </StylesProvider>
    );
  };

  return testingRender(ui, {
    wrapper: AllProviders as ComponentType,
    ...options,
  });
}
