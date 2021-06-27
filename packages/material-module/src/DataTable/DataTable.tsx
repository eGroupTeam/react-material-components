import React, {
  MouseEvent,
  ChangeEvent,
  FC,
  ReactNode,
  useEffect,
  useState,
} from 'react';

import warning from 'warning';

import TablePagination, {
  TablePaginationProps,
} from '@e-group/material/TablePagination';
import Typography, { TypographyProps } from '@e-group/material/Typography';
import {
  Checkbox,
  CircularProgress,
  createStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableProps,
  TableRow,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import useControlled from '@e-group/hooks/useControlled';
import SearchBar, { SearchBarProps } from '../SearchBar';
import DataTableContext, { DataTableContextProps, EachRowState } from './DataTableContext';

export interface SortDataArgs {
  asc: (data: unknown[]) => unknown[];
  desc: (data: unknown[]) => unknown[];
  activeOrderIndex?: number;
}

export type Order = 'desc' | 'asc';
export type SortData = (sortDataArgs: SortDataArgs) => void;
export interface OrderArgs {
  orderIndex?: number;
  order: Order;
  sortData: SortData;
  eachRowState?: DataTableContextProps["eachRowState"];
  setEachRowState?: DataTableContextProps["setEachRowState"];
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
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    values: Values
  ) => void;
}

export interface DataTableProps extends TableProps {
  /**
   * Data is used to pass in renderDataRow.
   */
  data?: unknown[];
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
   * Use your own text to localize DataTable.
   */
  localization?: LocalizationArgs;
  /**
   * Set minWidth when table need horizontal scroll.
   */
  minWidth?: number;
  /**
   * Set ture to enable check all in column.
   */
  enableCheckedAll?: boolean
  /**
   * Control Each row state.
   */
  eachRowState?: EachRowState;
  /**
   * default eachRowState
   */
  defaultEachRowState?: EachRowState;
  /**
   * Table header title.
   */
  title?: string;
  /**
   * Title TypographyProps
   */
  TitleTypographyProps?: TypographyProps;
  /**
   * Table header subTitle.
   */
  subTitle?: string;
  /**
   * SubTitle TypographyProps
   */
  SubTitleTypographyProps?: TypographyProps;
  /**
   * Search customer toolsbar.
   */
  toolsbar?: ReactNode;
  /**
   * SearchBar props.
   */
  SearchBarProps?: Omit<SearchBarProps, 'container'>;
}

const styles = (theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(1, 1.5),
    },
    tableCell: {
      
    },
    tableCellWithCheckBox: {
      width: '1%',
      whiteSpace: 'nowrap',
      textAlign: 'right'
    },
    toolsbar: {
      display: 'flex',
      alignItems: 'center',
    },
    main: {
      minWidth: (props: DataTableProps) => props.minWidth ?? 800,
    },
  });

const DataTable: FC<DataTableProps & WithStyles<typeof styles>> = (props) => {
  const {
    classes,
    className,
    serverSide,
    loading,
    isEmpty,
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
    title,
    TitleTypographyProps,
    subTitle,
    SubTitleTypographyProps,
    toolsbar,
    SearchBarProps,
    minWidth,
    enableCheckedAll,
    eachRowState: eachRowStateProp,
    defaultEachRowState = {},
    ...other
  } = props;

  const [selfPage, setSelfPage] = useState(defaultPage);
  const [selfRowsPerPage, setSelfRowsPerPage] = useState(defaultRowsPerPage);
  const [data, setData] = useState(dataProp || []);
  const [order, setOrder] = useState<Order>('desc');
  const [orderIndex, setOrderIndex] = useState<number>();
  const [eachRowState, setEachRowState] = useControlled({
    controlled: eachRowStateProp,
    default: defaultEachRowState,
  });

  // Define if user need control `page` and `rowsPerPage` attribute.
  const isPageControlled = pageProp !== undefined;
  const isRowsPerPageControlled = rowsPerPageProp !== undefined;
  const page = pageProp !== undefined ? pageProp : selfPage;
  const rowsPerPage =
    rowsPerPageProp !== undefined ? rowsPerPageProp : selfRowsPerPage;

  useEffect(() => {
    if (!isPageControlled && typeof to === 'number' && to >= 0) {
      setSelfPage(to);
    }
  }, [isPageControlled, to]);

  useEffect(() => {
    if (dataProp) {
      setData(dataProp);
    }
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
        eachRowState,
        setEachRowState,
      });
    }
    if (columns) {
      const isAllChecked = Object.values(eachRowState).filter(el => !el?.checked).length === 0
      return (
        <TableRow>
          {enableCheckedAll && (
            <TableCell className={clsx(classes.tableCell, classes.tableCellWithCheckBox)}>
              <Checkbox size="small" checked={isAllChecked} onChange={(_, checked) => {
                setEachRowState(val => {
                  const next = { ...val }
                  const keys = Object.keys(next)
                  for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    next[key] = {
                      ...next[key],
                      checked
                    }
                  }
                  return next
                })
              }}/>
            </TableCell>
          )}
          {columns.map((el) => (
            <TableCell className={classes.tableCell} key={el}>
              {el}
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return undefined;
  };

  const renderLoading = () => {
    warning(
      !(loading && !serverSide),
      '[@e-group/material-module]: DataTable loading status is only work whit serverSide=`true`.'
    );
    return (
      <TableRow style={{ height: 245 }}>
        <TableCell
          colSpan={columns ? columns.length : 1}
          style={{ textAlign: 'center' }}
        >
          <CircularProgress />
        </TableCell>
      </TableRow>
    );
  };

  const renderEmptyText = () => {
    if (renderEmpty) return renderEmpty();
    return (
      <TableRow style={{ height: 245 }}>
        <TableCell
          colSpan={columns ? columns.length : 1}
          style={{ textAlign: 'center' }}
        >
          {localization.emptyMessage}
        </TableCell>
      </TableRow>
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

  return (
    <>
      <div className={classes.header}>
        <Grid container alignItems="center">
          <Grid item>
            {title && (
              <Typography variant="h6" {...TitleTypographyProps}>
                {title}
              </Typography>
            )}
            {subTitle && (
              <Typography variant="body2" {...SubTitleTypographyProps}>
                {subTitle}
              </Typography>
            )}
          </Grid>
          <div style={{ flexGrow: 1 }} />
          <Grid item>
            <div className={classes.toolsbar}>
              {SearchBarProps && <SearchBar {...SearchBarProps} />}
              {toolsbar}
            </div>
          </Grid>
        </Grid>
      </div>
      <DataTableContext.Provider
        value={{
          eachRowState,
          setEachRowState,
        }}
      >
        <TableContainer>
          <Table
            className={clsx(className, classes.main)}
            {...(other as TableProps)}
          >
            <TableHead>{renderHead()}</TableHead>
            <TableBody>{renderBody()}</TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          page={page}
          rowsPerPage={rowsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          {...otherTablePaginationProps}
        />
      </DataTableContext.Provider>
    </>
  );
};

export default withStyles(styles)(DataTable);
