import React from 'react';

/**
 * @ignore - internal component.
 */
const RadioInputGroupContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  RadioInputGroupContext.displayName = 'RadioInputGroupContext';
}

export default RadioInputGroupContext;
