import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fromJS } from 'immutable';

import StoryRouter from 'storybook-react-router';
import { MenuItem, ListItem, Grid, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '../src/Button';
import StyledTableSortLabel from './components/StyledTableSortLabel';
import Breadcrumbs from '../src/lab/Breadcrumbs';
import ButtonMenu from '../src/lab/ButtonMenu';
import DataList from '../src/lab/DataList';

storiesOf('Lab', module)
  .addDecorator(StoryRouter())
  .add(
    'Breadcrumbs',
    () => (
      <Breadcrumbs
        routes={[
          {
            path: '/',
            exact: true,
            breadcrumbName: '首頁'
          },
          {
            path: '/a',
            breadcrumbName: 'A'
          },
          {
            path: '/b',
            breadcrumbName: 'B',
            routes: [
              {
                path: '/b/c',
                breadcrumbName: 'C'
              }
            ]
          }
        ]}
        pathname="/b/c"
        separator={<NavigateNextIcon />}
        MuiTypographyProps={{
          variant: 'h6'
        }}
      />
    ),
    {
      info: {
        propTables: [Breadcrumbs],
        propTablesExclude: [NavigateNextIcon]
      }
    }
  )
  .add(
    'ButtonMenu',
    () => (
      <ButtonMenu
        id="foo"
        button={<Button onClick={action('clicked 1')}>test</Button>}
      >
        <MenuItem onClick={action('clicked 2')}>item1</MenuItem>
        <MenuItem onClick={action('clicked 3')}>item2</MenuItem>
      </ButtonMenu>
    ),
    {
      info: {
        propTables: [ButtonMenu],
        propTablesExclude: [Button, MenuItem]
      }
    }
  )
  .add(
    'DataList',
    () => {
      let id = 0;
      function createData(name, calories, fat, carbs, protein) {
        id += 1;
        return { id, name, calories, fat, carbs, protein };
      }
      const columns = fromJS([
        [
          'id',
          'Dessert (100g serving)',
          'Calories',
          'Fat (g)',
          'Carbs (g)',
          'Protein (g)'
        ]
      ]);
      const assignments = fromJS([
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9)
      ]);
      const renderColumn = (
        rowData,
        index,
        { orderIndex, order, sortData }
      ) => {
        const onSortClick = () => {
          sortData({
            asc: data => data.sortBy(el => parseInt(el.get('id'))),
            desc: data => data.sortBy(el => -parseInt(el.get('id')))
          });
        };

        return (
          <ListItem key={`list-item-head-${index}`}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={1}>
                <StyledTableSortLabel
                  component="p"
                  active={0 === orderIndex}
                  direction={order}
                  onClick={() => onSortClick()}
                >
                  {rowData.get(0)}
                </StyledTableSortLabel>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(1)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(3)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(4)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(5)}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        );
      };
      const renderDataRow = (rowData, index) => {
        return (
          <ListItem button key={`list-item-${index}`}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={1}>
                {rowData.get('id')}
              </Grid>
              <Grid item xs={12} sm={3}>
                {rowData.get('name')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('calories')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('fat')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('carbs')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('protein')}
              </Grid>
            </Grid>
          </ListItem>
        );
      };
      return (
        <DataList
          component="nav"
          disablePadding
          columns={columns}
          data={assignments}
          renderColumn={renderColumn}
          renderDataRow={renderDataRow}
          TablePaginationProps={{
            count: assignments.size,
            rowsPerPageOptions: [2, 4, 6, 8],
            rowsPerPage: 2,
            labelRowsPerPage: '每頁幾筆'
          }}
        />
      );
    },
    {
      info: {
        propTables: [DataList],
        propTablesExclude: [ListItem, Grid, StyledTableSortLabel, Typography]
      }
    }
  );
