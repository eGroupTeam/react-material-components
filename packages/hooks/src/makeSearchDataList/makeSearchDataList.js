import React from 'react';
import makePayload from './makePayload';

export default function makeSearchDataList(options) {
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
      formPayload,
      setFormPayload,
    } = usePayload();

    React.useEffect(() => {
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
      formPayload,
      setFormPayload,
    };
  };
}
