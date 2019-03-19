import * as React from 'react';

export interface IntlControlProviderProps {
  onMount: Function; 
  onUpdateLocale: Function; 
  messages: Object
}

declare const IntlControlProvider: React.ComponentType<IntlControlProviderProps>;

export default IntlControlProvider;