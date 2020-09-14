import React, { Component } from 'react';
import { IntlProvider, IntlConfig } from 'react-intl';

export type SetMessages = (messages: IntlConfig['messages']) => void;
export type SetLocale = (locale: string) => void;

export type IntlControlWrapperProps = {
  setLocale: SetLocale;
  setMessages: SetMessages;
  locale: string;
};

export const IntlControlContext = React.createContext<IntlControlWrapperProps>({
  setLocale: () => {},
  setMessages: () => {},
  locale: 'en',
});
export interface IntlControlProviderProps {
  /** Callback function that triggers when component mount and
   * usually use to load third part library locale e.g., moment.
   * function(locale: string) => void */
  onMount?: (locale: string, setMessages: SetMessages) => void;
  /** Callback function that triggers when locale changed.
   * function(locale: string) => void */
  onUpdateLocale?: (locale: string, setMessages: SetMessages) => void;
  /**
   * Initialize IntlProvider with messages.
   */
  messages?: IntlConfig['messages'];
  defaultLocale: string;
  locale: string;
}

export interface IntlControlProviderState {
  locale: string;
  messages?: IntlConfig['messages'];
}

export default class IntlControlProvider extends Component<
  IntlControlProviderProps,
  IntlControlProviderState
> {
  constructor(props: IntlControlProviderProps) {
    super(props);
    this.state = {
      locale: props.locale,
      messages: props.messages,
    };
  }

  componentDidMount() {
    const { locale } = this.state;
    const { onMount } = this.props;
    if (onMount) {
      onMount(locale, this.setMessages);
    }
  }

  componentDidUpdate(
    _prevProps: IntlControlProviderProps,
    prevState: IntlControlProviderState
  ) {
    const { locale } = this.state;
    const { onUpdateLocale } = this.props;
    if (prevState.locale !== locale) {
      if (onUpdateLocale) {
        onUpdateLocale(locale, this.setMessages);
      }
    }
  }

  setLocale = (locale: string) =>
    this.setState({
      locale,
    });

  setMessages = (messages: IntlConfig['messages']) =>
    this.setState({
      messages,
    });

  render() {
    const { locale, messages } = this.state;
    const { locale: localeProp, messages: messagesProp, ...other } = this.props;
    return (
      <IntlControlContext.Provider
        value={{
          setLocale: this.setLocale,
          setMessages: this.setMessages,
          locale,
        }}
      >
        <IntlProvider
          locale={locale}
          key={locale}
          messages={messages}
          {...other}
        />
      </IntlControlContext.Provider>
    );
  }
}
