import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';

import {
  TableCell,
  TableRow,
  TableSortLabel,
  Typography,
  Button,
  MenuItem,
  TextField,
  Paper,
  withStyles
} from '@material-ui/core';

import DataTable, {
  useDataTable,
  DataTableProps,
  EachRowState
} from '@e-group/material-module/DataTable';
import SearchBarOptionsWidget from '@e-group/material-module/SearchBarOptionsWidget';
import DataTableCollapseRow from '@e-group/material-module/DataTableCollapseRow';
import DataTableRowCheckbox from '@e-group/material-module/DataTableRowCheckbox';
import { DefaultPayload } from '@e-group/material-module/DataTable/useDataTable';

type RowData = {
  id: number;
  name?: string;
  calories?: number;
  fat?: number;
  carbs?: number;
  protein?: number;
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
  return { id, name, calories, fat, carbs, protein } as RowData;
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
  title: 'Modules/DataTable',
  component: DataTable,
  argTypes: {
    to: { control: 'number', defaultValue: 0 },
    serverSide: { control: 'boolean', defaultValue: false },
    loading: { control: 'boolean', defaultValue: false },
    isEmpty: { control: 'boolean', defaultValue: false },
    defaultRowsPerPage: { control: 'number', defaultValue: 2 },
    defaultPage: { control: 'number', defaultValue: 1 },
    minWidth: { control: 'number', defaultValue: 800 },
  },
} as Meta;

interface MyDefaultPayload extends Omit<DefaultPayload, 'from'> {
  startIndex?: number;
}

export const Default: Story<DataTableProps> = ({
  data,
  renderDataRow,
  MuiTablePaginationProps,
  ...args
}) => {
  const {
    handleSearchChange,
    handleColumnSortData,
    handleChangePage,
    handleChangeRowsPerPage,
    payload,
    setPayload,
    page,
    rowsPerPage,
  } = useDataTable<{
    from: number;
    size: number
  }, MyDefaultPayload>(
    'myTableKey',
    {
      from: args.defaultPage ?? 0,
      size: args.defaultRowsPerPage ?? 10,
    },
    {
      fromKey: 'startIndex',
    }
  );

  const handleChange = (name: string) => (e) => {
    setPayload((payload) => ({
      ...payload,
      from: 0,
      [name]: e.target.value,
    }));
  };

  return (
    <>
      {JSON.stringify(payload)}
      <DataTable
        title="測試列表"
        columns={columns}
        data={assignments}
        SearchBarProps={{
          placeholder: 'Search',
          onChange: handleSearchChange,
          defaultValue: payload.query,
          renderOptions: ({ handleDropDownClose }) => (
            <SearchBarOptionsWidget>
              <>
                <TextField
                  label="Roles"
                  select
                  fullWidth
                  onChange={handleChange('role')}
                >
                  <MenuItem value="role1">role1</MenuItem>
                  <MenuItem value="role2">role2</MenuItem>
                  <MenuItem value="role3">role3</MenuItem>
                </TextField>
                <TextField
                  label="Permissions"
                  select
                  fullWidth
                  onChange={handleChange('permission')}
                >
                  <MenuItem value="permission1">permission1</MenuItem>
                  <MenuItem value="permission2">permission2</MenuItem>
                  <MenuItem value="permission3">permission3</MenuItem>
                </TextField>
              </>
              <>
                <Button
                  onClick={() =>
                    setPayload({
                      from: 0,
                      size: 2,
                    })
                  }
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={handleDropDownClose}
                >
                  Close
                </Button>
              </>
            </SearchBarOptionsWidget>
          ),
        }}
        renderColumns={(rowData, { orderIndex, order, sortData }) => (
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderIndex === 0}
                  direction={order}
                  onClick={handleColumnSortData(sortData, 'id', 0)}
                >
                  {rowData[0]}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderIndex === 0}
                  direction={order}
                  onClick={handleColumnSortData(sortData, 'name', 0)}
                >
                  {rowData[1]}
                </TableSortLabel>
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
          )}
        renderDataRow={(rowData) => {
          const data = rowData as RowData;
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
          page,
          rowsPerPage,
          rowsPerPageOptions: [2, 4, 6, 8],
          onChangePage: handleChangePage,
          onChangeRowsPerPage: handleChangeRowsPerPage,
        }}
        localization={{
          emptyMessage: '無資料',
        }}
        {...args}
      />
    </>
  );
};

