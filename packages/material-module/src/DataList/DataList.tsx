import React, {
  MouseEvent,
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import warning from 'warning';

import {
  CircularProgress,
  createStyles,
  Divider,
  List,
  ListItem,
  ListProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TablePaginationProps,
  TableProps,
  TableRow,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';

export interface SortDataArgs {
  asc: (data: unknown[]) => unknown[];
  desc: (data: unknown[]) => unknown[];
  activeOrderIndex?: number;
}

export type Order = 'desc' | 'asc';
export interface OrderArgs {
  orderIndex?: number;
  order: Order;
  sortData: (sortDataArgs: SortDataArgs) => void;
}

export interface LocalizationArgs {
  emptyMessage: string;
}

type Values = {
  page: number;
  rowsPerPage: number;
};

export interface MuiTablePaginationProps
  extends Omit<
    TablePaginationProps,
    'ref' | 'page' | 'rowsPerPage' | 'onChangePage' | 'onChangeRowsPerPage'
  > {
  page?: number;
  rowsPerPage?: number;
  onChangePage?: (
    event: MouseEvent<HTMLButtonElement> | null,
    values: Values
  ) => void;
  onChangeRowsPerPage?: (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    values: Values
  ) => void;
}

export interface BaseDataListProps {
  /**
   * Data is used to pass in renderDataRow.
   */
  data: unknown[];
  /**
   * Use data prop to render rows you want.
   */
  renderDataRow: (rowData: unknown, index: number) => ReactNode;
  /**
   * Mui TablePagination props.
   */
  MuiTablePaginationProps: MuiTablePaginationProps;
  /**
   * Columns is used to pass in renderColumns.
   */
  columns?: string[];
  /**
   * Use columns prop to render columns you want.
   */
  renderColumns?: (columns: string[], orderArgs: OrderArgs) => ReactNode;
  /**
   * Provide a function to customized empty state.
   */
  renderEmpty?: () => ReactNode;
  /**
   * Set to choosed page and it's only work when `page` is not be controlled.
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
   * If `data` is get from server set this to true.
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
   * Use your own text to localize DataList.
   */
  localization?: LocalizationArgs;
  /**
   * Set minWidth when table need horizontal scroll.
   */
  minWidth?: number;
}

export interface VariantListProps extends BaseDataListProps, ListProps {
  /**
   * The variant to use.
   */
  variant: 'list';
}

export interface VariantTableProps extends BaseDataListProps, TableProps {
  /**
   * The variant to use.
   */
  variant?: 'table';
}

export type DataListProps = VariantListProps | VariantTableProps;

const styles = () =>
  createStyles({
    main: {
      minWidth: (props: DataListProps) => props.minWidth ?? 800,
    },
  });

const DataList: FC<DataListProps & WithStyles<typeof styles>> = (props) => {
  const {
    classes,
    className,
    variant = 'list',
    serverSide,
    loading,
    isEmpty,
    hideListHeadDivider,
    columns,
    data: dataProp,
    renderColumns,
    renderDataRow,
    renderEmpty,
    to,
    defaultPage = 0,
    defaultRowsPerPage = 10,
    MuiTablePaginationProps: {
      page: pageProp,
      rowsPerPage: rowsPerPageProp,
      onChangePage,
      onChangeRowsPerPage,
      ...otherTablePaginationProps
    },
    localization = {
      emptyMessage: 'No records to display',
    },
    ...other
  } = props;

  const [selfPage, setSelfPage] = useState(defaultPage);
  const [selfRowsPerPage, setSelfRowsPerPage] = useState(defaultRowsPerPage);
  const [data, setData] = useState(dataProp);
  const [order, setOrder] = useState<Order>('desc');
  const [orderIndex, setOrderIndex] = useState<number>();

  // Define if user need control `page` and `rowsPerPage` attribute.
  const isPageControlled = pageProp !== undefined;
  const isRowsPerPageControlled = rowsPerPageProp !== undefined;
  const page = pageProp !== undefined ? pageProp : selfPage;
  const rowsPerPage =
    rowsPerPageProp !== undefined ? rowsPerPageProp : selfRowsPerPage;

  // What's variant to use.
  const isTable = variant === 'table';

  useEffect(() => {
    if (!isPageControlled && typeof to === 'number' && to >= 0) {
      setSelfPage(to);
    }
  }, [isPageControlled, to]);

  useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  const handleChangePage: TablePaginationProps['onChangePage'] = (
    event,
    newPage
  ) => {
    if (!isPageControlled) {
      setSelfPage(newPage);
    }
    // To solve when load data from server not sort it instantly.
    if (serverSide) {
      setOrderIndex(undefined);
    }
    if (onChangePage) {
      onChangePage(event, {
        page: newPage,
        rowsPerPage,
      });
    }
  };

  const handleChangeRowsPerPage: TablePaginationProps['onChangeRowsPerPage'] = (
    event
  ) => {
    if (!isRowsPerPageControlled) {
      setSelfRowsPerPage(Number(event.target.value));
    }
    // To solve when load data from server not sort it instantly.
    if (serverSide) {
      setOrderIndex(undefined);
    }
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(event, {
        page,
        rowsPerPage: Number(event.target.value),
      });
    }
  };

  const renderHead = () => {
    if (renderColumns && columns) {
      return renderColumns(columns, {
        sortData: ({ activeOrderIndex, asc, desc }) => {
          if (order === 'desc') {
            setOrder('asc');
            setData(asc(data));
          } else {
            setOrder('desc');
            setData(desc(data));
          }
          setOrderIndex(activeOrderIndex);
        },
        orderIndex,
        order,
      });
    }
    return undefined;
  };

  const renderLoading = () => {
    warning(
      !(loading && !serverSide),
      '[@e-group/material-module]: DataList loading status is only work whit serverSide=`true`.'
    );
    if (isTable && columns) {
      return (
        <TableRow style={{ height: 245 }}>
          <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
            <CircularProgress />
          </TableCell>
        </TableRow>
      );
    }
    return (
      <ListItem style={{ height: 245, justifyContent: 'center' }}>
        <CircularProgress />
      </ListItem>
    );
  };

  const renderEmptyText = () => {
    if (renderEmpty) return renderEmpty();
    if (isTable && columns) {
      return (
        <TableRow style={{ height: 245 }}>
          <TableCell colSpan={columns.length} style={{ textAlign: 'center' }}>
            {localization.emptyMessage}
          </TableCell>
        </TableRow>
      );
    }
    return (
      <ListItem style={{ height: 245, justifyContent: 'center' }}>
        <Typography variant="body2">{localization.emptyMessage}</Typography>
      </ListItem>
    );
  };

  const renderBody = () => {
    if (serverSide && loading) {
      return renderLoading();
    }
    if (isEmpty) {
      return renderEmptyText();
    }
    if (serverSide) {
      return data.map(renderDataRow);
    }
    return data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map(renderDataRow);
  };

  const renderPagination = () => (
    <TablePagination
      component="div"
      page={page}
      rowsPerPage={rowsPerPage}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      {...otherTablePaginationProps}
    />
  );

  if (isTable) {
    return (
      <>
        <TableContainer>
          <Table
            className={clsx(className, classes.main)}
            {...(other as TableProps)}
          >
            <TableHead>{renderHead()}</TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>
        {renderPagination()}
      </>
    );
  }

  console.error(
    '[@e-group/material-module]: DataList has been deprecated please use Data Table instead.'
  );

  return (
    <>
      <TableContainer>
        <List
          className={clsx(className, classes.main)}
          {...(other as ListProps)}
        >
          {renderHead()}
          {!hideListHeadDivider && <Divider />}
          {renderBody()}
        </List>
      </TableContainer>
      {renderPagination()}
    </>
  );
};

export default withStyles(styles)(DataList);
