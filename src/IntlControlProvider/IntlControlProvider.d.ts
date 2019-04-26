import * as React from 'react';

export interface IntlControlProviderProps {
  onMount: Function; 
  onUpdateLocale: Function; 
  defaultLocale: String;
  messages: Object;
}

declare const IntlControlProvider: React.ComponentType<IntlControlProviderProps>;

export default IntlControlProvider;