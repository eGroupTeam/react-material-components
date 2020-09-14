import React, { ReactNode } from 'react';

import { storiesOf } from '@storybook/react';

import IntlControlProvider, {
  useIntlControl,
} from '@e-group/material/IntlControlProvider';
import {
  useIntl,
  FormattedRelativeTime,
  FormattedMessage,
  FormattedNumber,
  FormattedDisplayName,
  FormattedDate,
} from 'react-intl';
import { Typography, Button } from '@material-ui/core';
import messages from './locales/zh-tw.json';
import intlControlProviderText from './intlControlProvider.md';

const IntlShowMessage = () => {
  const intl = useIntl();
  return (
    <>
      <Typography variant="h1">{intl.messages.title}</Typography>
      <FormattedRelativeTime unit="second" />
      <br />
      <FormattedRelativeTime numeric="auto" />
      <br />
      <FormattedRelativeTime value={-1} unit="second" />
      <br />
      <FormattedRelativeTime value={2} unit="second" />
      <br />
      <FormattedRelativeTime
        value={2}
        numeric="auto"
        unit="second"
        updateIntervalInSeconds={1}
      />
      <br />
      <FormattedDisplayName type="currency" value="TWD" />
      {/* eslint-disable-next-line react/style-prop-object */}
      <FormattedNumber value={100000} style="currency" currency="TWD" />
      <br />
      <FormattedDate
        value={new Date()}
        year="numeric"
        month="long"
        day="numeric"
        weekday="long"
      />
      <br />
      <FormattedMessage
        id="intro"
        defaultMessage={intl.messages.intro}
        values={{
          link: (msg: ReactNode) => <a href="https://www.shoe.com/">{msg}</a>,
          cta: (msg: ReactNode) => <strong>{msg}</strong>,
        }}
      />
    </>
  );
};

const IntlChangeLocal = () => {
  const intl = useIntl();
  const { setLocale, locale } = useIntlControl();

  return (
    <Button
      onClick={() => {
        if (locale === 'zh-tw') {
          setLocale('en');
        } else {
          setLocale('zh-tw');
        }
      }}
    >
      HOOK: {intl.messages.button}
    </Button>
  );
};

const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  }
  return navigator.language;
};

storiesOf('IntlControlProvider', module).add(
  'default',
  () => (
    <IntlControlProvider
      defaultLocale="en"
      locale={getNavigatorLanguage().toLowerCase()}
      messages={messages}
      onUpdateLocale={(locale, setMessages) => {
        // load messages
        import(`./locales/${locale}.json`).then((res) => {
          setMessages(res.default);
        });
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
      propTablesExclude: [IntlShowMessage, IntlChangeLocal],
    },
  }
);
