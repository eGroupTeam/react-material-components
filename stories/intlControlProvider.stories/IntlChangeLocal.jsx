import React from 'react';
import Button from '@material-ui/core/Button';
import { useIntl } from 'react-intl';
import withIntlControlProvider from '@e-group/material/IntlControlProvider/withIntlControlProvider';

const IntlChangeLocal = ({ setLocale, locale }) => {
  const intl = useIntl();
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
      {intl.messages.button}
    </Button>
  );
};

export default withIntlControlProvider(IntlChangeLocal);
