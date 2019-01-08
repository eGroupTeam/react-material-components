import React from 'react';
import { IntlControlContext } from './IntlControlProvider';

export default function withIntlControl(Component) {
  return function WrapperComponent(props) {
    return (
      <IntlControlContext.Consumer>
        {value => <Component {...props} setLocale={value.setLocale} />}
      </IntlControlContext.Consumer>
    );
  };
}
