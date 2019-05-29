import * as React from 'react';

export interface IntlControlProviderProps {
  /** Callback function that triggers when component mount and
   * usually use to load third part library locale e.g., moment.
   * function(locale: string) => void */
  onMount: Function; 
  /** Callback function that triggers when locale changed.
     * function(locale: string) => void */
  onUpdateLocale: Function; 
  /**
   * Initialize IntlProvider with messages.
   */
  messages: Object;
}

declare const IntlControlProvider: React.ComponentType<IntlControlProviderProps>;

export default IntlControlProvider;