import React from 'react';
import PropTypes from 'prop-types';

import warning from 'warning';

import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const DataList = ({
  variant,
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
  defaultPage,
  defaultRowsPerPage,
  MuiTablePaginationProps,
  localization,
  ...other
}) => {
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

  // What's variant to use.
  const isTable = variant === 'table';

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

  const renderHead = () =>
    renderColumns(columns, {
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
      order
    });

  const renderBody = () => {
    if (serverSide && loading) {
      return renderLoading();
    }
    if (isEmpty) {
      return renderEmptyText();
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

  const renderLoading = () => {
    warning(
      !(loading && !serverSide),
      '[@e-group/material-lab]: DataList loading status is only work whit serverSide=`true`.'
    );
    if (isTable) {
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
    if (isTable) {
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

  if (isTable) {
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
   * Columns is used to pass in renderColumns.
   */
  columns: PropTypes.array.isRequired,
  /**
   * Data is used to pass in renderDataRow.
   */
  data: PropTypes.array.isRequired,
  /**
   * Use columns prop to render columns you want.
   */
  renderColumns: PropTypes.func.isRequired,
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
  MuiTablePaginationProps: PropTypes.object,
  /**
   * Use your own text to localize DataList.
   */
  localization: PropTypes.object
};

DataList.defaultProps = {
  variant: 'list',
  defaultPage: 0,
  defaultRowsPerPage: 10,
  data: [],
  columns: [],
  renderColumns: () => {},
  renderDataRow: () => {},
  localization: {
    emptyMessage: 'No records to display'
  }
};

export default DataList;
