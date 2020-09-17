import React from 'react';

export default function useTab(defaultValue = 0) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    setValue,
  };
}
