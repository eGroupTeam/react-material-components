import * as React from 'react';
import { ListProps } from '@material-ui/core/List';
import { TablePaginationProps } from '@material-ui/core/TablePagination';

export interface SortDataArgs {
  asc: (data: array) => void;
  desc: (data: array) => void;
  activeOrderIndex: unmber;
}

export interface OrderArgs {
  orderIndex: number;
  order: string;
  sortData: (sortDataArgs: SortDataArgs) => void;
}

export interface LocalizationArgs {
  emptyMessage: string;
}

export interface DataListProps extends ListProps {
  /**
   * The variant to use default is `list`.
   */
  variant: string;
  /**
   * Columns is used to pass in renderColumns.
   */
  columns: Array<any>;
  /**
   * Data is used to pass in renderDataRow.
   */
  data: Array<any>;
  /**
   * Use columns prop to render columns you want.
   */
  renderColumns: (rowData: any, orderArgs: OrderArgs) => void;
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
   * If `true` hide List Head Divider.
   */
  hideListHeadDivider?: boolean;
  /**
   * Mui TablePagination props
   */
  MuiTablePaginationProps?: TablePaginationProps;
  /**
   * Use your own text to localize DataList.
   */
  localization?: LocalizationArgs;
}

declare const DataList: React.ComponentType<DataListProps>;

export default DataList;
