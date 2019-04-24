import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import StoryRouter from 'storybook-react-router';
import { MenuItem } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '../src/Button';
import ButtonMenu from '../src/lab/ButtonMenu';
import Breadcrumbs from '../src/lab/Breadcrumbs';

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
  );
