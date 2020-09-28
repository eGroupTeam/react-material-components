import { useMemo } from 'react';

import queryString from 'query-string';

export default function useLocationSearch(location: Location) {
  const search = useMemo(() => queryString.parse(location.search), [
    location.search,
  ]);

  return search;
}
