import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';

import moment from 'moment';

function parseToIntlLang(lang) {
  if (lang === 'zh-tw') return 'zh';
  if (lang === 'en-us') return 'en';
  return lang;
}

export const IntlControlContext = React.createContext();

export default class IntlControlProvider extends Component {
  static contextType = IntlControlContext;

  static propTypes = {
    children: PropTypes.node.isRequired,
    loadMessages: PropTypes.func.isRequired
  };

  state = {};

  componentDidMount() {
    const locale = navigator.language.toLowerCase();
    this.updateLocal(locale);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.locale !== this.state.locale) {
      this.updateLocal(this.state.locale);
    }
  }

  updateLocal = async locale => {
    const { loadMessages } = this.props;
    // set intl localeData first
    const localeData = await import(`react-intl/locale-data/${parseToIntlLang(
      locale
    )}`).then(localeData => localeData.default);
    addLocaleData(localeData);
    // load messages
    const messages = await loadMessages(locale);
    this.setMessages(messages);
    // locale need set after message otherwise it can't refresh
    this.setLocale(locale);

    // set moment locale
    if (locale !== 'en') {
      import(`moment/locale/${locale}`).then(() => moment.locale(locale));
    }
  };

  setMessages = messages =>
    this.setState({
      messages
    });

  setLocale = language =>
    this.setState({
      locale: language
    });

  render() {
    const { locale, messages } = this.state;
    const { children } = this.props;
    return (
      <IntlControlContext.Provider
        value={{
          setLocale: this.setLocale
        }}
      >
        {locale && (
          <IntlProvider
            defaultLocale="zh"
            locale={parseToIntlLang(locale)}
            key={locale}
            messages={messages}
          >
            {children}
          </IntlProvider>
        )}
      </IntlControlContext.Provider>
    );
  }
}
