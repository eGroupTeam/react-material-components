import React from 'react';
import { storiesOf } from '@storybook/react';

import ListItem from '@material-ui/core/ListItem';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import StyledTableSortLabel from './components/StyledTableSortLabel';
import DataList from '@e-group/material-module/DataList';

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const assignments = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
]
        
const columns = [
  'id',
  'Dessert (100g serving)',
  'Calories',
  'Fat (g)',
  'Carbs (g)',
  'Protein (g)'
]

storiesOf('DataList', module)
  .add(
    'default',
    () => {
      const Demo = () => {
        const [page, setPage] = React.useState(0);

        const renderColumns = (
          rowData,
          { orderIndex, order, sortData }
        ) => {
          const onSortClick = index => () => {
            sortData({
              activeOrderIndex: index,
              asc: data => data.sort((a, b) => b.id - a.id),
              desc: data => data.sort((a, b) => a.id - b.id)
            });
          };

          return (
            <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={1}>
                  <StyledTableSortLabel
                    component="p"
                    active={0 === orderIndex ? true : false}
                    direction={order}
                    onClick={onSortClick(0)}
                  >
                    {rowData[0]}
                  </StyledTableSortLabel>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[1]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[2]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[3]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[4]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[5]}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        };

        const renderDataRow = (rowData, index) => {
          return (
            <ListItem button key={`list-item-${index}`}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={1}>
                  {rowData.id}
                </Grid>
                <Grid item xs={12} sm={3}>
                  {rowData.name}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.calories}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.fat}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.carbs}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.protein}
                </Grid>
              </Grid>
            </ListItem>
          );
        };

        return (
          <React.Fragment>
            <Typography variant="h5">default</Typography>
            <TextField
              label="Change Page"
              type="number"
              value={page}
              onChange={e => setPage(parseInt(e.target.value))}
            />
            <DataList
              to={page}
              component="nav"
              disablePadding
              columns={columns}
              data={assignments}
              hideListHeadDivider
              renderColumns={renderColumns}
              renderDataRow={renderDataRow}
              defaultRowsPerPage={2}
              MuiTablePaginationProps={{
                count: assignments.length,
                rowsPerPageOptions: [2, 4, 6, 8],
                labelRowsPerPage: '每頁幾筆'
              }}
            />
            <Typography variant="h5">with loading</Typography>
            <DataList
              component="nav"
              disablePadding
              serverSide
              loading
              columns={columns}
              data={assignments}
              renderColumns={renderColumns}
              renderDataRow={renderDataRow}
              MuiTablePaginationProps={{
                count: 0,
                labelRowsPerPage: '每頁幾筆'
              }}
            />
            <Typography variant="h5">with empty state</Typography>
            <DataList
              component="nav"
              disablePadding
              columns={columns}
              data={assignments}
              isEmpty
              renderColumns={renderColumns}
              renderDataRow={renderDataRow}
              localization={{
                emptyMessage: '無資料'
              }}
              // renderEmpty={() => <ListItem>Customized empty state.</ListItem>}
              MuiTablePaginationProps={{
                count: 0,
                labelRowsPerPage: '每頁幾筆'
              }}
            />
          </React.Fragment>
        );
      };
      return <Demo />;
    },
    {
      info: {
        propTables: [DataList]
      }
    }
  )
  .add('variant table', () => {
    const renderColumn = (
      rowData,
      { orderIndex, order, sortData }
    ) => {
      const onSortClick = index => () => {
        sortData({
          activeOrderIndex: index,
          asc: data => data.sort((a, b) => b.id - a.id),
          desc: data => data.sort((a, b) => a.id - b.id)
        });
      };

      return (
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={0 === orderIndex ? true : false}
              direction={order}
              onClick={onSortClick(0)}
            >
              {rowData[0]}
            </TableSortLabel>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="body2">
              {rowData[1]}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="body2">
              {rowData[2]}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="body2">
              {rowData[3]}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="body2">
              {rowData[4]}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography color="textSecondary" variant="body2">
              {rowData[5]}
            </Typography>
          </TableCell>
        </TableRow>
      );
    };

    const renderRow = (rowData, index) => {
      return (
        <TableRow key={`table-item-${index}`}>
          <TableCell>
            {rowData.id}
          </TableCell>
          <TableCell>
            {rowData.name}
          </TableCell>
          <TableCell>
            {rowData.calories}
          </TableCell>
          <TableCell>
            {rowData.fat}
          </TableCell>
          <TableCell>
            {rowData.carbs}
          </TableCell>
          <TableCell>
            {rowData.protein}
          </TableCell>
        </TableRow>
      );
    };
    
    return (<DataList
      variant="table"
      columns={columns}
      data={assignments}
      renderColumns={renderColumn}
      renderDataRow={renderRow}
      defaultPage={1}
      MuiTablePaginationProps={{
        count: assignments.length,
        labelRowsPerPage: '每頁幾筆'
      }}
    />);
  }, {
    info: {
      propTables: [DataList]
    }
  })