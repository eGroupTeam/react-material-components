import React, { FC, useEffect, useState } from 'react';
import { Meta } from '@storybook/react';
import SearchDataList from '@e-group/material-module/SearchDataList';

import ListItem from '@material-ui/core/ListItem';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
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

const toolsbar = (
  <IconButton>
    <AddBoxIcon />
  </IconButton>
);

export default {
  title: 'Modules/SearchDataList',
  component: SearchDataList,
  argTypes: {
    to: { control: 'number', defaultValue: 0 },
    serverSide: { control: 'boolean', defaultValue: false },
    loading: { control: 'boolean', defaultValue: false },
    isEmpty: { control: 'boolean', defaultValue: false },
    hideListHeadDivider: { control: 'boolean', defaultValue: false },
    defaultRowsPerPage: { control: 'number', defaultValue: 2 },
    onSubmit: { action: 'submit!' },
  },
} as Meta;

export const Default: FC = (args) => {
  const [data, setData] = useState<Data[]>();

  useEffect(() => {
    setData(assignments);
  }, []);

  if (!data) {
    return <div />;
  }

  return (
    <SearchDataList
      title="Search List"
      style={{ minWidth: 750 }}
      SearchBarProps={{
        placeholder: 'Search...',
        renderOptions: ({ handleDropDownClose }) => (
          <Paper>
            <Box p={3}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={4}>
                  <Typography color="textSecondary">篩選身份</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Select value="all" fullWidth>
                    <MenuItem value="all">全部</MenuItem>
                    <MenuItem value="0">一般</MenuItem>
                    <MenuItem value="1">夥伴</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Box>
            <Box p={3} pt={0} textAlign="right">
              <Button
                type="submit"
                onClick={() => {
                  handleDropDownClose();
                }}
              >
                送出
              </Button>
            </Box>
          </Paper>
        ),
      }}
      toolsbar={toolsbar}
      columns={columns}
      data={data}
      renderColumns={(rowData, { orderIndex, order, sortData }) => {
        const onSortClick = () => {
          sortData({
            asc: (data) => (data as Data[]).sort((a, b) => b.id - a.id),
            desc: (data) => (data as Data[]).sort((a, b) => a.id - b.id),
          });
        };

        return (
          <ListItem>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                <StyledTableSortLabel
                  active={orderIndex === 0}
                  direction={order}
                  onClick={() => onSortClick()}
                >
                  {rowData[0]}
                </StyledTableSortLabel>
              </Grid>
              <Grid item xs={3}>
                <Typography color="textSecondary" variant="body2">
                  {rowData[1]}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData[2]}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData[3]}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData[4]}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData[5]}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        );
      }}
      renderDataRow={(rowData) => {
        const data = rowData as Data;
        return (
          <ListItem button key={data.id}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                {data.id}
              </Grid>
              <Grid item xs={3}>
                {data.name}
              </Grid>
              <Grid item xs={2}>
                {data.calories}
              </Grid>
              <Grid item xs={2}>
                {data.fat}
              </Grid>
              <Grid item xs={2}>
                {data.carbs}
              </Grid>
              <Grid item xs={2}>
                {data.protein}
              </Grid>
            </Grid>
          </ListItem>
        );
      }}
      MuiTablePaginationProps={{
        count: data.length,
      }}
      {...args}
    />
  );
};

export const VariantTable: FC = (args) => (
  <SearchDataList
    title="Search List"
    style={{ minWidth: 750 }}
    variant="table"
    toolsbar={toolsbar}
    columns={columns}
    data={assignments}
    renderColumns={(rowData, { orderIndex, order, sortData }) => {
      const onSortClick = () => {
        sortData({
          asc: (data) => (data as Data[]).sort((a, b) => b.id - a.id),
          desc: (data) => (data as Data[]).sort((a, b) => a.id - b.id),
        });
      };

      return (
        <TableRow>
          <TableCell>
            <StyledTableSortLabel
              active={orderIndex === 0}
              direction={order}
              onClick={() => onSortClick()}
            >
              {rowData[0]}
            </StyledTableSortLabel>
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
      const data = rowData as Data;
      return (
        <TableRow hover key={`list-item-${index}`}>
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
    }}
    {...args}
  />
);
