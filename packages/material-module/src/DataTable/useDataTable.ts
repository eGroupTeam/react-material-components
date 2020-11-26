import { useState } from 'react';
import { SortData } from './DataTable';

export type Payload = {
  [key: string]: any;
};

export type Options = {
  fromKey?: string;
  sizeKey?: string;
  queryKey?: string;
  defaultPayload?: Payload;
};

export default function useDataTable<RowData>(options: Options = {}) {
  const {
    fromKey = 'from',
    sizeKey = 'size',
    queryKey = 'query',
    defaultPayload = {
      [fromKey]: 0,
      [sizeKey]: 10,
    },
  } = options;
  const [payload, setPayload] = useState<Payload>(defaultPayload);

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

  const handleColumnSortData = (
    sortData: SortData,
    key: string,
    index: number
  ) => () => {
    sortData({
      activeOrderIndex: index,
      asc: (data) =>
        (data as RowData[]).sort((a, b) => {
          if (a[key] === b[key]) {
            return 0;
          }
          return b[key] > a[key] ? 1 : -1;
        }),
      desc: (data) =>
        (data as RowData[]).sort((a, b) => {
          if (a[key] === b[key]) {
            return 0;
          }
          return a[key] > b[key] ? 1 : -1;
        }),
    });
  };

  return {
    handleSearchChange,
    handleSearchSubmit,
    handleChangePage,
    handleChangeRowsPerPage,
    handleColumnSortData,
    payload,
    setPayload,
  };
}
