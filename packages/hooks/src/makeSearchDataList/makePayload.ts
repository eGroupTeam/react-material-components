import { useState } from 'react';
import { DefaultValues } from './types';

export default function makePayload(
  fromKey: string,
  sizeKey: string,
  queryKey: string,
  defaultValues: DefaultValues
) {
  return function usePayload() {
    const [payload, setPayload] = useState({
      ...defaultValues,
    });

    const handleSearchChange = (e) => {
      const query = e.target.value;
      setPayload((value) => ({
        ...value,
        [queryKey]: query,
      }));
    };

    const handleSearchSubmit = (e) => {
      e.preventDefault();
      setPayload((value) => ({
        ...value,
        ...payload,
        [fromKey]: '0',
      }));
    };

    const handleChangePage = (event, { page, rowsPerPage }) => {
      const newPayload = {
        ...payload,
        [fromKey]: page * rowsPerPage,
      };
      setPayload(newPayload);
    };

    const handleChangeRowsPerPage = (event, { rowsPerPage }) => {
      const newPayload = {
        ...payload,
        [fromKey]: '0',
        [sizeKey]: rowsPerPage,
      };
      setPayload(newPayload);
    };

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
