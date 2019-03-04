import React from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import Loader from '../Loader';

const DataTable = ({ options, loading, ...rest }) => {
  if (loading) return <Loader />;
  return (
    <MUIDataTable
      {...rest}
      options={{
        ...options
      }}
    />
  );
};

DataTable.propTypes = {
  // customized props
  loading: PropTypes.bool,
  // mui-datatables props
  ...MUIDataTable.propTypes
};

export default DataTable;
