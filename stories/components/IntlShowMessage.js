import React from 'react';
import { injectIntl } from 'react-intl';
import Highlight from './Highlight';

const ShowMessage = ({ intl }) => {
  return (
    <Highlight
      code={JSON.stringify(intl.messages, null, 4)}
      type="language-json"
    />
  );
};

export default injectIntl(ShowMessage);
