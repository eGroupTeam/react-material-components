import * as React from 'react';
import { ListProps } from '@material-ui/core/List';
import { TablePaginationProps } from '@material-ui/core/TablePagination';

export interface SortDataArgs {
  asc: (data: array) => void;
  desc: (data: array) => void;
}

export interface OrderArgs {
  orderIndex: number;
  order: string;
  sortData: (sortDataArgs: SortDataArgs) => void;
}

export interface DataListProps extends ListProps {
  /**
   * Columns is used to pass in renderColumn.
   */
  columns: array;
  /**
   * Data is used to pass in renderDataRow.
   */
  data: array;
  /**
   * Use columns prop to render columns you want.
   */
  renderColumn: (rowData: any, index: number, orderArgs: OrderArgs) => void;
  /**
   * Use data prop to render rows you want.
   */
  renderDataRow: (rowData: any, index: number) => void;
  /**
   * Provide a function to customized empty state.
   */
  renderEmpty?: () => void;
  /**
   * Set to choosed page and it's only work when page is self controlled.
   */
  to?: number;
  /**
   * Set default page and it's only work when `page` is not be controlled and `to` is not be provided.
   */
  defaultPage?: number;
  /**
   * Set default rows per page and it's only work when `rowsPerPage` is not be controlled.
   */
  defaultRowsPerPage?: number;
  /**
   * If data is get from server set this to true.
   */
  serverSide?: boolean;
  /**
   * Toggle `Loader` and this only work with `serverSide`.
   */
  loading?: boolean;
  /**
   * If `true` show empty state.
   */
  isEmpty?: boolean;
  /**
   * If `true` show Divider default is `true`.
   */
  showDivider?: boolean;
  /**
   * Mui TablePagination props
   */
  MuiTablePaginationProps?: TablePaginationProps;
}

declare const DataList: React.ComponentType<DataListProps>;

export default DataList;
