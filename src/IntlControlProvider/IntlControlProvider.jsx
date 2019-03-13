import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';

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
    /**
     * Load new locale data and than update all messages automatically.
     * function(locale: string) => void */
    loadMessages: PropTypes.func.isRequired,
    /** Callback function that triggers when locale changed.
     * function(locale: string) => void */
    onUpdateLocale: PropTypes.func
  };

  state = {
    locale: navigator.language.toLowerCase()
  };

  componentDidMount() {
    this._updateIntlLocaleData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.locale !== this.state.locale) {
      this._updateIntlLocaleData();
    }
  }

  _updateIntlLocaleData = async () => {
    const { locale } = this.state;
    const { loadMessages, onUpdateLocale } = this.props;
    // set intl localeData first
    const localeData = await import(`react-intl/locale-data/${parseToIntlLang(
      locale
    )}`).then(localeData => localeData.default);
    addLocaleData(localeData);
    // load messages
    const messages = await loadMessages(locale);
    this.setState({ messages });
    // locale need set after message otherwise it can't refresh
    this.setLocale(locale);

    onUpdateLocale(locale);
  };

  setLocale = locale =>
    this.setState({
      locale
    });

  render() {
    const { locale, messages } = this.state;
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
            {...this.props}
          />
        )}
      </IntlControlContext.Provider>
    );
  }
}
