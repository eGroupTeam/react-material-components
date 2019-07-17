import React from 'react';
import PropTypes from 'prop-types';
import useTheme from '@material-ui/core/styles/useTheme';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Position from '@e-group/material/Position';

const DataList = ({
  variant,
  serverSide,
  loading,
  isEmpty,
  hideListHeadDivider,
  columns,
  data: dataProp,
  renderColumn,
  renderDataRow,
  renderEmpty,
  to,
  defaultPage,
  defaultRowsPerPage,
  MuiTablePaginationProps,
  ...other
}) => {
  const theme = useTheme();
  const {
    page: pageProp,
    rowsPerPage: rowsPerPageProp,
    onChangePage,
    onChangeRowsPerPage,
    ...otherTablePaginationProps
  } = MuiTablePaginationProps || {};
  const [selfPage, setSelfPage] = React.useState(defaultPage);
  const [selfRowsPerPage, setSelfRowsPerPage] = React.useState(
    defaultRowsPerPage
  );
  const [data, setData] = React.useState(dataProp);
  const [order, setOrder] = React.useState('desc');
  const [orderIndex, setOrderIndex] = React.useState();

  // Define if user need control `page` and `rowsPerPage` attribute.
  const isPageControlled = typeof pageProp !== 'undefined';
  const isRowsPerPageControlled = typeof rowsPerPageProp !== 'undefined';
  const page = isPageControlled ? pageProp : selfPage;
  const rowsPerPage = isRowsPerPageControlled
    ? rowsPerPageProp
    : selfRowsPerPage;

  React.useEffect(() => {
    if (!isPageControlled && typeof to === 'number' && to >= 0) {
      setSelfPage(to);
    }
  }, [isPageControlled, to]);

  React.useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  function handleChangePage(event, newPage) {
    if (!isPageControlled) {
      setSelfPage(newPage);
    }
    // To solve when load data from server not sort it instantly.
    if (serverSide) {
      setOrderIndex();
    }
    if (onChangePage) {
      onChangePage(event, {
        page: newPage,
        rowsPerPage: rowsPerPage
      });
    }
  }

  function handleChangeRowsPerPage(event) {
    if (!isRowsPerPageControlled) {
      setSelfRowsPerPage(event.target.value);
    }
    // To solve when load data from server not sort it instantly.
    if (serverSide) {
      setOrderIndex();
    }
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(event, {
        page,
        rowsPerPage: event.target.value
      });
    }
  }

  const makeSortData = index => ({ asc, desc }) => {
    if (order === 'desc') {
      setOrder('asc');
      setData(asc(data));
    } else {
      setOrder('desc');
      setData(desc(data));
    }
    setOrderIndex(index);
  };

  const renderHead = () =>
    columns.map((rowData, index) =>
      renderColumn(rowData, index, {
        sortData: makeSortData(index),
        orderIndex,
        order
      })
    );

  const renderBody = () => {
    if (serverSide && loading) {
      return (
        <Position
          justifyContent="center"
          style={{ paddingTop: theme.spacing(5) }}
        >
          <CircularProgress />
        </Position>
      );
    }
    if (isEmpty) {
      if (renderEmpty) return renderEmpty();
      return <ListItem>Data not found.</ListItem>;
    }
    if (serverSide) {
      return data.map(renderDataRow);
    } else {
      return data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(renderDataRow);
    }
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

  if (variant === 'table') {
    return (
      <React.Fragment>
        <Table {...other}>
          <TableHead>{renderHead()}</TableHead>
          <TableBody>{renderBody()}</TableBody>
        </Table>
        {renderPagination()}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <List {...other}>
        {renderHead()}
        {!hideListHeadDivider && <Divider />}
        {renderBody()}
      </List>
      {renderPagination()}
    </React.Fragment>
  );
};

DataList.propTypes = {
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['list', 'table']).isRequired,
  /**
   * Columns is used to pass in renderColumn.
   */
  columns: PropTypes.array.isRequired,
  /**
   * Data is used to pass in renderDataRow.
   */
  data: PropTypes.array.isRequired,
  /**
   * Use columns prop to render columns you want.
   */
  renderColumn: PropTypes.func.isRequired,
  /**
   * Use data prop to render rows you want.
   */
  renderDataRow: PropTypes.func.isRequired,
  /**
   * Provide a function to customized empty state.
   */
  renderEmpty: PropTypes.func,
  /**
   * Set to choosed page and it's only work when `page` is not be controlled.
   */
  to: PropTypes.number,
  /**
   * Set default page and it's only work when `page` is not be controlled and `to` is not be provided.
   */
  defaultPage: PropTypes.number,
  /**
   * Set default rows per page and it's only work when `rowsPerPage` is not be controlled.
   */
  defaultRowsPerPage: PropTypes.number,
  /**
   * If `data` is get from server set this to true.
   */
  serverSide: PropTypes.bool,
  /**
   * Toggle `Loader` and this only work with `serverSide`.
   */
  loading: PropTypes.bool,
  /**
   * If `true` show empty state.
   */
  isEmpty: PropTypes.bool,
  /**
   * If `true` hide List Head Divider.
   */
  hideListHeadDivider: PropTypes.bool,
  /**
   * Mui TablePagination props.
   */
  MuiTablePaginationProps: PropTypes.object
};

DataList.defaultProps = {
  variant: 'list',
  defaultPage: 0,
  defaultRowsPerPage: 10,
  data: [],
  columns: [],
  renderColumn: () => {},
  renderDataRow: () => {}
};

export default DataList;
