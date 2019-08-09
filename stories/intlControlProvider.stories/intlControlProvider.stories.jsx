import React from 'react';
import { storiesOf } from '@storybook/react';

import IntlControlProvider from '@e-group/material/IntlControlProvider';
import IntlShowMessage from './IntlShowMessage';
import IntlChangeLocal from './IntlChangeLocal';

import intlControlProviderText from './intlControlProvider.md';
import messages from './locales/en.json';

storiesOf('IntlControlProvider', module).add(
  'default',
  () => (
    <IntlControlProvider
      defaultLocale="en"
      locale="en"
      messages={messages}
      onUpdateLocale={(locale, setMessages) => {
        // load messages
        import(`./locales/${locale}.json`).then(res =>
          setMessages(res.default)
        );
      }}
    >
      <IntlShowMessage />
      <br />
      <IntlChangeLocal />
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
