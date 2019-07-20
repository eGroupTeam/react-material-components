import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import ListItem from '@material-ui/core/ListItem';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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

const stories = storiesOf('DataList', module);

stories.addDecorator(withKnobs)

stories.add(
  'default',
  () => {
    const page = number('Page', 0);

    return (
      <DataList
        to={page}
        component="nav"
        serverSide={boolean('Server Side', false)}
        loading={boolean('Loading', false)}
        isEmpty={boolean('Empty', false)}
        renderEmpty={boolean('Customized Empty', false) ? () => <ListItem>Customized empty state.</ListItem> : undefined}
        hideListHeadDivider={boolean('HideListHeadDivider', false)}
        columns={columns}
        data={assignments}
        renderColumns={(
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
        }}
        renderDataRow={(rowData, index) => {
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
        }}
        defaultRowsPerPage={2}
        localization={{
          emptyMessage: '無資料'
        }}
        MuiTablePaginationProps={{
          count: assignments.length,
          rowsPerPageOptions: [2, 4, 6, 8],
          labelRowsPerPage: '每頁幾筆'
        }}
      />
    );
  },
  {
    info: {
      propTables: [DataList]
    }
  }
)

stories.add('variant table', () => {
  return (
    <DataList
      defaultPage={1}
      variant="table"
      serverSide={boolean('Server Side', false)}
      loading={boolean('Loading', false)}
      isEmpty={boolean('Empty', false)}
      renderEmpty={boolean('Customized Empty', false) ? () => <ListItem>Customized empty state.</ListItem> : undefined}
      columns={columns}
      data={assignments}
      renderColumns={(
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
      }}
      renderDataRow={(rowData, index) => {
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
      }}
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