import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions'
import MuiList from '@material-ui/core/List';
import NestedListItem from '@e-group/material/NestedListItem';

const routes = [
  {
    path: '/',
    exact: true,
    primary: 'Home'
  },
  {
    path: '/a',
    primary: 'Page A'
  },
  {
    path: '/b',
    primary: 'Page B',
    routes: [
      {
        path: '/b/:id',
        primary: 'Page B Detail'
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
            primary: el.primary
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
              primary: route.primary
            }}
            items={items}
          />
        );
      })}
    </MuiList>
  );
};

storiesOf('NestedList', module).add('default', () => <NestedList />);
