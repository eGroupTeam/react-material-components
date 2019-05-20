import * as React from 'react';
import { List, Map } from 'immutable';
import { ListProps } from '@material-ui/core/List';
import { TablePaginationProps } from '@material-ui/core/TablePagination';

export interface SortDataArgs {
  asc: (data: List) => void;
  desc: (data: List) => void;
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
  columns: List;
  /**
   * Data is used to pass in renderDataRow.
   */
  data: List;
  /**
   * Use columns prop to render columns you want.
   */
  renderColumn: (rowData: Map, index: number, orderArgs: OrderArgs) => void;
  /**
   * Use data prop to render rows you want.
   */
  renderDataRow: (rowData: Map, index: number) => void;
  /**
   * Provide a function to customized empty state.
   */
  renderEmpty: () => void;
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
  TablePaginationProps?: TablePaginationProps;
}

declare const DataList: React.ComponentType<DataListProps>;

export default DataList;
