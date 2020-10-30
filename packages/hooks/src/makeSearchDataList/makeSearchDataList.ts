import { useEffect } from 'react';
import makePayload from './makePayload';
import { Options } from './types';

export default function makeSearchDataList(options?: Options) {
  const {
    fromKey = 'from',
    sizeKey = 'size',
    queryKey = 'query',
    defaultValues = {
      [fromKey]: 0,
      [sizeKey]: 10,
    },
  } = options || {};

  const usePayload = makePayload(fromKey, sizeKey, queryKey, defaultValues);

  return function useSearchDataList({ fetchGet }) {
    const {
      handleSearchChange,
      handleSearchSubmit,
      handleChangePage,
      handleChangeRowsPerPage,
      payload,
      setPayload,
    } = usePayload();

    useEffect(() => {
      if (fetchGet) {
        fetchGet(payload);
      }
    }, [fetchGet, payload]);

    return {
      handleSearchChange,
      handleSearchSubmit,
      handleChangePage,
      handleChangeRowsPerPage,
      payload,
      setPayload,
    };
  };
}
