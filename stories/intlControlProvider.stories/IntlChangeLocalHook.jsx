import React from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import useIntlControl from '@e-group/material/IntlControlProvider/useIntlControl';

const IntlChangeLocalHook = () => {
  const intl = useIntl();
  const { setLocale, locale } = useIntlControl()

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

export default IntlChangeLocalHook
