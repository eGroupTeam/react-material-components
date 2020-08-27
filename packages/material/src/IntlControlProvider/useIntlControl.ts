import React from 'react';
import { IntlControlContext } from './IntlControlProvider';

const useIntlControl = () => {
  const intlControl = React.useContext(IntlControlContext);
  return intlControl;
};

export default useIntlControl;
