import React from 'react';
import { storiesOf } from '@storybook/react';
import { addLocaleData } from 'react-intl';
import zhLocaleData from 'react-intl/locale-data/zh';
import IntlShowMessage from './components/IntlShowMessage';
import IntlChangeLocal from './components/IntlChangeLocal';

import intlControlProviderText from './doc/intlControlProvider.md';
import IntlControlProvider from '@e-group/material/IntlControlProvider';
import messages from './static/locales/en.json';

const parseToIntlLang = require('@e-group/material/IntlControlProvider/parseToIntlLang')
  .default;

addLocaleData(zhLocaleData);

storiesOf('IntlControlProvider', module).add(
  'default',
  () => (
    <IntlControlProvider
      defaultLocale="en"
      locale="en"
      messages={messages}
      onUpdateLocale={(locale, setMessages) => {
        // set intl localeData first
        import(`react-intl/locale-data/${parseToIntlLang(locale)}`).then(
          localeData => addLocaleData(localeData.default)
        );
        // load messages
        import(`./static/locales/${locale}.json`).then(res =>
          setMessages(res.default)
        );
      }}
    >
      <div>
        <IntlShowMessage />
        <IntlChangeLocal />
      </div>
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
