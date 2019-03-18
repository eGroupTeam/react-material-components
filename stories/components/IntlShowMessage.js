import React from 'react';
import { injectIntl } from 'react-intl';

const ShowMessage = ({ intl }) => {
  return <div>{JSON.stringify(intl.messages, null, 4)}</div>;
};

export default injectIntl(ShowMessage);
