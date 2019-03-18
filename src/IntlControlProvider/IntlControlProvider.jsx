import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import parseToIntlLang from './parseToIntlLang';

export const IntlControlContext = React.createContext();

export default class IntlControlProvider extends Component {
  static contextType = IntlControlContext;

  static propTypes = {
    /** Callback function that triggers when component mount and
     * usually use in first time load message file.
     * function(locale: string) => void */
    onMount: PropTypes.func,
    /** Callback function that triggers when locale changed.
     * function(locale: string) => void */
    onUpdateLocale: PropTypes.func
  };

  state = {
    locale: navigator.language.toLowerCase()
  };

  componentDidMount() {
    const { locale } = this.state;
    const { onMount } = this.props;
    if (onMount) {
      onMount({
        locale,
        setLocale: this.setLocale,
        setMessages: this.setMessages
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { locale } = this.state;
    const { onUpdateLocale } = this.props;
    if (prevState.locale !== locale) {
      if (onUpdateLocale) {
        onUpdateLocale({
          locale,
          setLocale: this.setLocale,
          setMessages: this.setMessages
        });
      }
    }
  }

  setLocale = locale =>
    this.setState({
      locale
    });

  setMessages = messages =>
    this.setState({
      messages
    });

  render() {
    const { locale, messages } = this.state;
    return (
      <IntlControlContext.Provider
        value={{
          setLocale: this.setLocale,
          setMessages: this.setMessages,
          locale
        }}
      >
        {locale && (
          <IntlProvider
            locale={parseToIntlLang(locale)}
            key={locale}
            messages={messages}
            {...this.props}
          />
        )}
      </IntlControlContext.Provider>
    );
  }
}
