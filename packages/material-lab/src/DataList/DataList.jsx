import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import useTheme from '@material-ui/core/styles/useTheme';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import Position from '../../Position';

const DataList = ({
  serverSide,
  loading,
  isEmpty,
  showDivider,
  columns,
  data: dataProp,
  renderColumn,
  renderDataRow,
  renderEmpty,
  to,
  TablePaginationProps,
  ...other
}) => {
  const theme = useTheme();
  const {
    page: pageProp,
    rowsPerPage: rowsPerPageProp,
    onChangePage,
    onChangeRowsPerPage,
    ...otherTablePaginationProps
  } = TablePaginationProps || {};
  const [selfPage, setSelfPage] = React.useState(0);
  const [selfRowsPerPage, setSelfRowsPerPage] = React.useState(10);
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
    if (!isPageControlled && to >= 0) {
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

  return (
    <React.Fragment>
      <List {...other}>
        {columns.map((rowData, index) =>
          renderColumn(rowData, index, {
            sortData: makeSortData(index),
            orderIndex,
            order
          })
        )}
        {showDivider && <Divider />}
        {renderBody()}
      </List>
      <TablePagination
        component="div"
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        {...otherTablePaginationProps}
      />
    </React.Fragment>
  );
};

DataList.propTypes = {
  /**
   * Columns is used to pass in renderColumn.
   */
  columns: ImmutablePropTypes.list.isRequired,
  /**
   * Data is used to pass in renderDataRow.
   */
  data: ImmutablePropTypes.list.isRequired,
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
   * Set to choosed page and it's only work when page is self controlled.
   */
  to: PropTypes.number,
  /**
   * If data is get from server set this to true.
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
   * If `true` show Divider default is `true`.
   */
  showDivider: PropTypes.bool,
  /**
   * Mui TablePagination props.
   */
  TablePaginationProps: PropTypes.object
};

DataList.defaultProps = {
  showDivider: true
};

export default DataList;
