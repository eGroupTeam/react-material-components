import * as React from 'react';

export interface IntlControlProviderProps {
  onMount: Function; 
  onUpdateLocale: Function; 
}

declare const IntlControlProvider: React.ComponentType<IntlControlProviderProps>;

export default IntlControlProvider;