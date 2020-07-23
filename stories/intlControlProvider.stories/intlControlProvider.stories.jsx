import React from 'react';
import { storiesOf } from '@storybook/react';

import IntlControlProvider from '@e-group/material/IntlControlProvider';
import IntlShowMessage from './IntlShowMessage';
import IntlChangeLocal from './IntlChangeLocal';
import IntlChangeLocalHook from './IntlChangeLocalHook';

import intlControlProviderText from './intlControlProvider.md';
import messages from './locales/zh-tw.json';

const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en';
  }
}

storiesOf('IntlControlProvider', module).add(
  'default',
  () => (
    <IntlControlProvider
      defaultLocale="en"
      locale={getNavigatorLanguage().toLowerCase()}
      messages={messages}
      onUpdateLocale={(locale, setMessages) => {
        // load messages
        import(`./locales/${locale}.json`).then(res => {
          setMessages(res.default)
        });
      }}
    >
      <IntlShowMessage />
      <br />
      <IntlChangeLocal />
      <br />
      <IntlChangeLocalHook />
    </IntlControlProvider>
  ),
  {
    notes: intlControlProviderText,
    info: {
      propTables: [IntlControlProvider],
      propTablesExclude: [IntlShowMessage, IntlChangeLocal]
    }
  }
);
