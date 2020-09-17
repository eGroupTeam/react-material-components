import React from 'react';

import queryString from 'query-string';

export default function useLocationSearch(location) {
  const search = React.useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);

  return search;
}
