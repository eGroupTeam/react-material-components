import React, { ComponentType } from 'react';
import {
  IntlControlContext,
  IntlControlWrapperProps
} from './IntlControlProvider';

const WrapperWithIntlControlConsumer = (
  WrapperComponent: ComponentType<IntlControlWrapperProps>
) => {
  const IntlControlWrapper = (props: IntlControlWrapperProps) => (
    <IntlControlContext.Consumer>
      {({ setLocale, setMessages, locale }) => (
        <WrapperComponent
          setLocale={setLocale}
          setMessages={setMessages}
          locale={locale}
          {...props}
        />
      )}
    </IntlControlContext.Consumer>
  );

  IntlControlWrapper.displayName = WrapperComponent.displayName;

  return IntlControlWrapper;
};

export default WrapperWithIntlControlConsumer;
