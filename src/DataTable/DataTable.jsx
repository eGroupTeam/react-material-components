import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import MUIDataTable from 'mui-datatables';

import Loader from '../Loader';

const DataTable = ({ intl, options, loading, ...rest }) => {
  if (loading) {
    return <Loader />;
  }
  return (
    <MUIDataTable
      {...rest}
      options={{
        textLabels: intl.messages.dataTable,
        ...options
      }}
    />
  );
};

DataTable.propTypes = {
  // react-intl props
  intl: intlShape.isRequired,
  // customized props
  loading: PropTypes.bool,
  // mui-datatables props
  columns: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        options: PropTypes.shape({
          /** Display column in table.
           * enum('true', 'false', 'excluded') */
          display: PropTypes.string,
          /** Filter value list
           * Example(https://github.com/gregnb/mui-datatables/blob/master/examples/column-filters/index.js) */
          filterList: PropTypes.array,
          /** Filter options
           * Example(https://github.com/gregnb/mui-datatables/blob/master/examples/column-filters/index.js) */
          filterOptions: PropTypes.array,
          /** Display column in filter list */
          filter: PropTypes.bool,
          /** Enable/disable sorting on column */
          sort: PropTypes.bool,
          /** Display column in CSV download file */
          download: PropTypes.bool,
          /** Display hint icon with string as tooltip on hover. */
          hint: PropTypes.string,
          /** Function that returns a string or React component.
           * Used as display for column header.
           * function(value, tableMeta, updateValue) => string| */
          customHeadRender: PropTypes.func,
          /** Function that returns a string or React component.
           * Used as display data within all table cells of a given column.
           * function(value, tableMeta, updateValue) => string|React Component
           * Example(https://github.com/gregnb/mui-datatables/blob/master/examples/component/index.js) */
          customBodyRender: PropTypes.func,
          /**
           * Is called for each cell and allows to return custom props for this cell based on its data.
           * function(cellValue: string, rowIndex: number, columnIndex: number) => string
           */
          setCellProps: PropTypes.func
        })
      }),
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  ),
  options: PropTypes.shape({
    /** User provided starting page for pagination */
    page: PropTypes.number,
    /** User provided override for total number of rows */
    count: PropTypes.number,
    /** Enable remote data source */
    serverSide: PropTypes.bool,
    /** User provided selected rows */
    rowsSelected: PropTypes.array,
    /** Choice of filtering view.
     * Options are "checkbox", "dropdown", "multiselect" or "textField" */
    filterType: PropTypes.string,
    /** User provided labels to localize text */
    textLabels: PropTypes.object,
    /** Enable/disable pagination */
    pagination: PropTypes.bool,
    /** Enable/disable row selection */
    selectableRows: PropTypes.bool,
    /** Enable/disable selection on certain rows with custom function.
     * Returns true if not provided.
     * function(dataIndex) => bool */
    isRowSelectable: PropTypes.func,
    /** Enable/disable resizable columns */
    resizableColumns: PropTypes.bool,
    /** Enable/disable expandable rows */
    expandableRows: PropTypes.bool,
    /** Render expandable row.
     * function(rowData, rowMeta) => React Component */
    renderExpandableRow: PropTypes.func,
    /** Render a custom toolbar */
    customToolbar: PropTypes.func,
    /** Render a custom selected rows toolbar.
     * function(selectedRows, displayData, setSelectedRows) => void */
    customToolbarSelect: PropTypes.func,
    /** Render a custom table footer.
     * function(count, page, rowsPerPage, changeRowsPerPage, changePage) => string|React Component */
    customFooter: PropTypes.func,
    /** Override default sorting with custom function.
     * function(data: array, colIndex: number, order: string) => array */
    customSort: PropTypes.func,
    /** Shadow depth applied to Paper component */
    elevation: PropTypes.number,
    /** Enable/disable case sensitivity for search */
    caseSensitive: PropTypes.bool,
    /** Enable/disable responsive table views.
     * Options: 'stacked', 'scroll' */
    responsive: PropTypes.string,
    /** Number of rows allowed per page */
    rowsPerPage: PropTypes.number,
    /** Options to provide in pagination for number of rows a user can select */
    rowsPerPageOptions: PropTypes.array,
    /** Enable/disable hover style over rows */
    rowHover: PropTypes.bool,
    /** Enable/disable fixed header columns */
    fixedHeader: PropTypes.bool,
    /** Enable/disable alphanumeric sorting of filter lists */
    sortFilterList: PropTypes.bool,
    /** Enable/disable sort on all columns */
    sort: PropTypes.bool,
    /** Show/hide filter icon from toolbar */
    filter: PropTypes.bool,
    /** Show/hide search icon from toolbar */
    search: PropTypes.bool,
    /** Show/hide print	icon from toolbar */
    print: PropTypes.bool,
    /** Show/hide download icon from toolbar */
    download: PropTypes.bool,
    /** Options to change the output of the CSV file.
     * Default options: {filename: 'tableDownload.csv', separator: ','} */
    downloadOptions: PropTypes.object,
    /** Show/hide viewColumns icon from toolbar */
    viewColumns: PropTypes.bool,
    /** Callback function that triggers when row(s) are selected.
     * function(currentRowsSelected: array, allRowsSelected: array) => void */
    onRowsSelect: PropTypes.func,
    /** Callback function that triggers when row(s) are deleted.
     * function(rowsDeleted: array) => void */
    onRowsDelete: PropTypes.func,
    /** Callback function that triggers when a row is clicked.
     * function(rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => void */
    onRowClick: PropTypes.func,
    /** Callback function that triggers when a cell is clicked.
     * function(colData: any, cellMeta: { colIndex: number, rowIndex: number }) => void */
    onCellClick: PropTypes.func,
    /** Callback function that triggers when a page has changed.
     * function(currentPage: number) => void */
    onChangePage: PropTypes.func,
    /** Callback function that triggers when the number of rows per page has changed.
     * function(numberOfRows: number) => void */
    onChangeRowsPerPage: PropTypes.func,
    /** Callback function that triggers when the search text value has changed.
     * function(searchText: string) => void */
    onSearchChange: PropTypes.func,
    /** Callback function that triggers when the searchbox opens.
     * function() => void */
    onSearchOpen: PropTypes.func,
    /** Callback function that triggers when filters have changed.
     * function(changedColumn: string, filterList: array) => void */
    onFilterChange: PropTypes.func,
    /** Callback function that triggers when a column has been sorted.
     * function(changedColumn: string, direction: string) => void */
    onColumnSortChange: PropTypes.func,
    /** Callback function that triggers when a column view has been changed.
     * function(changedColumn: string, action: string) => void */
    onColumnViewChange: PropTypes.func,
    /** Callback function that triggers when table state has changed.
     * function(action: string, tableState: object) => void */
    onTableChange: PropTypes.func,
    /** Is called for each row and allows to return custom props for this row based on its data.
     * function(row: array, rowIndex: number) => object */
    setRowProps: PropTypes.func
  })
};

export default injectIntl(DataTable);
