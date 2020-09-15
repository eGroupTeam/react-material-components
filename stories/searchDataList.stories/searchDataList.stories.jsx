import React from 'react';
import { storiesOf } from '@storybook/react';
import SearchDataList from '@e-group/material-module/SearchDataList';

import { action } from '@storybook/addon-actions';

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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
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

const handleSubmit = (e) => {
  e.preventDefault();
  action('submit')(e);
};

const toolsbar = (
  <IconButton>
    <AddBoxIcon />
  </IconButton>
);

storiesOf('SearchDataList', module)
  .add(
    'default',
    () => {
      const Demo = () => {
        const [data, setData] = React.useState();

        React.useEffect(() => {
          setData(assignments);
        }, []);

        const renderColumns = (rowData, { orderIndex, order, sortData }) => {
          const onSortClick = () => {
            sortData({
              asc: (data) => data.sort((a, b) => b.id - a.id),
              desc: (data) => data.sort((a, b) => a.id - b.id),
            });
          };

          return (
            <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                  <StyledTableSortLabel
                    component="p"
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
        };

        const renderDataRow = (rowData, index) => (
          <ListItem button key={`list-item-${index}`}>
            <Grid container spacing={1}>
              <Grid item xs={1}>
                {rowData.id}
              </Grid>
              <Grid item xs={3}>
                {rowData.name}
              </Grid>
              <Grid item xs={2}>
                {rowData.calories}
              </Grid>
              <Grid item xs={2}>
                {rowData.fat}
              </Grid>
              <Grid item xs={2}>
                {rowData.carbs}
              </Grid>
              <Grid item xs={2}>
                {rowData.protein}
              </Grid>
            </Grid>
          </ListItem>
        );

        if (!data) {
          return <div />;
        }

        return (
          <SearchDataList
            title="Search List"
            style={{ minWidth: 750 }}
            onSubmit={handleSubmit}
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
            renderColumns={renderColumns}
            renderDataRow={renderDataRow}
            MuiTablePaginationProps={{
              count: data.length,
            }}
          />
        );
      };
      return <Demo />;
    },
    {
      info: {
        propTables: [SearchDataList],
      },
    }
  )
  .add(
    'variant table',
    () => (
      <SearchDataList
        title="Search List"
        style={{ minWidth: 750 }}
        variant="table"
        onSubmit={handleSubmit}
        toolsbar={toolsbar}
        columns={columns}
        data={assignments}
        renderColumns={(rowData, { orderIndex, order, sortData }) => {
          const onSortClick = () => {
            sortData({
              asc: (data) => data.sort((a, b) => b.id - a.id),
              desc: (data) => data.sort((a, b) => a.id - b.id),
            });
          };

          return (
            <TableRow>
              <TableCell>
                <StyledTableSortLabel
                  component="p"
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
        renderDataRow={(rowData, index) => (
          <TableRow hover key={`list-item-${index}`}>
            <TableCell>{rowData.id}</TableCell>
            <TableCell>{rowData.name}</TableCell>
            <TableCell>{rowData.calories}</TableCell>
            <TableCell>{rowData.fat}</TableCell>
            <TableCell>{rowData.carbs}</TableCell>
            <TableCell>{rowData.protein}</TableCell>
          </TableRow>
        )}
        MuiTablePaginationProps={{
          count: assignments.length,
        }}
      />
    ),
    {
      info: {
        propTables: [SearchDataList],
      },
    }
  );
