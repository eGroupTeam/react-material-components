import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

export const IntlControlContext = React.createContext();

export default class IntlControlProvider extends Component {
  static contextType = IntlControlContext;

  static propTypes = {
    /** Callback function that triggers when component mount and
     * usually use to load third part library locale e.g., moment.
     * function(locale: string) => void */
    onMount: PropTypes.func,
    /** Callback function that triggers when locale changed.
     * function(locale: string) => void */
    onUpdateLocale: PropTypes.func,
    /**
     * Initialize IntlProvider with messages.
     */
    messages: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      locale: props.locale,
      messages: props.messages
    };
  }

  componentDidMount() {
    const { locale } = this.state;
    const { onMount } = this.props;
    if (onMount) {
      onMount(locale, this.setMessages);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { locale } = this.state;
    const { onUpdateLocale } = this.props;
    if (prevState.locale !== locale) {
      if (onUpdateLocale) {
        onUpdateLocale(locale, this.setMessages);
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
    const { locale: localeProp, messages: messagesProp, ...other } = this.props;
    return (
      <IntlControlContext.Provider
        value={{
          setLocale: this.setLocale,
          setMessages: this.setMessages,
          locale
        }}
      >
        <IntlProvider locale={locale} messages={messages} {...other} />
      </IntlControlContext.Provider>
    );
  }
}
