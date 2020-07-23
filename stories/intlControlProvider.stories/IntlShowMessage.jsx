import React from 'react';
import { useIntl, FormattedRelativeTime, FormattedMessage, FormattedNumber, FormattedDisplayName, FormattedDate } from 'react-intl';

import Typography from '@material-ui/core/Typography'
const IntlShowMessage = () => {
  const intl = useIntl();
  return (
    <React.Fragment>
      <Typography variant="h1">{intl.messages.title}</Typography>
      <FormattedRelativeTime unit="second"/>
      <br/>
      <FormattedRelativeTime numeric="auto"/>
      <br/>
      <FormattedRelativeTime value={-1} unit="second" />
      <br/>
      <FormattedRelativeTime value={2} unit="second" />
      <br/>
      <FormattedRelativeTime
        value={2}
        numeric="auto"
        unit="second"
        updateIntervalInSeconds={1}
      />
      <br />
      <FormattedDisplayName type="currency" value="TWD" />
      <FormattedNumber value={100000} style="currency" currency="TWD"/>
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
          link: msg => (
            <a href="https://www.shoe.com/">
              {msg}
            </a>
          ),
          cta: msg => <strong>{msg}</strong>,
        }}
      />
    </React.Fragment>
  );
};

export default IntlShowMessage