export const WithCollapseAndCheckboxRow: Story<DataTableProps> = ({
  data,
  renderDataRow,
  MuiTablePaginationProps,
  ...args
}) => {
  const [eachRowState, setEachRowState] = useState<EachRowState>({})
  return (
    <>
      SelectedIds: {JSON.stringify(eachRowState)}
      <DataTable
        columns={columns}
        data={assignments}
        size="small"
        enableCheckedAll
        renderDataRow={(rowData) => {
          const data = rowData as RowData;
          return (
            <DataTableCollapseRow
              key={data.id}
              colSpan={6}
              startActions={
                <DataTableRowCheckbox dataId={data.id} size="small" onEachRowStateChange={(eachRowState) => {
                  setEachRowState(eachRowState)
                }}/>
              }
              selected={eachRowState[data.id]?.checked}
            >
              <>
                <TableCell>{data.id}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>{data.calories}</TableCell>
                <TableCell>{data.fat}</TableCell>
                <TableCell>{data.carbs}</TableCell>
                <TableCell>{data.protein}</TableCell>
              </>
              <>
                An example of a table with expandable rows, revealing more
                information. It utilizes the Collapse component.
              </>
            </DataTableCollapseRow>
          );
        }}
        MuiTablePaginationProps={{
          count: assignments.length,
          labelRowsPerPage: '每頁幾筆',
          rowsPerPageOptions: [2, 4, 6, 8],
        }}
        {...args}
      />
      Or Without Collpase
      <DataTable
        columns={columns}
        data={assignments}
        size="small"
        enableCheckedAll
        renderDataRow={(rowData) => {
          const data = rowData as RowData;
          return (
            <TableRow key={data.id}>
              <TableCell>
                <DataTableRowCheckbox dataId={data.id} size="small"/>
              </TableCell>
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
          rowsPerPageOptions: [2, 4, 6, 8],
        }}
        {...args}
      />
    </>
  )
};

const StyledDataTable = withStyles((theme) => ({
  header: {
    padding: theme.spacing(2, 2.5),
  },
  tableCell: {
    padding: theme.spacing(2, 2.5),
  },
}))(DataTable);

const StyledTableCell = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2, 2.5),
  },
}))(TableCell);

export const WithCustomStyle: Story<DataTableProps> = ({
  data,
  renderDataRow,
  MuiTablePaginationProps,
  ...args
}) => {
  const {
    handleSearchChange,
    handleChangePage,
    handleChangeRowsPerPage,
    payload,
    setPayload,
    page,
    rowsPerPage,
  } = useDataTable<{
    from: number;
    size: number
  }, MyDefaultPayload>(
    'myTableKey',
    {
      from: args.defaultPage ?? 0,
      size: args.defaultRowsPerPage ?? 10,
    },
    {
      fromKey: 'startIndex',
    }
  );

  const handleChange = (name: string) => (e) => {
    setPayload((payload) => ({
      ...payload,
      from: 0,
      [name]: e.target.value,
    }));
  };

  return (
    <>
      {JSON.stringify(payload)}
      <Paper>
        <StyledDataTable
          title="Unit member"
          subTitle="You can manage the members of your organization, and you can collaborate as long as you invite them."
          TitleTypographyProps={{
            variant: 'h5',
          }}
          columns={columns}
          data={assignments}
          SearchBarProps={{
            placeholder: 'Search',
            onChange: handleSearchChange,
            defaultValue: payload.query,
            variant: 'outlined',
            rounded: true,
            renderOptions: ({ handleDropDownClose }) => (
              <SearchBarOptionsWidget>
                <>
                  <TextField
                    label="Roles"
                    select
                    fullWidth
                    onChange={handleChange('role')}
                  >
                    <MenuItem value="role1">role1</MenuItem>
                    <MenuItem value="role2">role2</MenuItem>
                    <MenuItem value="role3">role3</MenuItem>
                  </TextField>
                  <TextField
                    label="Permissions"
                    select
                    fullWidth
                    onChange={handleChange('permission')}
                  >
                    <MenuItem value="permission1">permission1</MenuItem>
                    <MenuItem value="permission2">permission2</MenuItem>
                    <MenuItem value="permission3">permission3</MenuItem>
                  </TextField>
                </>
                <>
                  <Button
                    onClick={() =>
                      setPayload({
                        from: 0,
                        size: 2,
                      })
                    }
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleDropDownClose}
                  >
                    Close
                  </Button>
                </>
              </SearchBarOptionsWidget>
            ),
          }}
          renderDataRow={(rowData) => {
            const data = rowData as RowData;
            return (
              <TableRow key={data.id}>
                <StyledTableCell>{data.id}</StyledTableCell>
                <StyledTableCell>{data.name}</StyledTableCell>
                <StyledTableCell>{data.calories}</StyledTableCell>
                <StyledTableCell>{data.fat}</StyledTableCell>
                <StyledTableCell>{data.carbs}</StyledTableCell>
                <StyledTableCell>{data.protein}</StyledTableCell>
              </TableRow>
            );
          }}
          MuiTablePaginationProps={{
            count: assignments.length,
            labelRowsPerPage: '每頁幾筆',
            page,
            rowsPerPage,
            rowsPerPageOptions: [2, 4, 6, 8],
            onChangePage: handleChangePage,
            onChangeRowsPerPage: handleChangeRowsPerPage,
          }}
          localization={{
            emptyMessage: '無資料',
          }}
          {...args}
        />
      </Paper>
    </>
  );
};
