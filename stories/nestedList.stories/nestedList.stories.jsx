import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import MuiList from '@material-ui/core/List';
import NestedListItem from '@e-group/material/NestedListItem';

const routes = [
  {
    path: '/',
    exact: true,
    breadcrumbName: 'Home'
  },
  {
    path: '/a',
    breadcrumbName: 'Page A'
  },
  {
    path: '/b',
    breadcrumbName: 'Page B',
    routes: [
      {
        path: '/b/:id',
        breadcrumbName: 'Page B Detail'
      }
    ]
  }
];

const NestedList = ({ classes }) => {
  return (
    <MuiList component="nav">
      {routes.map(route => {
        const items = route.routes ? route.routes.map(el => ({
          ...el,
          MuiListItemTextProps: {
            primary: el.breadcrumbName
          }
        })) : [];
        return (
          <NestedListItem
            key={route.path}
            icon={route.icon}
            MuiListItemProps={{
              onClick: action('clicked'),
              button: true
            }}
            MuiListItemTextProps={{
              primary: route.breadcrumbName
            }}
            items={items}
          />
        );
      })}
    </MuiList>
  );
};

storiesOf('NestedList', module).add('default', () => <NestedList />);
