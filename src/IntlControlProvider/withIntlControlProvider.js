import React from 'react';
import { IntlControlContext } from './IntlControlProvider';

const WrapperWithIntlControlConsumer = WrapperComponent => {
  const IntlControlWrapper = props => (
    <IntlControlContext.Consumer>
      {({ setLocale, locale }) => (
        <WrapperComponent setLocale={setLocale} locale={locale} {...props} />
      )}
    </IntlControlContext.Consumer>
  );

  IntlControlWrapper.displayName = WrapperComponent.displayName;

  return IntlControlWrapper;
};

export default WrapperWithIntlControlConsumer;
