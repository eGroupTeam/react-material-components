import React from 'react';
import { render as testingRender } from '@testing-library/react';
import { StylesProvider } from '@material-ui/core';

const generateClassName = (rule, styleSheet) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

export default function render(children) {
  return testingRender(
    <StylesProvider generateClassName={generateClassName}>
      {children}
    </StylesProvider>
  );
}
