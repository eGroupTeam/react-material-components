import React, { useState } from 'react';
import MuiDataTable from 'mui-datatables';

const DataTable = ({ options, ...other }) => {
  const { onTableChange, ...otherOptions } = options || {};
  // TODO: Fixed bug https://github.com/gregnb/mui-datatables/issues/267.
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleTableChange = (action, tableState) => {
    if (action === 'changeRowsPerPage') {
      setRowsPerPage(tableState.rowsPerPage);
    }
    if (onTableChange) {
      onTableChange(action, tableState);
    }
  };

  return (
    <MuiDataTable
      options={{
        onTableChange: handleTableChange,
        rowsPerPage,
        ...otherOptions
      }}
      {...other}
    />
  );
};

export default DataTable;
