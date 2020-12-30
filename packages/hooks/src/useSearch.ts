import { useMemo } from 'react';

import queryString from 'query-string';

export default function useSearch(searchStr: string) {
  const search = useMemo(() => queryString.parse(searchStr), [searchStr]);

  return search;
}
