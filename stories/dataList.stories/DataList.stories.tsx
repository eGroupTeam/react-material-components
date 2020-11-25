import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import {
  Grid,
  ListItem,
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
} from '@material-ui/core';

import DataList from '@e-group/material-module/DataList';
import StyledTableSortLabel from '../components/StyledTableSortLabel';

type Data = {
  id: number;
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
};

let id = 0;
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  id += 1;
  return { id, name, calories, fat, carbs, protein } as Data;
}

const columns = [
  'id',
  'Dessert (100g serving)',
  'Calories',
  'Fat (g)',
  'Carbs (g)',
  'Protein (g)',
];

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
];

export default {
  title: 'Modules/DataList',
  component: DataList,
  argTypes: {
    to: { control: 'number', defaultValue: 0 },
    serverSide: { control: 'boolean', defaultValue: false },
    loading: { control: 'boolean', defaultValue: false },
    isEmpty: { control: 'boolean', defaultValue: false },
    hideListHeadDivider: { control: 'boolean', defaultValue: false },
    defaultRowsPerPage: { control: 'number', defaultValue: 2 },
    minWidth: { control: 'number', defaultValue: 800 },
  },
} as Meta;

export const Default: FC = (args) => (
  <DataList
    renderEmpty={() => <ListItem>Customized empty state.</ListItem>}
    columns={columns}
    data={assignments}
    renderColumns={(rowData, { orderIndex, order, sortData }) => {
      const onSortClick = (index: number) => () => {
        sortData({
          activeOrderIndex: index,
          asc: (data) => (data as Data[]).sort((a, b) => b.id - a.id),
          desc: (data) => (data as Data[]).sort((a, b) => a.id - b.id),
        });
      };

      return (
        <ListItem>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={1}>
              <StyledTableSortLabel
                active={orderIndex === 0}
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
      const data = rowData as Data;
      return (
        <ListItem button key={`list-item-${index}`}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={1}>
              {data.id}
            </Grid>
            <Grid item xs={12} sm={3}>
              {data.name}
            </Grid>
            <Grid item xs={12} sm={2}>
              {data.calories}
            </Grid>
            <Grid item xs={12} sm={2}>
              {data.fat}
            </Grid>
            <Grid item xs={12} sm={2}>
              {data.carbs}
            </Grid>
            <Grid item xs={12} sm={2}>
              {data.protein}
            </Grid>
          </Grid>
        </ListItem>
      );
    }}
    localization={{
      emptyMessage: '無資料',
    }}
    MuiTablePaginationProps={{
      count: assignments.length,
      rowsPerPageOptions: [2, 4, 6, 8],
      labelRowsPerPage: '每頁幾筆',
    }}
    {...args}
  />
);

export const VariantTable: FC = (args) => (
  <DataList
    defaultPage={1}
    variant="table"
    renderEmpty={() => <ListItem>Customized empty state.</ListItem>}
    columns={columns}
    data={assignments}
    renderColumns={(rowData, { orderIndex, order, sortData }) => {
      const onSortClick = (index: number) => () => {
        sortData({
          activeOrderIndex: index,
          asc: (data) => (data as Data[]).sort((a, b) => b.id - a.id),
          desc: (data) => (data as Data[]).sort((a, b) => a.id - b.id),
        });
      };

      return (
        <TableRow>
          <TableCell>
            <TableSortLabel
              active={orderIndex === 0}
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
    renderDataRow={(rowData) => {
      const data = rowData as Data;
      return (
        <TableRow key={data.id}>
          <TableCell>{data.id}</TableCell>
          <TableCell>{data.name}</TableCell>
          <TableCell>{data.calories}</TableCell>
          <TableCell>{data.fat}</TableCell>
          <TableCell>{data.carbs}</TableCell>
          <TableCell>{data.protein}</TableCell>
        </TableRow>
      );
    }}
    MuiTablePaginationProps={{
      count: assignments.length,
      labelRowsPerPage: '每頁幾筆',
    }}
    {...args}
  />
);
